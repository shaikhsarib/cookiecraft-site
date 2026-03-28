document.addEventListener('DOMContentLoaded', () => {
    // Scroll Reveals
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.style.opacity === '0' || entry.target.style.opacity === 0) {
                    entry.target.style.transition = 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.8s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: "0px 0px -50px 0px" });

    const elements = document.querySelectorAll('[style*="opacity:0"], [style*="opacity: 0"], [data-reveal], [data-cta-reveal]');
    elements.forEach(el => {
        if (el.tagName === 'H1' || el.tagName === 'H2' || el.tagName === 'P' || el.tagName === 'ARTICLE' || el.tagName === 'A' || el.tagName === 'DIV' && el.hasAttribute('data-reveal')) {
            el.style.transform = 'translateY(40px)';
        }
        observer.observe(el);
    });

    // Magnetic Button Effect
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    if (magneticBtns.length > 0) {
        magneticBtns.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                btn.style.transition = 'none';
                btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.3s';
                btn.style.transform = '';
            });
        });
    }
    
    // Mobile Menu Toggle logic
    const toggleBtn = document.querySelector('button[aria-controls="mobile-menu"]');
    const mobileMenu = document.getElementById('mobile-menu');
    if(toggleBtn && mobileMenu) {
        // Find the styling spans inside the button to animate them
        const spans = toggleBtn.querySelectorAll('span');
        
        toggleBtn.addEventListener('click', () => {
            const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
            toggleBtn.setAttribute('aria-expanded', !isExpanded);
            if (!isExpanded) {
                mobileMenu.classList.remove('max-h-0', 'opacity-0');
                mobileMenu.classList.add('max-h-screen', 'opacity-100');
                if(spans.length >= 3) {
                    spans[0].style.transform = 'translateY(8px) rotate(45deg)';
                    spans[1].style.opacity = '0';
                    spans[2].style.transform = 'translateY(-8px) rotate(-45deg)';
                }
            } else {
                mobileMenu.classList.add('max-h-0', 'opacity-0');
                mobileMenu.classList.remove('max-h-screen', 'opacity-100');
                if(spans.length >= 3) {
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            }
        });
        
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                toggleBtn.setAttribute('aria-expanded', 'false');
                mobileMenu.classList.add('max-h-0', 'opacity-0');
                mobileMenu.classList.remove('max-h-screen', 'opacity-100');
                if(spans.length >= 3) {
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            });
        });
    }
});
