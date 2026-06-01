// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const isDesktop = window.innerWidth >= 1025;
            
            if (isDesktop) {
                // Desktop: horizontal scroll
                const main = document.querySelector('main');
                const offset = target.offsetLeft;
                main.scrollTo({
                    left: offset - 40,
                    behavior: 'smooth'
                });
            } else {
                // Mobile: vertical scroll
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Add active state to navbar links
window.addEventListener('scroll', () => {
    const isDesktop = window.innerWidth >= 1025;
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.navbar a');

    let current = '';
    
    if (isDesktop) {
        // Desktop: check horizontal scroll position
        const main = document.querySelector('main');
        const mainRect = main.getBoundingClientRect();
        
        sections.forEach(section => {
            const sectionRect = section.getBoundingClientRect();
            if (sectionRect.left < mainRect.right && sectionRect.right > mainRect.left) {
                current = section.getAttribute('id');
            }
        });
    } else {
        // Mobile: check vertical scroll position
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
    }

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Detect device type and log it
function detectDeviceType() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isDesktop = window.innerWidth >= 1025;
    const deviceType = isDesktop ? 'Desktop/PC' : 'Mobile/Tablet';
    const scrollMode = isDesktop ? 'Horizontal' : 'Vertical';
    console.log(`Device Type: ${deviceType} | Scroll Mode: ${scrollMode} | Screen Width: ${window.innerWidth}px | Mobile UA: ${isMobile}`);
}

// Optional: Add animation on page load
window.addEventListener('load', () => {
    console.log('Biography website loaded successfully!');
    detectDeviceType();
});

// Handle window resize to adapt layout
window.addEventListener('resize', () => {
    detectDeviceType();
});
