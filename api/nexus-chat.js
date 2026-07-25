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
        model: 'llama-3.1-8b-instant', // Diubah ke model Groq yang aktif
        messages: [
          { role: 'system', content: context },
          { role: 'user', content: message }
        ],
        temperature: 0.6,
        max_tokens: 150
      })
    });

    if (!groqRes.ok) {
      const errorData = await groqRes.text(); // Membantu melihat detail error dari Groq jika gagal lagi
      console.error('Groq API Detailed Error:', errorData);
      throw new Error(`Groq API Error: ${groqRes.status}`);
    }

    const data = await groqRes.json();
    return res.status(200).json({ reply: data.choices[0].message.content });
    
  } catch(error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Nexus System Offline. Koneksi terputus.' });
  }
}