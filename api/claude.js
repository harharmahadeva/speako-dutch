// Vercel Serverless Function — Groq API proxy
// API key stored as "deutch_key" in Vercel Environment Variables

const ALLOWED_ORIGINS = [
  'https://deutsch-jetzt.vercel.app',
  'http://localhost:8080',
  'http://localhost:3000',
  'http://localhost:8888'
];

module.exports = async (req, res) => {
  const origin = req.headers.origin || '';
  const allowed = ALLOWED_ORIGINS.some(o => origin.startsWith(o)) || origin === '';

  res.setHeader('Access-Control-Allow-Origin', allowed ? (origin || '*') : 'null');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!allowed) return res.status(403).json({ error: 'Forbidden' });

  const apiKey = process.env.deutch_key;
  if (!apiKey) return res.status(500).json({ error: 'API key not configured' });

  try {
    const body = req.body || {};
    if (!body.messages || !Array.isArray(body.messages)) {
      return res.status(400).json({ error: 'Invalid request' });
    }
    if (body.messages.length > 25) {
      return res.status(400).json({ error: 'Too many messages' });
    }

    // Build messages — prepend system as first message if provided
    const messages = [];
    if (body.system) {
      messages.push({ role: 'system', content: body.system });
    }
    messages.push(...body.messages);

    const groqBody = {
      model: 'llama-3.3-70b-versatile',
      max_tokens: Math.min(body.max_tokens || 1000, 2000),
      temperature: 0.8,
      messages
    };
    // Enable JSON mode when caller requests it (for lesson/exercise generation)
    if (body.json_mode) {
      groqBody.response_format = { type: 'json_object' };
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(groqBody)
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Groq API error:', response.status, err);
      return res.status(502).json({ error: 'AI service temporarily unavailable' });
    }

    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content || '';

    if (!text) return res.status(502).json({ error: 'Empty response from AI' });

    // Return in Anthropic-compatible format so frontend needs no changes
    return res.status(200).json({
      content: [{ type: 'text', text }]
    });

  } catch (e) {
    console.error('Proxy error:', e.message);
    return res.status(500).json({ error: 'Internal error' });
  }
};
