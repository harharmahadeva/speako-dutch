// Netlify Serverless Function — Secure Gemini API Proxy
// GEMINI_API_KEY stored in Netlify environment variables, never in code

exports.handler = async (event) => {

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: corsHeaders('*'), body: '' };
  }

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  // Origin check — only allow your own sites
  const allowedOrigins = [
    'https://harharmahadeva.github.io',
    'https://deutsch-jetzt.netlify.app',
    'http://localhost:8888',
    'http://localhost:3000'
  ];
  const origin = event.headers.origin || '';
  const allowed = allowedOrigins.some(o => origin.startsWith(o)) || origin === '';
  if (!allowed) {
    return { statusCode: 403, body: JSON.stringify({ error: 'Forbidden' }) };
  }

  try {
    const body = JSON.parse(event.body || '{}');

    // Validate request
    if (!body.messages || !Array.isArray(body.messages)) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Invalid request' }) };
    }
    if (body.messages.length > 25) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Too many messages' }) };
    }

    const maxTokens = Math.min(body.max_tokens || 1000, 2000);

    // Convert Anthropic-style messages to Gemini format
    // Anthropic: [{role:'user', content:'...'}, {role:'assistant', content:'...'}]
    // Gemini:    [{role:'user', parts:[{text:'...'}]}, {role:'model', parts:[{text:'...'}]}]
    const geminiContents = body.messages.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    // Prepend system prompt as first user message if provided
    if (body.system) {
      geminiContents.unshift({
        role: 'user',
        parts: [{ text: `[System instructions — follow these throughout]: ${body.system}` }]
      });
      // Add a model acknowledgement so conversation alternates correctly
      geminiContents.splice(1, 0, {
        role: 'model',
        parts: [{ text: 'Understood. I will follow these instructions.' }]
      });
    }

    const apiKey = process.env.deutch_key;

    // Log for debugging — remove after fix
    console.log('API key present:', !!apiKey);
    console.log('API key length:', apiKey ? apiKey.length : 0);

    if (!apiKey) {
      return {
        statusCode: 500,
        headers: corsHeaders(origin),
        body: JSON.stringify({ error: 'API key not configured. Set deutch_key in Netlify environment variables.' })
      };
    }
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: geminiContents,
        generationConfig: {
          maxOutputTokens: maxTokens,
          temperature: 0.8,
          topP: 0.95
        },
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_ONLY_HIGH' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' }
        ]
      })
    });

    if (!response.ok) {
      console.error('Gemini API error:', response.status);
      return {
        statusCode: 502,
        headers: corsHeaders(origin),
        body: JSON.stringify({ error: 'AI service temporarily unavailable' })
      };
    }

    const data = await response.json();

    // Extract text from Gemini response
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    if (!text) {
      return {
        statusCode: 502,
        headers: corsHeaders(origin),
        body: JSON.stringify({ error: 'Empty response from AI' })
      };
    }

    // Return in Anthropic-compatible format so frontend needs no changes
    return {
      statusCode: 200,
      headers: corsHeaders(origin),
      body: JSON.stringify({
        content: [{ type: 'text', text }]
      })
    };

  } catch (e) {
    console.error('Proxy error:', e.message);
    return {
      statusCode: 500,
      headers: corsHeaders('*'),
      body: JSON.stringify({ error: 'Internal error' })
    };
  }
};

function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };
}
