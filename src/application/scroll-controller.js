class ScrollController {
    constructor() {
        this.scrollIndicator = document.querySelector('.scroll-indicator');
        this.sections = document.querySelectorAll('section');
        this.hero = document.querySelector('.hero');
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupIntersectionObserver();
    }

    bindEvents() {
        window.addEventListener('scroll', this.handleScroll.bind(this));
        window.addEventListener('scroll', this.updateScrollIndicator.bind(this));
    }

    handleScroll() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        
        
        // Hero parallax effect
        if (this.hero) {
            const heroContent = this.hero.querySelector('.hero-content');
            const translateY = scrollY * 0.5;
            const opacity = Math.max(0, 1 - (scrollY / windowHeight));
            
            heroContent.style.transform = `translateY(${translateY}px)`;
            heroContent.style.opacity = opacity;
        }
    }

    updateScrollIndicator() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        
        if (this.scrollIndicator) {
            this.scrollIndicator.style.width = scrollPercent + '%';
        }
    }

    setupIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, options);

        this.sections.forEach(section => {
            observer.observe(section);
        });
    }

    // Smooth scroll to element
    scrollToElement(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            const offsetTop = element.offsetTop;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
}