/* ===========================
   SCRIPT.JS — Portfolio JS
=========================== */

// ========== CURSOR GLOW ==========
const cursorGlow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top = e.clientY + 'px';
});

// ========== NAVBAR SCROLL ==========
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ========== HAMBURGER MENU ==========
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Close menu on link click
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

// ========== TYPED TEXT EFFECT ==========
const phrases = [
  'AI & ML Developer 🤖',
  'NLP Engineer 🧠',
  'Full-Stack Builder 🌐',
  'Problem Solver 🚀',
  'Python Enthusiast 🐍',
];
const typedEl = document.getElementById('typedText');
let phraseIdx = 0;
let charIdx = 0;
let isDeleting = false;
let typingSpeed = 80;

function type() {
  const current = phrases[phraseIdx];
  if (isDeleting) {
    typedEl.textContent = current.slice(0, charIdx - 1);
    charIdx--;
    typingSpeed = 40;
  } else {
    typedEl.textContent = current.slice(0, charIdx + 1);
    charIdx++;
    typingSpeed = 80;
  }

  if (!isDeleting && charIdx === current.length) {
    isDeleting = true;
    typingSpeed = 1800; // pause at end
  } else if (isDeleting && charIdx === 0) {
    isDeleting = false;
    phraseIdx = (phraseIdx + 1) % phrases.length;
    typingSpeed = 400; // pause before next
  }
  setTimeout(type, typingSpeed);
}

// Start typing after a short delay
setTimeout(type, 800);

// ========== SCROLL REVEAL ==========
function addRevealClass() {
  const elements = document.querySelectorAll(
    '.about-text, .about-card-wrap, .skill-category, .project-card, .contact-text, .contact-cta-card, .hero-badge, .hero-stats, .more-projects, .section-label, .section-title, .section-subtitle'
  );
  elements.forEach(el => el.classList.add('reveal'));
}

function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    const windowH = window.innerHeight;
    if (top < windowH - 80) {
      el.classList.add('visible');
    }
  });
}

addRevealClass();
window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // run once on load

// ========== SMOOTH ACTIVE NAV HIGHLIGHT ==========
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinkEls.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === '#' + current) {
      link.style.color = '#6c63ff';
    }
  });
});

// ========== SKILL TAGS HOVER STAGGER ==========
document.querySelectorAll('.skill-category').forEach((cat, i) => {
  cat.style.animationDelay = `${i * 0.1}s`;
});

// ========== PROJECT CARDS STAGGER ANIMATION ==========
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.1}s`;
});

// ========== HERO STATS COUNTER ==========
function animateCounter(el, target, suffix = '') {
  let count = 0;
  const step = Math.ceil(target / 30);
  const interval = setInterval(() => {
    count += step;
    if (count >= target) {
      el.textContent = target + suffix;
      clearInterval(interval);
    } else {
      el.textContent = count + suffix;
    }
  }, 50);
}

// Observe stats section
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNums = entry.target.querySelectorAll('.stat-num');
      statNums.forEach(el => {
        const text = el.textContent;
        const num = parseInt(text);
        if (!isNaN(num)) {
          const suffix = text.includes('+') ? '+' : '';
          el.textContent = '0' + suffix;
          animateCounter(el, num, suffix);
        }
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// ========== SCROLL TO TOP ON LOGO CLICK ==========
document.querySelector('.nav-logo').addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========== HIGHLIGHT ITEMS ENTRANCE ==========
const highlightObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const items = entry.target.querySelectorAll('.highlight-item');
      items.forEach((item, i) => {
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        }, i * 100);
      });
    }
  });
}, { threshold: 0.3 });

const aboutHighlights = document.querySelector('.about-highlights');
if (aboutHighlights) {
  aboutHighlights.querySelectorAll('.highlight-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'all 0.4s ease';
  });
  highlightObserver.observe(aboutHighlights);
}

// ========== SKILL TAGS ENTRANCE ==========
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const tags = entry.target.querySelectorAll('.skill-tag');
      tags.forEach((tag, i) => {
        setTimeout(() => {
          tag.style.opacity = '1';
          tag.style.transform = 'scale(1)';
        }, i * 60);
      });
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.skill-category').forEach(cat => {
  cat.querySelectorAll('.skill-tag').forEach(tag => {
    tag.style.opacity = '0';
    tag.style.transform = 'scale(0.8)';
    tag.style.transition = 'all 0.3s ease';
  });
  skillObserver.observe(cat);
});

// ========== FOOTER YEAR ==========
const footerText = document.querySelector('.footer-text');
if (footerText) {
  const year = new Date().getFullYear();
  footerText.innerHTML = footerText.innerHTML.replace('2026', year);
}

// ========== LOG ==========
console.log('%cBeerangi Rajani Portfolio 🚀', 'color:#6c63ff;font-size:18px;font-weight:bold;');
console.log('%cBuilt with HTML, CSS & JavaScript', 'color:#00d4ff;font-size:12px;');
