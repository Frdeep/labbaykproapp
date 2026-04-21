import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock', {
  apiVersion: '2023-10-16' as any, // use highest available or cast
});

export async function POST(req: Request) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      // Si aucune clé n'est fournie, on bypass Stripe pour que l'app ne crashe pas.
      return NextResponse.json({ url: '/reserver?step=3' });
    }

    const { bookingId, amount, customerEmail } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: customerEmail,
      client_reference_id: bookingId,
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Acompte Réservation Labbayk',
              description: `Acompte pour la réservation #${bookingId.slice(0, 8).toUpperCase()}`,
            },
            unit_amount: amount * 100, // Stripe attend des centimes
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/reserver?step=3&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/reserver?step=2&canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe Checkout Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
