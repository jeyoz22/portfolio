/* =========================================
   NEXUS AI BRAIN (GROQ API INTEGRATION)
   ========================================= */
import NEXUS_SYSTEM_PROMPT from './nexus-context.js';

// Daftar command dasar untuk fitur Tab Autocomplete
const VALID_COMMANDS = [
  'help', 'bantuan', 'cv', 'resume', 'contact', 'kontak', 'clear', 'bersihkan'
];

async function getNexusResponse(rawCmd) {
  const cmd = rawCmd.toLowerCase().trim();
  const hasKeyword = (keywords) => keywords.some(kw => cmd.includes(kw));

  // 1. COMMAND CEPAT / LOKAL (Instan, tanpa API)
  if (hasKeyword(['help', 'bantuan'])) {
    return "Command Cepat: <b>cv</b>, <b>contact</b>, <b>clear</b>.<br>Atau ketik bebas untuk mengobrol dengan AI Nexus.";
  }

  if (hasKeyword(['cv', 'resume', 'download', 'unduh', 'file'])) {
    window.open('CV_Jeremy.pdf', '_blank');
    return "Menyiapkan dan mendownload berkas CV Boss... Protocol complete.";
  }

  if (hasKeyword(['contact', 'kontak', 'email', 'mail', 'hubungi'])) {
    return "Membuka Jalur Komunikasi... Email: <b>jey.daud22@gmail.com</b> | LinkedIn / GitHub tersedia di pin bawah.";
  }

  // 2. COMMAND AI (Dikirim ke Groq via Backend Vercel)
  try {
    const response = await fetch('/api/nexus-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        message: rawCmd, 
        context: NEXUS_SYSTEM_PROMPT 
      })
    });

    if (!response.ok) {
      return "Error: Koneksi ke server utama terputus. Mode offline aktif.";
    }

    const data = await response.json();
    return data.reply;
    
  } catch (error) {
    console.error("Nexus AI Error:", error);
    return "Sistem AI sedang *offline*. Silakan gunakan command cepat (help, cv, contact).";
  }
}

// Mengekspor fungsi ke global (window) agar bisa dipanggil oleh script.js
window.VALID_COMMANDS = VALID_COMMANDS;
window.getNexusResponse = getNexusResponse;