document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll('.nav-links a');
    const hamburger = document.querySelector('.hamburger');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            // Close mobile menu when clicking a link
            const navMenu = document.querySelector('.nav-links');
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            
            if (targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                const targetSection = document.querySelector(targetId);
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
            
            // Update active state
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        });
    });

    // Update active state on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        const navHeight = document.querySelector('.header').offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id') || '';
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}` || 
                (pageYOffset < 100 && link.getAttribute('href') === '#')) {
                link.classList.add('active');
            }
        });
    });

    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // Add image preview functionality
    document.querySelectorAll('.portfolio-img').forEach(img => {
        img.addEventListener('click', function(e) {
            e.preventDefault();
            openModal(this.src);
        });
    });

    // Add view more preview functionality
    document.querySelectorAll('.card .view-more').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.card');
            const img = card.querySelector('.portfolio-img');
            if (img) {
                openModal(img.src);
            }
        });
    });

    // Add click event for close button
    const closeBtn = document.querySelector('#imageModal .close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Close modal when clicking outside image
    document.getElementById("imageModal").addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
});

function openModal(imageSrc) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");
    if (modal && modalImg) {
        modal.style.display = "flex"; // เปลี่ยนจาก block เป็น flex
        modalImg.src = imageSrc;
        
        // เพิ่ม animation
        modalImg.style.opacity = "0";
        setTimeout(() => {
            modalImg.style.opacity = "1";
        }, 100);
    }
}

function closeModal() {
    const modal = document.getElementById("imageModal");
    if (modal) {
        modal.style.display = "none";
    }
}

// Close modal with Escape key
document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") {
        closeModal();
    }
});

// Global variables for slide management
let currentSlide = 0;
let currentProject = '';
const projectSlides = {
    'WasteWise': {
        images: [
            'img/wastewise/slide1.jpg',
            'img/wastewise/slide2.jpg',
            'img/wastewise/slide3.jpg',
            'img/wastewise/slide4.jpg',
            'img/wastewise/slide5.jpg',
            'img/wastewise/slide6.jpg',
            'img/wastewise/slide7.jpg',
            'img/wastewise/slide8.jpg',
            'img/wastewise/slide9.jpg'
        ],
        captions: [
            'Initial concept design',
            'User flow diagram',
            'Database schema',
            'Main dashboard wireframe',
            'User profile interface',
            'Transaction history view',
            'Points redemption system',
            'Mobile responsive design',
            'Final prototype overview'
        ]
    }
};

function showProjectSlides(projectName) {
    currentProject = projectName;
    currentSlide = 0;
    document.getElementById("slideModal").style.display = "flex";
    updateSlide();
}

function closeSlideModal() {
    document.getElementById("slideModal").style.display = "none";
}

function changeSlide(direction) {
    const slides = projectSlides[currentProject].images;
    currentSlide += direction;
    if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    } else if (currentSlide >= slides.length) {
        currentSlide = 0;
    }
    updateSlide();
}

function updateSlide() {
    const project = projectSlides[currentProject];
    const slideImg = document.getElementById("slideImg");
    const counter = document.getElementById("slideCounter");
    const caption = document.getElementById("slideCaption");
    
    slideImg.src = project.images[currentSlide];
    counter.innerText = `${currentSlide + 1} / ${project.images.length}`;
    caption.innerText = project.captions[currentSlide];
}

// Event Listeners
document.addEventListener("keydown", function(e) {
    if (document.getElementById("slideModal").style.display === "flex") {
        if (e.key === "ArrowLeft") {
            changeSlide(-1);
        } else if (e.key === "ArrowRight") {
            changeSlide(1);
        } else if (e.key === "Escape") {
            closeSlideModal();
        }
    }
});

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('slideModal');
    if (event.target === modal) {
        closeSlideModal();
    }
}

// เพิ่ม event listener สำหรับการใช้ swipe บนมือถือ
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (document.getElementById("slideModal").style.display === "flex") {
        const swipeThreshold = 50;
        const swipeLength = touchEndX - touchStartX;
        
        if (Math.abs(swipeLength) > swipeThreshold) {
            if (swipeLength > 0) {
                // Swipe right
                changeSlide(-1);
            } else {
                // Swipe left
                changeSlide(1);
            }
        }
    }
}

function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    
    navLinks.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Close menu when clicking outside
document.addEventListener('click', function(e) {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    
    if (navLinks.classList.contains('active') && 
        !e.target.closest('.nav-links') && 
        !e.target.closest('.hamburger')) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});