/* =========================================
   1. NEXUS ADAPTIVE CURSOR (PREMIUM LOGIC)
   ========================================= */
const cursor = document.getElementById("nexus-cursor");
const isTouchDevice = (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));

if (!isTouchDevice && cursor) {
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;
  
  // Algoritma pergerakan halus (menggunakan requestAnimationFrame untuk menghindari stuttering)
  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.5; // Easing diatur ke 0.5 agar responsif dan presisi
    cursorY += (mouseY - cursorY) * 0.5;
    
    // Menggunakan translate3d agar memanfaatkan akselerasi GPU
    cursor.style.transform = `translate3d(calc(${cursorX}px - 50%), calc(${cursorY}px - 50%), 0)`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // State Management: Hover (Links/Buttons/Cards)
  const hoverTargets = document.querySelectorAll("a, button, .tl-item, .proj-card, .comp-row, .news-card, .filter-btn");
  hoverTargets.forEach(el => {
    el.addEventListener("mouseenter", () => document.body.setAttribute("data-cursor", "hover"));
    el.addEventListener("mouseleave", () => document.body.setAttribute("data-cursor", "idle"));
  });

  // State Management: Text (I-Beam)
  const textTargets = document.querySelectorAll("p, h1, h2, h3, h4, span, .desc, .term-input-line input");
  textTargets.forEach(el => {
    // Memastikan deteksi teks tidak menimpa elemen interaktif
    if(!el.closest('a') && !el.closest('button') && !el.closest('.proj-card') && !el.closest('.tl-item')) {
      el.addEventListener("mouseenter", () => document.body.setAttribute("data-cursor", "text"));
      el.addEventListener("mouseleave", () => document.body.setAttribute("data-cursor", "idle"));
    }
  });

  // State Management: Click Effect
  window.addEventListener("mousedown", () => document.body.classList.add("cursor-clicking"));
  window.addEventListener("mouseup", () => document.body.classList.remove("cursor-clicking"));
} else {
  // Matikan kursor kustom di perangkat touch
  if(cursor) cursor.style.display = 'none';
}

/* =========================================
   2. SPLASH SCREEN (SESSION STORAGE & SKIPPABLE)
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
  const splash = document.getElementById('splashScreen');
  if (splash) {
    if (sessionStorage.getItem('splashSeen')) {
      splash.style.display = 'none';
    } else {
      const hideSplash = () => {
        splash.style.transition = 'opacity 0.5s ease';
        splash.style.opacity = '0';
        setTimeout(() => { splash.style.display = 'none'; }, 500); 
        sessionStorage.setItem('splashSeen', 'true');
      };
      
      let splashTimer = setTimeout(hideSplash, 1500);
      window.addEventListener('keydown', hideSplash, {once: true});
      window.addEventListener('click', hideSplash, {once: true});
    }
  }
});

/* =========================================
   3. TYPEWRITER EFFECT
   ========================================= */
const typeWords = ["sistem kendali.", "IoT.", "Edge AI.", "robotika."];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeWriterElement = document.getElementById("typewriter");

function typeEffect() {
  if(!typeWriterElement) return;
  const currentWord = typeWords[wordIndex];
  
  if (isDeleting) {
    typeWriterElement.innerText = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typeWriterElement.innerText = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === currentWord.length) {
    typeSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % typeWords.length;
    typeSpeed = 500;
  }
  
  setTimeout(typeEffect, typeSpeed);
}
setTimeout(typeEffect, 1600); 

/* =========================================
   4. SCROLL REVEAL & SCROLLSPY NAV
   ========================================= */
const revealOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target); 
    }
  });
}, revealOptions);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".edge-nav .pins a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(sec => {
    const sectionTop = sec.offsetTop;
    if (pageYOffset >= sectionTop - 100) {
      current = sec.getAttribute("id");
    }
  });
  navLinks.forEach(a => {
    a.classList.remove("active-nav");
    if (a.getAttribute("href").includes(current)) {
      a.classList.add("active-nav");
    }
  });
});

/* =========================================
   5. 3D TILT EFFECT PADA KARTU PROYEK
   ========================================= */
if (!isTouchDevice) {
  const tiltElements = document.querySelectorAll('.proj-card, .chip-photo');
  tiltElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xPct = (x / rect.width - 0.5) * 20; 
      const yPct = (y / rect.height - 0.5) * -20;
      el.style.transform = `perspective(1000px) rotateX(${yPct}deg) rotateY(${xPct}deg) scale3d(1.02, 1.02, 1.02)`;
      el.style.transition = 'none';
      el.style.zIndex = '10';
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      el.style.transition = 'transform 0.5s ease';
      el.style.zIndex = '1';
    });
  });
}

/* =========================================
   6. COPY TO CLIPBOARD & TOAST NOTIFICATION
   ========================================= */
function copyEmail(e) {
  e.preventDefault();
  const emailToCopy = "jey.daud22@gmail.com";
  navigator.clipboard.writeText(emailToCopy).then(() => {
    const toast = document.getElementById("toast");
    toast.classList.add("show");
    setTimeout(() => { toast.classList.remove("show"); }, 3000);
  });
}

/* =========================================
   7. TERMINAL NEXUS (UI LOGIC)
   ========================================= */
const termBtn = document.getElementById('termBtn');
const termOverlay = document.getElementById('termOverlay');
const termInput = document.getElementById('termInput');
const termOutput = document.getElementById('termOutput');

let cmdHistory = [];
let historyIndex = -1;

if (termBtn) {
  termBtn.onclick = () => {
    termOverlay.classList.toggle('hidden');
    if(!termOverlay.classList.contains('hidden')) { termInput.focus(); }
  };
}

function closeTerm() { 
  if (termOverlay) termOverlay.classList.add('hidden'); 
}

if (termInput) {
  termInput.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const currentVal = termInput.value.toLowerCase().trim();
      if (!currentVal) return;
      if (typeof window.VALID_COMMANDS !== 'undefined') {
        const match = window.VALID_COMMANDS.find(c => c.startsWith(currentVal));
        if (match) { termInput.value = match; }
      }
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0 && historyIndex < cmdHistory.length - 1) {
        historyIndex++; termInput.value = cmdHistory[cmdHistory.length - 1 - historyIndex];
      }
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--; termInput.value = cmdHistory[cmdHistory.length - 1 - historyIndex];
      } else if (historyIndex === 0) {
        historyIndex = -1; termInput.value = '';
      }
      return;
    }
    if (e.key === 'Enter') {
      const cmd = termInput.value.trim();
      if (cmd === '') return;
      cmdHistory.push(cmd); historyIndex = -1;

      termOutput.innerHTML += `<div><span style="color:var(--gold)">$</span> ${cmd}</div>`;
      termInput.value = '';

      if (cmd.toLowerCase() === 'clear' || cmd.toLowerCase() === 'bersihkan') { 
        termOutput.innerHTML = ''; 
        return; 
      }

      // LOADING STATE SEBELUM API MERESPONS
      const loadingId = 'loading-' + Date.now();
      termOutput.innerHTML += `<div id="${loadingId}" style="color:var(--muted); margin-bottom:12px;">[Nexus]: Sedang menghubungkan...</div>`;
      termOutput.scrollTop = termOutput.scrollHeight;

      // PANGGIL ASYNC FUNCTION
      if (typeof window.getNexusResponse === 'function') {
        window.getNexusResponse(cmd).then(res => {
          const loadingEl = document.getElementById(loadingId);
          if (loadingEl) {
             loadingEl.id = ''; 
             loadingEl.style.color = 'var(--copper-bright)';
             loadingEl.innerHTML = `[Nexus]: ${res}`;
          }
          termOutput.scrollTop = termOutput.scrollHeight;
        });
      } else {
        const loadingEl = document.getElementById(loadingId);
        if (loadingEl) loadingEl.innerHTML = "[Nexus]: System offline.";
      }
    }
  });
}

/* =========================================
   8. FILTER, MODAL LOGIC, & MOBILE SWIPE
   ========================================= */
window.addEventListener('scroll', () => {
  let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  document.getElementById("scrollTrace").style.width = (winScroll / height) * 100 + "%";
});

function filterProjects(tag, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  const cards = document.querySelectorAll('.proj-card');
  cards.forEach(card => {
    if (tag === 'all') { card.classList.remove('hide'); } 
    else {
      if (card.classList.contains('filter-' + tag)) { card.classList.remove('hide'); } 
      else { card.classList.add('hide'); }
    }
  });
}

let slideIndex = 1;
let touchstartX = 0;
let touchendX = 0;
const slideshowContainer = document.getElementById('slideshowContainer');

slideshowContainer.addEventListener('touchstart', e => {
  touchstartX = e.changedTouches[0].screenX;
}, {passive: true});

slideshowContainer.addEventListener('touchend', e => {
  touchendX = e.changedTouches[0].screenX;
  if (touchendX < touchstartX - 40) changeSlide(1); 
  if (touchendX > touchstartX + 40) changeSlide(-1);
}, {passive: true});

function openModal(element) {
  const modal = document.getElementById('detailModal');
  const modalTitle = element.getAttribute('data-title');
  document.getElementById('modalCat').innerText = element.getAttribute('data-cat');
  document.getElementById('modalTitle').innerText = modalTitle;
  
  if (typeof gtag === 'function') {
    gtag('event', 'view_project', {
      'event_category': 'Portfolio',
      'project_title': modalTitle
    });
  }

  const isAcademic = element.hasAttribute('data-modul');
  const modalBody = document.getElementById('modalBodyElement');
  const standardDetails = document.getElementById('standardDetails');
  const academicDetails = document.getElementById('academicDetails');
  
  if (isAcademic) {
    modalBody.style.display = 'block'; 
    slideshowContainer.style.display = 'none'; 
    standardDetails.style.display = 'none'; 
    academicDetails.style.display = 'block'; 
    document.getElementById('modalModulText').innerHTML = element.getAttribute('data-modul');
  } else {
    modalBody.style.display = ''; 
    slideshowContainer.style.display = ''; 
    standardDetails.style.display = 'block'; 
    academicDetails.style.display = 'none'; 
    
    document.getElementById('modalProblem').innerText = element.getAttribute('data-problem');
    document.getElementById('modalSolution').innerText = element.getAttribute('data-solution');
    document.getElementById('modalImpact').innerText = element.getAttribute('data-impact');
    
    const pid = element.getAttribute('data-id');
    const archContainer = document.getElementById('modalArchContainer');
    const archTemplate = document.getElementById('arch-' + pid);
    if(archTemplate) {
        archContainer.innerHTML = archTemplate.innerHTML;
        archContainer.style.display = 'block';
    } else {
        archContainer.style.display = 'none';
    }

    const metricsStr = element.getAttribute('data-metrics');
    const metricContainer = document.getElementById('modalMetricContainer');
    if(metricsStr) {
        let html = '<h4><span class="highlight">_</span> Project Metrics</h4><div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-top:10px;">';
        const parts = metricsStr.split('|');
        parts.forEach(p => {
            const [label, val] = p.split(':');
            html += `<div style="background:var(--mask-3); padding:8px; border-radius:4px; border:1px solid rgba(212,175,106,0.2);">
                        <div style="font-family:'Space Mono'; font-size:9px; color:var(--gold); text-transform:uppercase;">${label}</div>
                        <div style="font-family:'Archivo'; font-size:14px; color:var(--silk);">${val}</div>
                     </div>`;
        });
        html += '</div>';
        metricContainer.innerHTML = html;
        metricContainer.style.display = 'block';
    } else {
        metricContainer.style.display = 'none';
    }
    
    const demoLink = element.getAttribute('data-demolink');
    const paperLink = element.getAttribute('data-paperlink');
    const extLink = element.getAttribute('data-link');

    const btnDemo = document.getElementById('modalDemoLink');
    const btnPaper = document.getElementById('modalPaperLink');
    const btnExt = document.getElementById('modalExtLink');
    
    if(demoLink) { btnDemo.href = demoLink; btnDemo.style.display = 'inline-block'; } else { btnDemo.style.display = 'none'; }
    if(paperLink) { btnPaper.href = paperLink; btnPaper.style.display = 'inline-block'; } else { btnPaper.style.display = 'none'; }
    if(extLink) { btnExt.href = extLink; btnExt.style.display = 'inline-block'; } else { btnExt.style.display = 'none'; }
    
    const imgString = element.getAttribute('data-images');
    const videoUrl = element.getAttribute('data-video');
    const oldSlides = slideshowContainer.querySelectorAll('.slide');
    oldSlides.forEach(slide => slide.remove());
    
    if (videoUrl) {
      const vidDiv = document.createElement('div');
      vidDiv.className = 'slide';
      vidDiv.innerHTML = `<iframe src="${videoUrl}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
      slideshowContainer.insertBefore(vidDiv, slideshowContainer.querySelector('.prev'));
    }
    if (imgString) {
      imgString.split(',').forEach((imgSrc) => {
        const imgDiv = document.createElement('div');
        imgDiv.className = 'slide';
        imgDiv.innerHTML = `<img src="${imgSrc.trim()}" alt="Dokumentasi" loading="lazy">`;
        slideshowContainer.insertBefore(imgDiv, slideshowContainer.querySelector('.prev'));
      });
    }
    slideIndex = 1; showSlides(slideIndex);
  }
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden'; 
  document.getElementById('modalBox').focus(); 
}

function closeModal() {
  const container = document.getElementById('slideshowContainer');
  container.querySelectorAll('iframe').forEach(iframe => iframe.src = iframe.src);
  document.getElementById('detailModal').classList.remove('active');
  document.body.style.overflow = 'auto'; 
}

function changeSlide(n) { showSlides(slideIndex += n); }
function showSlides(n) {
  let slides = document.getElementsByClassName("slide");
  if (slides.length === 0) return;
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (let i = 0; i < slides.length; i++) { slides[i].classList.remove("active"); }
  slides[slideIndex - 1].classList.add("active");
}

window.onclick = function(event) {
  if (event.target == document.getElementById('detailModal')) closeModal();
}
document.addEventListener('keydown', function(event) {
  if(document.getElementById('detailModal').classList.contains('active')) {
    if(event.key === "Escape") closeModal();
    if(event.key === "ArrowLeft") changeSlide(-1);
    if(event.key === "ArrowRight") changeSlide(1);
  }
});