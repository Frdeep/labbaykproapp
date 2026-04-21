import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

// We use the service role to bypass RLS in webhooks
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock', {
  apiVersion: '2023-10-16' as any,
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
  const payload = await req.text();
  const signature = req.headers.get('Stripe-Signature');

  let event: Stripe.Event;

  try {
    if (!endpointSecret) {
      // Pour le développement sans secret webhook défini
      event = JSON.parse(payload);
    } else {
      if (!signature) throw new Error('No signature present');
      event = stripe.webhooks.constructEvent(payload, signature, endpointSecret);
    }
  } catch (err: any) {
    console.error(`Webhook signature verification failed.`, err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      
      const bookingId = session.client_reference_id;
      if (!bookingId) {
        console.error('No booking client_reference_id in session');
        break;
      }

      // 1. Marquer la réservation comme confirmée (acompte payé)
      const { error } = await supabaseAdmin
        .from('bookings')
        .update({ 
          status: 'confirmed',
          confirmed_at: new Date().toISOString()
        })
        .eq('id', bookingId);

      if (error) {
        console.error('Failed to update booking status in Supabase', error);
      } else {
        console.log(`Booking ${bookingId} successfully confirmed via Stripe.`);
      }

      break;
    }
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
