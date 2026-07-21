/* =========================================
   NEXUS AI BRAIN (JARVIS EDITION - CLEAN)
   ========================================= */

// Daftar command untuk fitur Tab Autocomplete
const VALID_COMMANDS = [
  'help', 'skills', 'cv', 'whoami', 'contact', 
  'sudo hire boss', 'clear', 
  'siapa boss', 'kelemahan boss', 'berapa gajinya', 'hobi boss'
];

function getNexusResponse(rawCmd) {
  const cmd = rawCmd.toLowerCase().trim();

  // 1. COMMAND DASAR TERMINAL
  if (cmd === 'help') {
    return "Perintah Utama: <b>skills</b>, <b>cv</b>, <b>whoami</b>, <b>contact</b>, <b>sudo hire boss</b>, <b>clear</b>.<br>Atau tanyakan: 'siapa boss?', 'kelemahan boss', 'berapa gajinya?', 'hobi boss'.";
  }

  if (cmd === 'skills') {
    return "Tech Stack Utama Boss: Embedded Systems (ESP32, LoRa), Control Systems (PID, LQR), Python, C++, Edge AI (TinyML, LSTM), & 3D Fabrication.";
  }

  if (cmd === 'cv') {
    window.open('CV_Jeremy.pdf', '_blank');
    return "Menyiapkan dan mendownload berkas CV Boss... Protocol complete.";
  }

  if (cmd === 'whoami') {
    return "Identitas Terdeteksi: Guest User / Recruiter. Hak Akses: Restricted Level 1. Mode Interaktif Aktif.";
  }

  if (cmd === 'contact') {
    return "Membuka Jalur Komunikasi... Email: <b>jey.daud22@gmail.com</b> | LinkedIn / GitHub: Akses pin di bagian bawah halaman.";
  }

  // 2. RECRUITMENT PROTOCOL
  if (cmd.includes('sudo hire') || cmd === 'hire') {
    window.open('CV_Jeremy.pdf', '_blank');
    return "Access Granted. Initiating recruitment protocol... Berkas CV Boss siap di-deploy!";
  }

  // 3. PERCATAAN INTERAKTIF
  if (cmd.includes('siapa') && (cmd.includes('boss') || cmd.includes('jeremy'))) {
    return "Menganalisis subjek 'Boss'... Dia adalah engineer dengan dedikasi 99.9%. Kadang lupa tidur kalau sedang tuning PID atau nge-debug ESP32. Sangat direkomendasikan untuk direkrut!";
  }

  if (cmd.includes('kelemahan') || cmd.includes('kekurangan')) {
    return "Mencari kelemahan Boss... ERROR 404. Canda. Kelemahan terbesarnya mungkin terlalu perfeksionis. Kabel jumper di prototipe IoT pun harus rapi siku 90 derajat.";
  }

  if (cmd.includes('gaji') || cmd.includes('rate') || cmd.includes('harga')) {
    return "Negosiasi gaji di luar protokol saya. Namun dengan keahlian Edge AI dan Otomasi Boss, persiapkan penawaran terbaik Anda. Silakan hubungi via email!";
  }

  if (cmd.includes('hobi') || cmd.includes('suka')) {
    return "Di luar ngoding dan robotika? Boss suka mengeksplorasi teknologi baru. Tapi saya curiga dia lebih sering ngobrol sama saya (Nexus) di terminal ini.";
  }

  // 4. FALLBACK
  return `Input "${rawCmd}" tidak dikenali. Ketik 'help' atau tekan [Tab] untuk auto-complete.`;
}