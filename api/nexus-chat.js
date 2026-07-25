// api/nexus-chat.js
export default async function handler(req, res) {
  // Hanya menerima metode POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { message, context } = req.body;

  try {
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192', // Model kencang & gratis dari Groq
        messages: [
          { role: 'system', content: context },
          { role: 'user', content: message }
        ],
        temperature: 0.6,
        max_tokens: 150
      })
    });

    if (!groqRes.ok) {
      throw new Error(`Groq API Error: ${groqRes.status}`);
    }

    const data = await groqRes.json();
    return res.status(200).json({ reply: data.choices[0].message.content });
    
  } catch(error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Nexus System Offline. Koneksi terputus.' });
  }
}