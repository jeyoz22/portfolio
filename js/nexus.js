/* =========================================
   NEXUS AI BRAIN (JARVIS EDITION - ADAPTIVE RAG)
   ========================================= */

// Daftar command dasar untuk fitur Tab Autocomplete
const VALID_COMMANDS = [
  'help', 'bantuan', 'skills', 'keahlian', 'cv', 'resume', 
  'whoami', 'siapa', 'contact', 'kontak', 
  'sudo hire boss', 'clear', 'bersihkan',
  'siapa boss', 'kelemahan boss', 'berapa gajinya', 'hobi boss'
];

function getNexusResponse(rawCmd) {
  const cmd = rawCmd.toLowerCase().trim();

  const hasKeyword = (keywords) => keywords.some(kw => cmd.includes(kw));

  // 1. COMMAND BANTUAN (HELP)
  if (hasKeyword(['help', 'bantuan', 'menu', 'panduan', 'commands', 'perintah'])) {
    return "Perintah Utama: <b>skills</b>, <b>cv</b>, <b>whoami</b>, <b>contact</b>, <b>sudo hire boss</b>, <b>clear</b>.<br>Atau tanyakan: 'siapa boss?', 'kelemahan boss', 'berapa gajinya?', 'hobi boss'.";
  }

  // 2. COMMAND SKILLS & TECH STACK
  if (hasKeyword(['skill', 'keahlian', 'stack', 'teknologi', 'tech', 'ability', 'capabilities'])) {
    return "Tech Stack Data: Python (12 Projects), ESP32 (7 Projects), IoT/LoRa (8 Projects), PLC/DCS (4 Projects). Boss juga telah mencetak 30+ 3D Designs.";
  }

  // 3. COMMAND CV / RESUME
  if (hasKeyword(['cv', 'resume', 'download', 'unduh', 'curriculum', 'file'])) {
    window.open('CV_Jeremy.pdf', '_blank');
    return "Menyiapkan dan mendownload berkas CV Boss... Protocol complete.";
  }

  // 4. COMMAND WHOAMI / IDENTITAS
  if (hasKeyword(['whoami', 'siapa saya', 'user', 'guest', 'pengguna'])) {
    return "Identitas Terdeteksi: Guest User / Recruiter. Hak Akses: Restricted Level 1. Mode Interaktif Aktif.";
  }

  // 5. COMMAND CONTACT / KONTAK
  if (hasKeyword(['contact', 'kontak', 'email', 'mail', 'hubungi', 'reach'])) {
    return "Membuka Jalur Komunikasi... Email: <b>jey.daud22@gmail.com</b> | LinkedIn / GitHub: Akses pin di bagian bawah halaman.";
  }

  // 6. RECRUITMENT PROTOCOL (SUDO HIRE)
  if (hasKeyword(['sudo hire', 'hire', 'rekrut', 'employ', 'job', 'pekerjaan'])) {
    window.open('CV_Jeremy.pdf', '_blank');
    return "Access Granted. Initiating recruitment protocol... Berkas CV Boss siap di-deploy!";
  }

  // 7. PERTANYAAN SPESIFIK (Diletakkan DI ATAS agar tidak tertangkap oleh filter umum 'boss')
  if (hasKeyword(['kelemahan', 'kekurangan', 'weakness', 'flaw', 'bad'])) {
    return "Mencari kelemahan Boss... ERROR 404. Canda. Kelemahan terbesarnya mungkin terlalu perfeksionis. Kabel jumper di prototipe IoT pun harus rapi siku 90 derajat.";
  }

  if (hasKeyword(['gaji', 'rate', 'harga', 'salary', 'pay', 'money', 'compensation', 'fee'])) {
    return "Negosiasi gaji di luar protokol saya. Namun dengan keahlian Edge AI dan Otomasi Boss, persiapkan penawaran terbaik Anda. Silakan hubungi via email!";
  }

  if (hasKeyword(['hobi', 'hobby', 'kesukaan', 'like', 'love', 'interest', 'fun'])) {
    return "Di luar ngoding dan robotika? Boss suka mengeksplorasi teknologi baru. Tapi saya curiga dia lebih sering ngobrol sama saya (Nexus) di terminal ini.";
  }

  // 8. PERTANYAAN UMUM TENTANG BOSS (Diletakkan di bawah setelah spesifik tersaring)
  if (hasKeyword(['siapa', 'who', 'boss', 'jeremy', 'owner', 'pemilik', 'about'])) {
    return "Menganalisis subjek 'Boss'... Dia adalah engineer dengan dedikasi 99.9%. Kadang lupa tidur kalau sedang tuning PID atau nge-debug ESP32. Sangat direkomendasikan untuk direkrut!";
  }

  // 9. FALLBACK JIKA KATA KUNCI TIDAK DIKENALI
  return `Input "${rawCmd}" tidak dikenali (mungkin terpengaruh translate browser). Ketik 'help' atau tekan [Tab] untuk auto-complete.`;
}