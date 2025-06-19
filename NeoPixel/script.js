// script.js - Advanced NeoPixel Anime Webverse

document.addEventListener('DOMContentLoaded', function() {
  // Initialize loader
  const loader = document.getElementById('loader');
  
  // Hide loader when everything is loaded
  window.addEventListener('load', function() {
    // Animate loader out
    gsap.to(loader, {
      opacity: 0,
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: function() {
        loader.style.visibility = 'hidden';
      }
    });
    
    // Initialize animations and effects after load
    initParticles();
    initSplide();
    initScrollEffects();
    initBackToTop();
  });

  // Initialize AOS animations
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
  });

  // Theme toggle functionality
  const themeToggle = document.getElementById('themeToggle');
  const toggleIcon = document.getElementById('toggleIcon');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

  // Check local storage or prefered color scheme
  if (localStorage.getItem('theme') === 'dark' || 
      (!localStorage.getItem('theme') && prefersDarkScheme.matches)) {
    document.body.classList.add('dark');
  }

  themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  // Mobile menu toggle
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', function() {
    this.classList.toggle('active');
    navLinks.classList.toggle('active');
    this.setAttribute('aria-expanded', 
      this.getAttribute('aria-expanded') === 'false' ? 'true' : 'false');
  });

  // Close mobile menu when clicking on a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Form submission
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const formData = new FormData(this);
      const data = Object.fromEntries(formData.entries());
      
      // Here you would typically send the data to a server
      console.log('Form submitted:', data);
      
      // Show success message
      alert('Thank you for your message! I will get back to you soon.');
      this.reset();
    });
  }

  // Initialize Particles.js background
  function initParticles() {
    if (typeof particlesJS !== 'undefined') {
      particlesJS('particles-js', {
        "particles": {
          "number": {
            "value": 80,
            "density": {
              "enable": true,
              "value_area": 800
            }
          },
          "color": {
            "value": "#9d4edd"
          },
          "shape": {
            "type": "circle",
            "stroke": {
              "width": 0,
              "color": "#000000"
            },
            "polygon": {
              "nb_sides": 5
            }
          },
          "opacity": {
            "value": 0.5,
            "random": false,
            "anim": {
              "enable": false,
              "speed": 1,
              "opacity_min": 0.1,
              "sync": false
            }
          },
          "size": {
            "value": 3,
            "random": true,
            "anim": {
              "enable": false,
              "speed": 40,
              "size_min": 0.1,
              "sync": false
            }
          },
          "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#9d4edd",
            "opacity": 0.4,
            "width": 1
          },
          "move": {
            "enable": true,
            "speed": 2,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
              "enable": false,
              "rotateX": 600,
              "rotateY": 1200
            }
          }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": {
            "onhover": {
              "enable": true,
              "mode": "grab"
            },
            "onclick": {
              "enable": true,
              "mode": "push"
            },
            "resize": true
          },
          "modes": {
            "grab": {
              "distance": 140,
              "line_linked": {
                "opacity": 1
              }
            },
            "bubble": {
              "distance": 400,
              "size": 40,
              "duration": 2,
              "opacity": 8,
              "speed": 3
            },
            "repulse": {
              "distance": 200,
              "duration": 0.4
            },
            "push": {
              "particles_nb": 4
            },
            "remove": {
              "particles_nb": 2
            }
          }
        },
        "retina_detect": true
      });
    }
  }

  // Initialize Splide.js gallery
  function initSplide() {
    if (typeof Splide !== 'undefined') {
      new Splide('.splide', {
        type: 'loop',
        perPage: 3,
        perMove: 1,
        gap: '2rem',
        pagination: false,
        breakpoints: {
          992: {
            perPage: 2
          },
          768: {
            perPage: 1
          }
        }
      }).mount();
    }
  }

  // Initialize scroll effects
  function initScrollEffects() {
    // Add scroll animations with GSAP
    gsap.utils.toArray('.section').forEach((section, i) => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none"
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out",
        delay: i * 0.1
      });
    });
  }

  // Initialize back to top button
  function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });
    
    backToTop.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
    // Mouse movement ripple effect
  const ripple = document.getElementById('ripple-effect');
  
  document.addEventListener('mousemove', (e) => {
    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;
    ripple.style.transform = `translate(-50%, -50%) scale(1)`;
    ripple.style.opacity = '1';
    
    // Reset animation
    clearTimeout(ripple.timeout);
    ripple.timeout = setTimeout(() => {
      ripple.style.transform = `translate(-50%, -50%) scale(0)`;
      ripple.style.opacity = '0';
    }, 300);
  });
});

// Particle Trail Effect
function initParticleTrail() {
  const canvas = document.getElementById('particle-trail');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const particles = [];
  const colors = ['#ff3366', '#00ccff', '#9933ff', '#ffcc00'];
  let mouseX = 0;
  let mouseY = 0;

  class Particle {
    constructor() {
      this.x = mouseX;
      this.y = mouseY;
      this.size = Math.random() * 5 + 2;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.speedX = Math.random() * 3 - 1.5;
      this.speedY = Math.random() * 3 - 1.5;
      this.life = 100;
    }
    
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.life--;
      this.size *= 0.98;
    }
    
    draw() {
      ctx.globalAlpha = this.life / 100;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Create new particles
    if (particles.length < 100) {
      for (let i = 0; i < 3; i++) {
        particles.push(new Particle());
      }
    }
    
    // Update and draw particles
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
      
      // Remove dead particles
      if (particles[i].life <= 0) {
        particles.splice(i, 1);
        i--;
      }
    }
    
    requestAnimationFrame(animateParticles);
  }

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  animateParticles();
}

// Call this in your DOMContentLoaded
initParticleTrail();

