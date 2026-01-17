// ============================================
// UPGRADED JAVASCRIPT FOR PORTFOLIO
// ============================================

// ============================================
// PAGE LOADER (Prioritas Pertama!)
// ============================================
window.addEventListener('load', function () {
  const preloader = document.getElementById('preloader');
  
  if (preloader) {
    // Fade out effect
    preloader.style.opacity = '0';
    preloader.style.transition = 'opacity 0.5s ease';
    
    // Remove from DOM after animation
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  }
});

// ============================================
// NAVBAR FIXED ON SCROLL
// ============================================
window.onscroll = function () {
  const header = document.querySelector('header');
  
  if (header) {
    const fixedNav = header.offsetTop;
    
    if (window.pageYOffset > fixedNav) {
      header.classList.add('navbar-fixed');
    } else {
      header.classList.remove('navbar-fixed');
    }
  }
};

// ============================================
// HAMBURGER MENU TOGGLE
// ============================================
const hamburger = document.querySelector('#hamburger');
const navMenu = document.querySelector('#nav-menu');
const mobileMenu = document.querySelector('#mobile-menu');

if (hamburger) {
  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('hamburger-active');
    
    // Toggle untuk desktop nav-menu
    if (navMenu) {
      navMenu.classList.toggle('hidden');
    }
    
    // Toggle untuk mobile-menu (jika ada)
    if (mobileMenu) {
      mobileMenu.classList.toggle('hidden');
    }
  });
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
  if (hamburger && mobileMenu) {
    const isClickInsideMenu = mobileMenu.contains(event.target);
    const isClickOnHamburger = hamburger.contains(event.target);
    
    if (!isClickInsideMenu && !isClickOnHamburger && !mobileMenu.classList.contains('hidden')) {
      hamburger.classList.remove('hamburger-active');
      mobileMenu.classList.add('hidden');
    }
  }
});

// ============================================
// DARK MODE TOGGLE (Enhanced)
// ============================================
const html = document.documentElement;
const darkToggle = document.getElementById('dark-toggle');
const iconSunMoon = document.getElementById('icon-sun-moon');

if (darkToggle) {
  // Load saved theme on page load
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    html.classList.add('dark');
    if (iconSunMoon) iconSunMoon.textContent = '☀️';
  } else {
    html.classList.remove('dark');
    if (iconSunMoon) iconSunMoon.textContent = '🌙';
  }
  
  // Toggle dark mode
  darkToggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    
    if (html.classList.contains('dark')) {
      localStorage.theme = 'dark';
      if (iconSunMoon) iconSunMoon.textContent = '☀️';
    } else {
      localStorage.theme = 'light';
      if (iconSunMoon) iconSunMoon.textContent = '🌙';
    }
  });
}

// ============================================
// TYPING EFFECT (Enhanced)
// ============================================
const typingText = document.getElementById('typingText');

if (typingText) {
  const words = ['Dosen', 'Web Developer', 'UI/UX Designer', 'Tech Content Creator'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  
  function typeEffect() {
    const currentWord = words[wordIndex];
    const currentText = currentWord.substring(0, charIndex);
    
    typingText.textContent = currentText;
    
    if (!isDeleting) {
      // Typing
      if (charIndex < currentWord.length) {
        charIndex++;
        setTimeout(typeEffect, 100);
      } else {
        // Pause before deleting
        isDeleting = true;
        setTimeout(typeEffect, 1500);
      }
    } else {
      // Deleting
      if (charIndex > 0) {
        charIndex--;
        setTimeout(typeEffect, 50);
      } else {
        // Move to next word
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(typeEffect, 300);
      }
    }
  }
  
  // Start typing effect
  typeEffect();
}

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.offsetTop;
      const offsetPosition = elementPosition - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      
      // Close mobile menu if open
      if (hamburger && (navMenu || mobileMenu)) {
        hamburger.classList.remove('hamburger-active');
        if (navMenu) navMenu.classList.add('hidden');
        if (mobileMenu) mobileMenu.classList.add('hidden');
      }
    }
  });
});

// ============================================
// BACK TO TOP BUTTON (Enhanced)
// ============================================
const backToTop = document.getElementById('backToTop');

if (backToTop) {
  // Show/hide button on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTop.classList.remove('hidden');
      setTimeout(() => {
        backToTop.classList.remove('opacity-0');
        backToTop.classList.add('opacity-100');
      }, 10);
    } else {
      backToTop.classList.remove('opacity-100');
      backToTop.classList.add('opacity-0');
      setTimeout(() => {
        if (backToTop.classList.contains('opacity-0')) {
          backToTop.classList.add('hidden');
        }
      }, 300);
    }
  });
  
  // Scroll to top on click
  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}

// ============================================
// SCROLL REVEAL ANIMATION (NEW!)
// ============================================
const revealElements = document.querySelectorAll('.reveal');

if (revealElements.length > 0) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve after revealing (optional performance boost)
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  revealElements.forEach(element => {
    revealObserver.observe(element);
  });
}

// ============================================
// CARD HOVER 3D EFFECT (NEW!)
// ============================================
const cards = document.querySelectorAll('.card-hover');

cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
  });
});

// ============================================
// FLOATING ANIMATION FOR ORNAMENTS (NEW!)
// ============================================
const ornaments = document.querySelectorAll('.ornament');

ornaments.forEach((ornament, index) => {
  // Random animation delay for each ornament
  ornament.style.animationDelay = `${index * 0.5}s`;
});

// ============================================
// ACTIVE NAV LINK ON SCROLL (NEW!)
// ============================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a[href^="#"]');

if (sections.length > 0 && navLinks.length > 0) {
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// ============================================
// FORM VALIDATION (NEW!)
// ============================================
const contactForm = document.querySelector('form');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = this.querySelector('input[type="text"]');
    const email = this.querySelector('input[type="email"]');
    const message = this.querySelector('textarea');
    
    let isValid = true;
    
    // Simple validation
    if (name && name.value.trim() === '') {
      isValid = false;
      name.classList.add('border-red-500');
    } else if (name) {
      name.classList.remove('border-red-500');
    }
    
    if (email && email.value.trim() === '') {
      isValid = false;
      email.classList.add('border-red-500');
    } else if (email) {
      email.classList.remove('border-red-500');
    }
    
    if (message && message.value.trim() === '') {
      isValid = false;
      message.classList.add('border-red-500');
    } else if (message) {
      message.classList.remove('border-red-500');
    }
    
    if (isValid) {
      // Show success message
      alert('Pesan berhasil dikirim! Terima kasih.');
      this.reset();
    } else {
      alert('Mohon lengkapi semua field!');
    }
  });
}

// ============================================
// LAZY LOAD IMAGES (NEW!)
// ============================================
const lazyImages = document.querySelectorAll('img[data-src]');

if (lazyImages.length > 0) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });
  
  lazyImages.forEach(img => {
    imageObserver.observe(img);
  });
}

// ============================================
// IMAGE ERROR HANDLING (NEW!)
// ============================================
const images = document.querySelectorAll('img');

images.forEach(img => {
  img.addEventListener('error', function() {
    // Replace broken image with placeholder
    this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23f0f0f0" width="400" height="300"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="20" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3EImage not found%3C/text%3E%3C/svg%3E';
    this.classList.add('opacity-50');
  });
});

// ============================================
// PERFORMANCE: DEBOUNCE SCROLL EVENTS
// ============================================
function debounce(func, wait = 10) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debounce to scroll-heavy functions
const debouncedScroll = debounce(() => {
  // Your scroll functions here
}, 10);

window.addEventListener('scroll', debouncedScroll);

// ============================================
// CONSOLE MESSAGE (NEW!)
// ============================================
console.log(
  '%c🎨 Portfolio Website Loaded! ',
  'background: #8BA888; color: white; font-size: 16px; padding: 10px; border-radius: 5px;'
);

console.log(
  '%cDesigned with ❤️ using Tailwind CSS',
  'color: #6B9BD1; font-size: 12px;'
);

// ============================================
// PREVENT FLASH OF UNSTYLED CONTENT (NEW!)
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.visibility = 'visible';
});

// ============================================
// EASTER EGG: KONAMI CODE (NEW! Fun Feature)
// ============================================
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
  konamiCode.push(e.key);
  konamiCode.splice(-konamiSequence.length - 1, konamiCode.length - konamiSequence.length);
  
  if (konamiCode.join('').includes(konamiSequence.join(''))) {
    console.log('🎮 Konami Code Activated!');
    document.body.style.animation = 'rainbow 2s linear infinite';
    
    setTimeout(() => {
      document.body.style.animation = '';
    }, 5000);
  }
});

// Rainbow animation for easter egg
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
  @keyframes rainbow {
    0% { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(360deg); }
  }
`;
document.head.appendChild(rainbowStyle);