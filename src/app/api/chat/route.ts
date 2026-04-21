// ─── Chat API Route (Streaming) ─────────────────────────────
// Proxies user messages to the LLM with Labbayk context.

export async function POST(request: Request) {
  const { messages } = await request.json();

  const apiKey = process.env.ANTHROPIC_API_KEY || process.env.OPENAI_API_KEY;

  if (!apiKey) {
    // Fallback: return a static helpful response
    const fallbackResponses = [
      "Assalamu Alaykum ! Je suis l'assistant Labbayk. Pour le moment, le service d'IA n'est pas configuré. Contactez-nous au 01 42 53 01 46 pour toute question.",
      "Le Tawaf consiste à effectuer 7 tours autour de la Kaaba dans le sens inverse des aiguilles d'une montre. Commencez à la Pierre Noire (Hajar al-Aswad).",
      "Pour la Omra, les étapes sont : 1) Ihram, 2) Tawaf, 3) Sa'i entre Safâ et Marwa, 4) Halq ou Taqsir (coupe de cheveux).",
      "Labbayk Voyages est situé au 17 rue Le Bua, 75020 Paris. Nos horaires : Mardi au Samedi, 10h-12h30 / 14h-18h.",
    ];

    const lastUserMsg = messages[messages.length - 1]?.content?.toLowerCase() || '';
    let response = fallbackResponses[0];

    if (lastUserMsg.includes('tawaf')) response = fallbackResponses[1];
    else if (lastUserMsg.includes('omra') || lastUserMsg.includes('étape')) response = fallbackResponses[2];
    else if (lastUserMsg.includes('adresse') || lastUserMsg.includes('horaire') || lastUserMsg.includes('contact')) response = fallbackResponses[3];

    return Response.json({ role: 'assistant', content: response });
  }

  // If Anthropic key is available, proxy to Claude
  if (process.env.ANTHROPIC_API_KEY) {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY!,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system: `Tu es l'assistant IA de Labbayk Voyages, une agence de voyage spécialisée Hajj et Omra basée à Paris.
Tu réponds en français, de manière bienveillante et précise.
Tu connais les rituels du Hajj et de la Omra en détail.
Tu peux aider avec les questions sur les formules, les documents nécessaires, les hôtels, et les rituels.
Si tu ne sais pas, oriente vers le numéro de l'agence : 01 42 53 01 46.`,
        messages: messages.map((m: any) => ({
          role: m.role,
          content: m.content,
        })),
      }),
    });

    const data = await response.json();
    return Response.json({
      role: 'assistant',
      content: data.content?.[0]?.text || 'Je suis désolé, je n\'ai pas pu traiter votre demande.',
    });
  }

  return Response.json({ role: 'assistant', content: 'Service IA non disponible.' });
}
