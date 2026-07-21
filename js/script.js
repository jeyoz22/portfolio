/* =========================================
   1. CUSTOM CURSOR
   ========================================= */
const dot = document.getElementById("cursor-dot");
const outline = document.getElementById("cursor-outline");

window.addEventListener("mousemove", (e) => {
  if (dot && outline) {
    dot.style.left = e.clientX + "px";
    dot.style.top = e.clientY + "px";
    outline.style.left = e.clientX + "px";
    outline.style.top = e.clientY + "px";
  }
});

document.querySelectorAll("a, button, .tl-item, .proj-card, .comp-row, .news-card").forEach(el => {
  el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
  el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
});

/* =========================================
   2. SPLASH SCREEN (BOOTING LOGIC)
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
  const splash = document.getElementById('splashScreen');
  if (splash) {
    setTimeout(() => {
      splash.style.transition = 'opacity 0.5s ease';
      splash.style.opacity = '0';
      setTimeout(() => { splash.style.display = 'none'; }, 500); 
    }, 1500); 
  }
});

/* =========================================
   3. TYPEWRITER EFFECT (HERO SECTION)
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
   4. SCROLL REVEAL & SKILL BAR ANIMATION
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

const skillObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.style.width = entry.target.getAttribute('data-width');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.skill-bar-fill').forEach(el => skillObserver.observe(el));

/* =========================================
   5. 3D TILT EFFECT PADA KARTU PROYEK
   ========================================= */
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

    // 1. TAB AUTOCOMPLETE
    if (e.key === 'Tab') {
      e.preventDefault();
      const currentVal = termInput.value.toLowerCase().trim();
      if (!currentVal) return;
      
      if (typeof VALID_COMMANDS !== 'undefined') {
        const match = VALID_COMMANDS.find(c => c.startsWith(currentVal));
        if (match) { termInput.value = match; }
      }
      return;
    }

    // 2. COMMAND HISTORY (PANAH ATAS / BAWAH)
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0 && historyIndex < cmdHistory.length - 1) {
        historyIndex++;
        termInput.value = cmdHistory[cmdHistory.length - 1 - historyIndex];
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        termInput.value = cmdHistory[cmdHistory.length - 1 - historyIndex];
      } else if (historyIndex === 0) {
        historyIndex = -1;
        termInput.value = '';
      }
      return;
    }

    // 3. ENTER COMMAND EXECUTION
    if (e.key === 'Enter') {
      const cmd = termInput.value.trim();
      if (cmd === '') return;

      cmdHistory.push(cmd);
      historyIndex = -1;

      termOutput.innerHTML += `<div><span style="color:var(--gold)">$</span> ${cmd}</div>`;
      termInput.value = '';

      if (cmd.toLowerCase() === 'clear') {
        termOutput.innerHTML = '';
        return;
      }

      let res = "Error: Sistem Nexus tidak merespons.";
      if (typeof getNexusResponse === 'function') {
        res = getNexusResponse(cmd);
      }

      setTimeout(() => {
        termOutput.innerHTML += `<div style="color:var(--copper-bright); margin-bottom:12px;">[Nexus]: ${res}</div>`;
        termOutput.scrollTop = termOutput.scrollHeight;
      }, 150);

      termOutput.scrollTop = termOutput.scrollHeight;
    }
  });
}

/* =========================================
   8. EXISTING LOGIC (SCROLL INDICATOR, FILTER, MODAL)
   ========================================= */
window.addEventListener('scroll', () => {
  let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  document.getElementById("scrollTrace").style.width = (winScroll / height) * 100 + "%";
});

function filterProjects(tag, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
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

function openModal(element) {
  const modal = document.getElementById('detailModal');
  document.getElementById('modalCat').innerText = element.getAttribute('data-cat');
  document.getElementById('modalTitle').innerText = element.getAttribute('data-title');
  
  const isAcademic = element.hasAttribute('data-modul');
  const modalBody = document.getElementById('modalBodyElement');
  const slideshowContainer = document.getElementById('slideshowContainer');
  const standardDetails = document.getElementById('standardDetails');
  const academicDetails = document.getElementById('academicDetails');
  const taExtras = document.getElementById('taExtras');
  const modalExtLink = document.getElementById('modalExtLink');
  
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
    
    if(element.getAttribute('data-id') === 'ta-project') { taExtras.style.display = 'block'; } 
    else { taExtras.style.display = 'none'; }
    
    const extLink = element.getAttribute('data-link');
    if(extLink) {
      modalExtLink.href = extLink;
      modalExtLink.style.display = 'inline-block';
    } else {
      modalExtLink.style.display = 'none';
    }
    
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
      const images = imgString.split(',');
      images.forEach((imgSrc) => {
        const imgDiv = document.createElement('div');
        imgDiv.className = 'slide';
        imgDiv.innerHTML = `<img src="${imgSrc.trim()}" alt="Dokumentasi" loading="lazy">`;
        slideshowContainer.insertBefore(imgDiv, slideshowContainer.querySelector('.prev'));
      });
    }

    slideIndex = 1;
    showSlides(slideIndex);
  }
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden'; 
  document.getElementById('modalBox').focus(); 
}

function closeModal() {
  const container = document.getElementById('slideshowContainer');
  const iframes = container.querySelectorAll('iframe');
  iframes.forEach(iframe => iframe.src = iframe.src);

  document.getElementById('detailModal').classList.remove('active');
  document.body.style.overflow = 'auto'; 
}

function changeSlide(n) { showSlides(slideIndex += n); }

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slide");
  if (slides.length === 0) return;
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active");
  }
  slides[slideIndex - 1].classList.add("active");
}

window.onclick = function(event) {
  const modal = document.getElementById('detailModal');
  if (event.target == modal) closeModal();
}

document.addEventListener('keydown', function(event) {
  if(document.getElementById('detailModal').classList.contains('active')) {
    if(event.key === "Escape") closeModal();
    if(event.key === "ArrowLeft") changeSlide(-1);
    if(event.key === "ArrowRight") changeSlide(1);
  }
});