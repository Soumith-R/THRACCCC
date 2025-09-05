document.addEventListener('DOMContentLoaded', function() {
    // Ensure main nav starts scrolled to the first item on small screens
    const navContainer = document.querySelector('.main-nav-container');
    const ensureNavStart = () => {
        if (!navContainer) return;
        const isMobile = window.matchMedia('(max-width: 992px)').matches;
        if (isMobile) {
            navContainer.scrollLeft = 0;
        }
    };
    ensureNavStart();
    window.addEventListener('resize', ensureNavStart);
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
    let currentOpenDropdown = null;
    let currentOpenMenu = null;

    function floatDropdownMenu(triggerEl, menuEl) {
        // Position the submenu fixed to overlay the body, not inside the scroller
        const rect = triggerEl.getBoundingClientRect();
        const vw = window.innerWidth || document.documentElement.clientWidth;
        const vh = window.innerHeight || document.documentElement.clientHeight;
        const margin = 6; // small viewport margin
        // Choose a width within the viewport, respecting min width ~260px
        const desiredMin = 260;
        let width = Math.max(desiredMin, Math.min(menuEl.offsetWidth || desiredMin, vw - margin * 2));
        let left = Math.max(margin, Math.min(rect.left, vw - width - margin));
        let top = Math.round(rect.bottom);

        // Prepare for measurement
        const prevStyles = {
            position: menuEl.style.position,
            top: menuEl.style.top,
            left: menuEl.style.left,
            right: menuEl.style.right,
            minWidth: menuEl.style.minWidth,
            opacity: menuEl.style.opacity,
            visibility: menuEl.style.visibility,
            transform: menuEl.style.transform,
        };

        menuEl.style.position = 'fixed';
        menuEl.style.top = `${top}px`;
        menuEl.style.left = `${left}px`;
        menuEl.style.right = 'auto';
        menuEl.style.minWidth = `${width}px`;
    // Prepare for measurement (hidden but laid out)
    menuEl.style.opacity = '0';
    menuEl.style.visibility = 'hidden';
    menuEl.style.transform = 'translateY(8px) scale(0.98)';

        // Measure height and adjust top to keep within viewport
        const menuHeight = menuEl.offsetHeight || 0;
        if (top + menuHeight > vh - margin) {
            top = Math.max(margin, vh - margin - menuHeight);
            menuEl.style.top = `${top}px`;
        }
        // Finally show and animate in
        menuEl.style.visibility = 'visible';
        requestAnimationFrame(() => {
            menuEl.style.opacity = '1';
            menuEl.style.transform = 'translateY(0) scale(1)';
        });
        menuEl.classList.add('mobile-floating-menu');
        currentOpenMenu = menuEl;
    }

    function resetMobileDropdownMenu(menuEl) {
        if (!menuEl) return;
        menuEl.style.position = '';
        menuEl.style.top = '';
        menuEl.style.left = '';
        menuEl.style.right = '';
        menuEl.style.minWidth = '';
        menuEl.style.opacity = '';
        menuEl.style.visibility = '';
        menuEl.style.transform = '';
        menuEl.classList.remove('mobile-floating-menu');
        currentOpenMenu = null;
    }
    
    dropdowns.forEach(dropdown => {
        const dropdownLink = dropdown.querySelector('a');
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        
        if (dropdownLink && dropdownMenu) {
            // Handle click events for dropdown toggle (mobile only)
            dropdownLink.addEventListener('click', function(e) {
                const isMobile = window.matchMedia('(max-width: 992px)').matches;
                if (!isMobile) return; // allow normal navigation on desktop
                e.preventDefault();
                // Close any open dropdown first
                if (currentOpenDropdown && currentOpenDropdown !== dropdown) {
                    currentOpenDropdown.classList.remove('active');
                    resetMobileDropdownMenu(currentOpenMenu);
                }
                const willOpen = !dropdown.classList.contains('active');
                dropdown.classList.toggle('active', willOpen);
                if (willOpen) {
                    floatDropdownMenu(dropdownLink, dropdownMenu);
                    currentOpenDropdown = dropdown;
                } else {
                    resetMobileDropdownMenu(dropdownMenu);
                    currentOpenDropdown = null;
                }
            });
        }
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        // Allow clicks inside the floating menu without closing
        if (e.target.closest('.mobile-floating-menu') || e.target.closest('.dropdown')) return;
        dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
        resetMobileDropdownMenu(currentOpenMenu);
        currentOpenDropdown = null;
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
            headerToggle.classList.toggle('active', willShow);
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.header-menu') && !e.target.closest('.header-menu-toggle')) {
                headerMenu.classList.remove('show');
                headerToggle.setAttribute('aria-expanded', 'false');
                headerToggle.classList.remove('active');
            }
        });

        // Close menu if resizing to desktop
        window.addEventListener('resize', () => {
            if (window.matchMedia('(min-width: 993px)').matches) {
                headerMenu.classList.remove('show');
                headerToggle.setAttribute('aria-expanded', 'false');
                headerToggle.classList.remove('active');
            }
        });
    }

    // Close floating dropdown on resize or scroll (mobile)
    window.addEventListener('resize', () => {
        if (currentOpenDropdown) {
            resetMobileDropdownMenu(currentOpenMenu);
            currentOpenDropdown.classList.remove('active');
            currentOpenDropdown = null;
        }
    });
    window.addEventListener('scroll', () => {
        if (currentOpenDropdown) {
            resetMobileDropdownMenu(currentOpenMenu);
            currentOpenDropdown.classList.remove('active');
            currentOpenDropdown = null;
        }
    }, { passive: true });

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

// Add arrow scroll buttons for mobile nav
document.addEventListener('DOMContentLoaded', function() {
    const isMobile = window.matchMedia('(max-width: 992px)').matches;
    const container = document.querySelector('.main-nav-container');
    if (!isMobile || !container) return;
    // create arrows
    const leftBtn = document.createElement('button');
    leftBtn.className = 'nav-scroll-btn left';
    leftBtn.innerHTML = '&#8249;';
    const rightBtn = document.createElement('button');
    rightBtn.className = 'nav-scroll-btn right';
    rightBtn.innerHTML = '&#8250;';
    container.appendChild(leftBtn);
    container.appendChild(rightBtn);
    const scrollBy = () => Math.min(200, container.clientWidth * 0.6);
    leftBtn.addEventListener('click', () => container.scrollBy({ left: -scrollBy(), behavior: 'smooth' }));
    rightBtn.addEventListener('click', () => container.scrollBy({ left: scrollBy(), behavior: 'smooth' }));
});
