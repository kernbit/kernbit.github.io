let currentLanguage = 'tr';

function toggleLanguage() {
    currentLanguage = currentLanguage === 'tr' ? 'en' : 'tr';
    const langButton = document.getElementById('langToggle');
    
    if (currentLanguage === 'en') {
        langButton.innerHTML = '<i class="fas fa-globe"></i> TR';
    } else {
        langButton.innerHTML = '<i class="fas fa-globe"></i> EN';
    }
    
    updateLanguage();
}

function updateLanguage() {
    const elements = document.querySelectorAll('[data-tr][data-en]');
    
    elements.forEach(element => {
        const text = currentLanguage === 'tr' ? element.getAttribute('data-tr') : element.getAttribute('data-en');
        element.textContent = text;
    });
}

function createMatrixEffect() {
    const matrix = document.getElementById('matrix');
    const chars = '01';
    const columns = Math.floor(window.innerWidth / 20);
    
    for (let i = 0; i < columns; i++) {
        const drop = document.createElement('div');
        drop.style.position = 'absolute';
        drop.style.left = i * 20 + 'px';
        drop.style.color = '#00ff41';
        drop.style.fontSize = '14px';
        drop.style.fontFamily = 'monospace';
        drop.style.animation = `matrixDrop ${2 + Math.random() * 3}s linear infinite`;
        drop.style.animationDelay = Math.random() * 2 + 's';
        drop.textContent = chars[Math.floor(Math.random() * chars.length)];
        matrix.appendChild(drop);
    }
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width;
            }
        });
    });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

function addMatrixRain() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes matrixDrop {
            0% {
                transform: translateY(-100vh);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

function handleNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');
            const element = document.querySelector(target);
            
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function handleMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

function typeWriter() {
    const typeElement = document.querySelector('.typing-text');
    const texts = ['whoami', 'ls -la', 'nmap -sS', 'cat /etc/passwd'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typeElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typeElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 100 : 150;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    type();
}

function handleContactForm() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        const terminalBody = form.closest('.terminal-body');
        const successLine = document.createElement('div');
        successLine.className = 'terminal-line';
        successLine.innerHTML = `
            <span class="prompt">kernbit@contact:~$ </span>
            <span class="output success">Mesaj başarıyla gönderildi! ✓</span>
        `;
        
        terminalBody.appendChild(successLine);
        
        form.reset();
        
        setTimeout(() => {
            successLine.remove();
        }, 5000);
    });
}

function addScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    
    const animatedElements = document.querySelectorAll('.project-card, .certificate-card, .stat-card, .tool-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

function addFloatingParticles() {
    const hero = document.querySelector('.hero');
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.background = '#00ff41';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${3 + Math.random() * 4}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 3 + 's';
        particle.style.opacity = '0.3';
        hero.appendChild(particle);
    }
}

function addHackerEffects() {
    const terminalLines = document.querySelectorAll('.terminal-line');
    
    terminalLines.forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = '1';
        }, index * 300);
        line.style.opacity = '0';
        line.style.transition = 'opacity 0.3s ease';
    });
}

function handleProjectCardHover() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const techTags = card.querySelectorAll('.project-tech span');
            techTags.forEach((tag, index) => {
                setTimeout(() => {
                    tag.style.transform = 'scale(1.1)';
                }, index * 100);
            });
        });
        
        card.addEventListener('mouseleave', () => {
            const techTags = card.querySelectorAll('.project-tech span');
            techTags.forEach(tag => {
                tag.style.transform = 'scale(1)';
            });
        });
    });
}

function initializePortfolio() {
    updateLanguage();
    createMatrixEffect();
    addMatrixRain();
    animateSkillBars();
    handleNavigation();
    handleMobileMenu();
    typeWriter();
    handleContactForm();
    addScrollAnimations();
    addFloatingParticles();
    addHackerEffects();
    handleProjectCardHover();
    
    setTimeout(() => {
        const heroElement = document.querySelector('.hero');
        heroElement.style.opacity = '1';
    }, 100);
}

document.addEventListener('DOMContentLoaded', initializePortfolio);

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    }
});

window.addEventListener('resize', () => {
    const matrix = document.getElementById('matrix');
    matrix.innerHTML = '';
    createMatrixEffect();
});
