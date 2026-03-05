// ============================================
// 李玲玲 - Personal Resume Interactions
// ============================================

// --- Navigation scroll effect ---
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

// --- Project card toggle ---
function toggleProject(header) {
  const card = header.closest('.project-card');
  const isOpen = card.classList.contains('open');

  // Close all cards first (accordion behavior)
  document.querySelectorAll('.project-card.open').forEach(c => {
    if (c !== card) c.classList.remove('open');
  });

  card.classList.toggle('open', !isOpen);
}

// --- Image Modal ---
function openModal(src, caption) {
  const modal = document.getElementById('imageModal');
  const img = document.getElementById('modalImg');
  const cap = document.getElementById('modalCaption');

  img.src = src;
  cap.textContent = caption || '';
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('imageModal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// --- Scroll reveal animation ---
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', () => {
  // Add fade-in class to animatable elements
  const selectors = [
    '.project-card',
    '.edu-card',
    '.skill-item',
    '.overview-card',
    '.category-label',
    '.exp-header',
  ];

  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      el.classList.add('fade-in');
      observer.observe(el);
    });
  });

  // Auto-open first project card
  const firstCard = document.querySelector('.project-card');
  if (firstCard) firstCard.classList.add('open');
});

// --- Export PDF (open all cards, print, restore) ---
function exportPDF() {
  const cards = document.querySelectorAll('.project-card');
  const wasOpen = new Set();
  cards.forEach(card => {
    if (card.classList.contains('open')) wasOpen.add(card);
    card.classList.add('open');
  });

  // Small delay for layout to settle, then print
  setTimeout(() => {
    window.print();
    // Restore after print dialog closes
    setTimeout(() => {
      cards.forEach(card => {
        if (!wasOpen.has(card)) card.classList.remove('open');
      });
    }, 500);
  }, 100);
}

// --- Dark mode toggle ---
const themeToggle = document.getElementById('themeToggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

function setTheme(dark) {
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  localStorage.setItem('theme', dark ? 'dark' : 'light');
}

// Init: check saved preference, then system preference
const saved = localStorage.getItem('theme');
if (saved) {
  setTheme(saved === 'dark');
} else {
  setTheme(prefersDark.matches);
}

themeToggle.addEventListener('click', () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  setTheme(!isDark);
});

// --- Smooth active nav link ---
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    if (window.scrollY >= top) {
      current = section.getAttribute('id');
    }
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});
