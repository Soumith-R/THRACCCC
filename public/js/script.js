document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNavUl = document.querySelector('.main-nav ul');

    if (menuToggle && mainNavUl) {
        menuToggle.addEventListener('click', () => {
            mainNavUl.classList.toggle('active');
        });
    }

    // Dropdown Menu Functionality
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const dropdownLink = dropdown.querySelector('a');
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        
        if (dropdownLink && dropdownMenu) {
            // Handle click events for dropdown toggle
            dropdownLink.addEventListener('click', function(e) {
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
