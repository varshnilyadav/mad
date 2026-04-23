/* ====================================================
   MAD AUTO DETAILING STUDIO — Main JavaScript
   ==================================================== */

// --- Navbar Scroll Effect ---
const navbar = document.getElementById('main-nav');
let lastScroll = 0;

function handleNavScroll() {
  const scrollY = window.scrollY;
  
  if (scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScroll = scrollY;
}

window.addEventListener('scroll', handleNavScroll, { passive: true });

// --- Mobile Nav Toggle ---
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('active');
  document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Close mobile nav on link click
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// --- Intersection Observer for Scroll Animations ---
const animatedElements = document.querySelectorAll('[data-animate]');

const observerOptions = {
  root: null,
  rootMargin: '0px 0px -80px 0px',
  threshold: 0.1
};

const animateObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('is-visible');
      }, parseInt(delay));
      animateObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

animatedElements.forEach(el => animateObserver.observe(el));

// --- Counter Animation ---
function animateCounter(el) {
  const target = parseInt(el.dataset.count);
  if (!target) return;
  
  const duration = 2000;
  const steps = 60;
  const increment = target / steps;
  let current = 0;
  const stepTime = duration / steps;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      el.textContent = target.toLocaleString() + (target >= 1000 ? '+' : '+');
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current).toLocaleString();
    }
  }, stepTime);
}

// Observe stat numbers
const statNumbers = document.querySelectorAll('.stat-number[data-count]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statNumbers.forEach(el => counterObserver.observe(el));

// --- Smooth Scroll for Anchor Links ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const navHeight = navbar.offsetHeight;
      const targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight;
      
      window.scrollTo({
        top: targetPos,
        behavior: 'smooth'
      });
    }
  });
});

// --- Parallax Effect on Hero Image ---
const heroImg = document.querySelector('.hero-img');

function handleParallax() {
  if (window.innerWidth < 768) return;
  const scrollY = window.scrollY;
  const speed = 0.3;
  
  if (heroImg && scrollY < window.innerHeight) {
    heroImg.style.transform = `translateY(${scrollY * speed}px) scale(1.05)`;
  }
}

window.addEventListener('scroll', handleParallax, { passive: true });

// --- Magnetic Cursor Effect on CTA Buttons ---
const magneticBtns = document.querySelectorAll('.btn-primary');

magneticBtns.forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) translateY(-2px)`;
  });
  
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

// --- Dynamic Glow on Service Cards (Mouse Track) ---
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty('--glow-x', `${x}px`);
    card.style.setProperty('--glow-y', `${y}px`);
    card.style.background = `
      radial-gradient(600px circle at ${x}px ${y}px, rgba(230, 0, 0, 0.04), transparent 40%),
      var(--black-card)
    `;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.background = '';
  });
});

// --- Preloader ---
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  
  // Trigger hero animations on load
  const heroAnimations = document.querySelectorAll('.hero-content [data-animate]');
  heroAnimations.forEach(el => {
    const delay = el.dataset.delay || 0;
    setTimeout(() => {
      el.classList.add('is-visible');
    }, parseInt(delay) + 300);
  });
});

// --- Active Nav Link Highlight ---
const sections = document.querySelectorAll('section[id]');

function highlightActiveNav() {
  const scrollY = window.scrollY + 100;
  
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    
    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        link.style.color = '#E60000';
        link.style.setProperty('--after-width', '100%');
      } else {
        link.style.color = '';
      }
    }
  });
}

window.addEventListener('scroll', highlightActiveNav, { passive: true });

// --- Testimonials Infinite Scroll ---
const testimonialsTrack = document.getElementById('testimonials-track');
if (testimonialsTrack) {
  const cards = testimonialsTrack.querySelectorAll('.testimonial-card');
  cards.forEach(card => {
    const clone = card.cloneNode(true);
    clone.removeAttribute('id');
    testimonialsTrack.appendChild(clone);
  });
}

// --- Brands Marquee Infinite Scroll ---
const brandsMarquee = document.getElementById('brands-marquee');
if (brandsMarquee) {
  const brands = brandsMarquee.querySelectorAll('.brand-item');
  brands.forEach(brand => {
    const clone = brand.cloneNode(true);
    brandsMarquee.appendChild(clone);
  });
}

// --- WhatsApp Booking Form Handling ---
const bookingForm = document.getElementById('booking-form');
if (bookingForm) {
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('b-name').value;
    const phone = document.getElementById('b-phone').value;
    const vehicle = document.getElementById('b-vehicle').value;
    const date = document.getElementById('b-date').value;
    const service = document.getElementById('b-service').value;
    
    const whatsappNumber = '919493134501'; 
    const message = `*NEW BOOKING REQUEST*%0A%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Vehicle Model:* ${vehicle}%0A*Preferred Date:* ${date}%0A*Primary Service:* ${service}%0A%0AHi MAD Auto Detailing! I would like to confirm my slot for the above service.`;
    
    // Redirect to WhatsApp API
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
    
    // Optional: reset form
    bookingForm.reset();
  });
}

console.log('%c MAD AUTO DETAILING STUDIO ', 'background: #E60000; color: #fff; font-size: 14px; font-weight: bold; padding: 8px 16px; border-radius: 4px;');
console.log('%c Premium Auto Detailing — Vanasthalipuram, Hyderabad ', 'color: #B0B0B0; font-size: 11px;');
