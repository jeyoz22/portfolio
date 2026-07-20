// 1. Scroll Progress Indicator Logic
window.addEventListener('scroll', () => {
  let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  document.getElementById("scrollTrace").style.width = (winScroll / height) * 100 + "%";
});

// 2. Project Filtering Logic
function filterProjects(tag, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const cards = document.querySelectorAll('.proj-card');
  cards.forEach(card => {
    if (tag === 'all') { 
      card.classList.remove('hide'); 
    } else {
      if (card.classList.contains('filter-' + tag)) { 
        card.classList.remove('hide'); 
      } else { 
        card.classList.add('hide'); 
      }
    }
  });
}

// 3. Modal JS (With Data Injection & Video Support)
let slideIndex = 1;

function openModal(element) {
  const modal = document.getElementById('detailModal');
  
  document.getElementById('modalCat').innerText = element.getAttribute('data-cat');
  document.getElementById('modalTitle').innerText = element.getAttribute('data-title');
  document.getElementById('modalProblem').innerText = element.getAttribute('data-problem');
  document.getElementById('modalSolution').innerText = element.getAttribute('data-solution');
  document.getElementById('modalImpact').innerText = element.getAttribute('data-impact');
  
  // Inject TA Extras jika Project adalah Tugas Akhir
  const taExtras = document.getElementById('taExtras');
  if(element.getAttribute('data-id') === 'ta-project') { 
    taExtras.style.display = 'block'; 
  } else { 
    taExtras.style.display = 'none'; 
  }
  
  // Setup Gambar & Video Slideshow
  const imgString = element.getAttribute('data-images');
  const videoUrl = element.getAttribute('data-video');
  const container = document.getElementById('slideshowContainer');
  
  // Hapus slide lama
  const oldSlides = container.querySelectorAll('.slide');
  oldSlides.forEach(slide => slide.remove());
  
  // Inject Iframe jika ada video TVRI
  if (videoUrl) {
    const vidDiv = document.createElement('div');
    vidDiv.className = 'slide';
    vidDiv.innerHTML = `<iframe src="${videoUrl}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    container.insertBefore(vidDiv, container.querySelector('.prev'));
  }

  // Inject Images
  if (imgString) {
    const images = imgString.split(',');
    images.forEach((imgSrc) => {
      const imgDiv = document.createElement('div');
      imgDiv.className = 'slide';
      imgDiv.innerHTML = `<img src="${imgSrc.trim()}" alt="Dokumentasi" loading="lazy">`;
      container.insertBefore(imgDiv, container.querySelector('.prev'));
    });
  }

  slideIndex = 1;
  showSlides(slideIndex);
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden'; 
  document.getElementById('modalBox').focus(); 
}

function closeModal() {
  const container = document.getElementById('slideshowContainer');
  // Hentikan video saat modal ditutup dengan menghapus iframe sementara
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

// Navigasi Keyboard
document.addEventListener('keydown', function(event) {
  if(document.getElementById('detailModal').classList.contains('active')) {
    if(event.key === "Escape") closeModal();
    if(event.key === "ArrowLeft") changeSlide(-1);
    if(event.key === "ArrowRight") changeSlide(1);
  }
});