// Loading Animation
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const loader = document.querySelector('.loader-wrapper');
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 2000);

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });
});

const phrases = [
    'a Web Developer',
    'a Data Analytics enthusiast',
    'a Machine Learning Expert',
	'a Cloud Computing enthusiast' 
];

class TypingAnimation {
    constructor(elementId, phrases, options = {}) {
        this.element = document.getElementById(elementId);
        this.phrases = phrases;
        this.phraseIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.isWaiting = false;
        
        // Animation speeds
        this.typeSpeed = options.typeSpeed || 80;
        this.deleteSpeed = options.deleteSpeed || 40;
        this.pauseTime = options.pauseTime || 1500;
    }

    type() {
        const currentPhrase = this.phrases[this.phraseIndex];
        
        if (!this.isDeleting && this.charIndex <= currentPhrase.length) {
            // Typing forward
            this.element.textContent = currentPhrase.substring(0, this.charIndex);
            this.charIndex++;
            
            // Random speed variation for more natural typing
            const speedVariation = Math.random() * 50 - 25;
            setTimeout(() => this.type(), this.typeSpeed + speedVariation);
        } else if (this.isDeleting && this.charIndex >= 0) {
            // Deleting
            this.element.textContent = currentPhrase.substring(0, this.charIndex);
            this.charIndex--;
            setTimeout(() => this.type(), this.deleteSpeed);
        } else if (!this.isWaiting) {
            // Pause between phrases
            this.isWaiting = true;
            setTimeout(() => {
                this.isDeleting = !this.isDeleting;
                if (!this.isDeleting) {
                    this.phraseIndex = (this.phraseIndex + 1) % this.phrases.length;
                }
                this.isWaiting = false;
                this.type();
            }, this.pauseTime);
        }
    }

    start() {
        this.type();
    }
}

// Initialize the animation when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const typingAnimation = new TypingAnimation('dynamic-text', phrases, {
        typeSpeed: 80,
        deleteSpeed: 40,
        pauseTime: 1500
    });
    typingAnimation.start();
});

// Mobile menu toggle
// Toggle menu visibility and handle aria-expanded
document.getElementById('navToggle').addEventListener('click', () => {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    const isExpanded = navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', isExpanded);
});

// Close menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
    }
});

// Close menu with escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        
        if (navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    // Initialize progress rings with smooth animation
    const skillCards = document.querySelectorAll('.skill-card');
    
    // Intersection Observer for animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                const skillLevel = card.getAttribute('data-skill');
                
                // Animate the progress smoothly
                let progress = 0;
                const targetProgress = parseInt(skillLevel);
                const duration = 1500; // 1.5 seconds
                const interval = 16; // ~60fps
                const steps = duration / interval;
                const increment = targetProgress / steps;
                
                const progressAnimation = setInterval(() => {
                    progress += increment;
                    if (progress >= targetProgress) {
                        progress = targetProgress;
                        clearInterval(progressAnimation);
                    }
                    card.style.setProperty('--progress', progress);
                }, interval);
                
                // Add glow effect on intersection
                card.style.transition = 'all 0.3s ease';
                card.style.boxShadow = '0 0 20px rgba(79, 243, 255, 0.2)';
                
                observer.unobserve(card);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '50px'
    });

    // Observe each skill card
    skillCards.forEach(card => {
        observer.observe(card);
    });

    // Add hover effect for skill cards
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.skill-progress i');
            icon.style.transform = 'translate(-50%, -50%) scale(1.2)';
            icon.style.textShadow = '0 0 20px var(--primary-color)';
        });

        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.skill-progress i');
            icon.style.transform = 'translate(-50%, -50%) scale(1)';
            icon.style.textShadow = '0 0 10px var(--primary-color)';
        });
    });

    // Add parallax effect to background
    document.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
        
        document.body.style.backgroundPosition = `${moveX}px ${moveY}px`;
    });
});
document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for internship cards
    const internshipCards = document.querySelectorAll('.internship-card');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '50px'
    };

    const internshipObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Add glitch effect when card appears
                entry.target.classList.add('glitch-active');
                internshipObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initialize cards with opacity 0 and translated position
    internshipCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        internshipObserver.observe(card);
    });

    // Enhanced hover effects for cards
    internshipCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) scale(1.02)';
            card.style.boxShadow = `
                0 15px 30px rgba(79, 243, 255, 0.2),
                0 0 20px rgba(79, 243, 255, 0.3),
                inset 0 0 20px rgba(79, 243, 255, 0.2)
            `;
            
            // Add glitch effect on hover
            const glitchEffect = card.querySelector('.glitch-effect');
            glitchEffect.style.opacity = '1';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = `
                0 8px 32px rgba(0, 0, 0, 0.3),
                0 0 10px rgba(79, 243, 255, 0.2),
                inset 0 0 20px rgba(79, 243, 255, 0.1)
            `;
            
            // Remove glitch effect on mouse leave
            const glitchEffect = card.querySelector('.glitch-effect');
            glitchEffect.style.opacity = '0';
        });
    });

    // Random glitch effect for titles
    const neonTexts = document.querySelectorAll('.neon-text');
    
    function createRandomGlitch() {
        const randomText = neonTexts[Math.floor(Math.random() * neonTexts.length)];
        randomText.style.textShadow = 'none';
        
        setTimeout(() => {
            randomText.style.textShadow = '';
        }, 100);
    }

    setInterval(createRandomGlitch, 3000);
});
document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for internship cards
    const internshipCards = document.querySelectorAll('.timeline-content');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '50px'
    };

    const internshipObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Add glitch effect when card appears
                entry.target.classList.add('glitch-active');
                internshipObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initialize cards with opacity 0 and translated position
    internshipCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        internshipObserver.observe(card);
    });

    // Enhanced hover effects for cards
    internshipCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) scale(1.02)';
            card.style.boxShadow = `
                0 15px 30px rgba(79, 243, 255, 0.2),
                0 0 20px rgba(79, 243, 255, 0.3),
                inset 0 0 20px rgba(79, 243, 255, 0.2)
            `;
            
            // Add glitch effect on hover
            const glitchEffect = card.querySelector('.glitch-effect');
            glitchEffect.style.opacity = '1';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = `
                0 8px 32px rgba(0, 0, 0, 0.3),
                0 0 10px rgba(79, 243, 255, 0.2),
                inset 0 0 20px rgba(79, 243, 255, 0.1)
            `;
            
            // Remove glitch effect on mouse leave
            const glitchEffect = card.querySelector('.glitch-effect');
            glitchEffect.style.opacity = '0';
        });
    });

    // Random glitch effect for titles
    const neonTexts = document.querySelectorAll('.neon-text');
    
    function createRandomGlitch() {
        const randomText = neonTexts[Math.floor(Math.random() * neonTexts.length)];
        randomText.style.textShadow = 'none';
        
        setTimeout(() => {
            randomText.style.textShadow = '';
        }, 100);
    }

    setInterval(createRandomGlitch, 3000);
});
document.querySelector('#app').innerHTML = `
  <div>
    <section class="contact-section">
      <h2 class="section-title">Contact Me</h2>
      <div class="contact-container">
        <div class="contact-info">
          <div class="contact-card">
            <a href="https://wa.me/919059282712" target="_blank" class="contact-item">
              <i class="fab fa-whatsapp"></i>
              <span>WhatsApp</span>
            </a>
          </div>
          <div class="contact-card">
            <a href="mailto:vihasithsr@gmail.com" class="contact-item">
              <i class="fas fa-envelope"></i>
              <span>vihasithsr@gmail.com</span>
            </a>
          </div>
          <div class="contact-card">
            <a href="https://www.linkedin.com/in/vihasith-ranga/" target="_blank" class="contact-item">
              <i class="fab fa-linkedin"></i>
              <span>LinkedIn Profile</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>`;
