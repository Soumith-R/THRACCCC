document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.getElementById('mainNav') || document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            const isOpen = mainNav.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', String(isOpen));
        });
    }

    // Dropdown Menu Functionality
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const dropdownLink = dropdown.querySelector('a');
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        
        if (dropdownLink && dropdownMenu) {
            // Handle click events for dropdown toggle (mobile only)
            dropdownLink.addEventListener('click', function(e) {
                const isMobile = window.matchMedia('(max-width: 992px)').matches;
                if (!isMobile) return; // allow normal navigation on desktop
                e.preventDefault();

                // Close all other dropdowns
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                    }
                });
                
                // Toggle current dropdown
                dropdown.classList.toggle('active');
            });
        }
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });

    // Header actions menu (mobile)
    const headerToggle = document.querySelector('.header-menu-toggle');
    const headerMenu = document.getElementById('headerActionsMenu');

    if (headerToggle && headerMenu) {
        headerToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const willShow = !headerMenu.classList.contains('show');
            headerMenu.classList.toggle('show', willShow);
            headerToggle.setAttribute('aria-expanded', String(willShow));
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.header-menu') && !e.target.closest('.header-menu-toggle')) {
                headerMenu.classList.remove('show');
                headerToggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Close menu if resizing to desktop
        window.addEventListener('resize', () => {
            if (window.matchMedia('(min-width: 993px)').matches) {
                headerMenu.classList.remove('show');
                headerToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Hero Slider
    const slides = document.querySelectorAll('.hero-slider .slide');
    const dotsContainer = document.querySelector('.slider-dots');
    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds

    if (slides.length > 0) {
        // Create dots
        slides.forEach((slide, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                setCurrentSlide(index);
            });
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.slider-dots .dot');

        function setCurrentSlide(index) {
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            currentSlide = index;
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        function nextSlide() {
            let newSlide = (currentSlide + 1) % slides.length;
            setCurrentSlide(newSlide);
        }

        setInterval(nextSlide, slideInterval);
    }
});
