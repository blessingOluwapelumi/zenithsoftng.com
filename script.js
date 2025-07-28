const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navItems = document.querySelectorAll('.nav-item');
const navAnchors = document.querySelectorAll('.nav-link');

// Toggle hamburger menu
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('show');
});

// Submenu and active link logic
navAnchors.forEach(link => {
  link.addEventListener('click', (e) => {
    if (link.getAttribute('href') === '#') e.preventDefault();

    const parentItem = link.parentElement;
    const hasSub = parentItem.querySelector('.sub-menu');

    navAnchors.forEach(l => l.classList.remove('active'));
    link.classList.add('active');

    if (window.innerWidth <= 768 && hasSub) {
      e.preventDefault();
      navItems.forEach(item => {
        if (item !== parentItem) item.classList.remove('open');
      });
      parentItem.classList.toggle('open');
    }
  });
});

// Hide top bar on scroll
let lastScroll = 0;
const topBar = document.getElementById('topBar');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  topBar.style.display = currentScroll > lastScroll && currentScroll > 50 ? 'none' : 'block';
  lastScroll = currentScroll;
});



//HERO SECTION
// script.js
const slidesContainer = document.getElementById('slidesContainer');
let slides = document.querySelectorAll('.slide');
let currentSlide = 0;
let intervalTime = 8000;
let slideWidth = window.innerWidth;

// Clone first slide for seamless looping
const firstSlideClone = slides[0].cloneNode(true);
slidesContainer.appendChild(firstSlideClone);
slides = document.querySelectorAll('.slide');

// Typetext effect

function typeText(el, text, delay = 100) {
  let i = 0;
  el.classList.add('typewriter');
  el.innerHTML = '';

  function typeChar() {
    if (i < text.length) {
      el.innerHTML += text.charAt(i);
      i++;
      setTimeout(typeChar, delay);
    } else {
      // Hide the cursor after typing is complete
      el.classList.remove('typewriter');
    }
  }

  typeChar();
}



function showSlide(index) {
  slidesContainer.style.transition = 'transform 1s ease-in-out';
  slidesContainer.style.transform = `translateX(-${index * slideWidth}px)`;

  slides.forEach(slide => {
    const text = slide.querySelector('.text-content');
    if (text) text.classList.remove('show');
  });

  // 💡 If it's the first slide on initial load, show text immediately
  const currentText = slides[index].querySelector('.text-content');
  const typewriterEl = currentText.querySelector('.typewriter');
  const fullText = typewriterEl.getAttribute('data-text');

  if (index === 0 && currentSlide === 0) {
    currentText.classList.add('show');
    typeText(typewriterEl, fullText, 80);
  } else {
    // Slight delay for other slides
    setTimeout(() => {
      currentText.classList.add('show');
      typeText(typewriterEl, fullText, 80);
    }, 500); // Adjust this value to match your preferred delay
  }
}



function nextSlide() {
  const currentText = slides[currentSlide].querySelector('.text-content');

  // Start fade-out before changing slide
  if (currentText) {
    currentText.classList.remove('show');
  }

  // Wait for fade-out to complete before sliding
  setTimeout(() => {
    currentSlide++;
    showSlide(currentSlide);

    if (currentSlide === slides.length - 1) {
      setTimeout(() => {
        slidesContainer.style.transition = 'none';
        slidesContainer.style.transform = `translateX(0px)`;
        currentSlide = 0;

        slides.forEach(slide => {
          const text = slide.querySelector('.text-content');
          if (text) text.classList.remove('show');
        });

        const firstText = slides[0].querySelector('.text-content');
        const typewriterEl = firstText.querySelector('.typewriter');
        const fullText = typewriterEl.getAttribute('data-text');
        
        setTimeout(() => {
          firstText.classList.add('show');
          typeText(typewriterEl, fullText, 80);
        }, 1000); //  THIS is the delay before showing the text

      }, intervalTime);
    }
  }, 400); // Delay to allow fade-out before sliding
}

// Start
showSlide(currentSlide);
setInterval(nextSlide, intervalTime);



//info boxes
const infoBoxes = document.querySelectorAll('.info-box');

const revealOnScroll = () => {
  const triggerPoint = window.innerHeight * 0.85;

  infoBoxes.forEach(box => {
    const boxTop = box.getBoundingClientRect().top;

    if (boxTop < triggerPoint) {
      box.classList.add('visible');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);


// Slide in info boxes on scroll
const boxes = document.querySelectorAll('.info-box');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {entry.target.classList.add('slide-in');
    } else {
      entry.target.classList.remove('slide-in'); // Remove so it can replay on re-enter
    }
  });
}, {
  threshold: 0.3
});

boxes.forEach(box => observer.observe(box));


// === Animate About Section on Scroll ===
const aboutImage = document.querySelector('.about-image');
const aboutContent = document.querySelector('.about-content');

function animateAboutSection() {
  const triggerPoint = window.innerHeight * 0.95;

  if (aboutImage && !aboutImage.classList.contains('slide-in-left')) {
    if (aboutImage.getBoundingClientRect().top < triggerPoint) {
      aboutImage.classList.add('slide-in-left');
    }
  }

  if (aboutContent && !aboutContent.classList.contains('slide-in-right')) {
    if (aboutContent.getBoundingClientRect().top < triggerPoint) {
      aboutContent.classList.add('slide-in-right');
    }
  }
}

// Fire animation on scroll
window.addEventListener('scroll', animateAboutSection);

// Fire animation on DOM load
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(animateAboutSection, 100); // slight delay to ensure layout is ready
});




// Fade in .why-choose-us section when in view
function fadeInWhyChooseUs() {
  const section = document.querySelector('.why-choose-us');
  const triggerPoint = window.innerHeight / 1.2;

  if (section.getBoundingClientRect().top < triggerPoint) {
    section.classList.add('fade-in');
  } else {
    section.classList.remove('fade-in'); // Optional: allow fade-in to repeat
  }
}

// Attach event listeners
window.addEventListener('scroll', fadeInWhyChooseUs);
window.addEventListener('load', fadeInWhyChooseUs);


//WHY CHOOSE US SECTION SCROLL/SLIDE EFFECT 

// Show elements on scroll
function animateOnScroll() {
  const left = document.querySelector('.why-header');
  const items = document.querySelectorAll('.why-item');

  const trigger = window.innerHeight * 0.85;

  // Header
  if (left.getBoundingClientRect().top < trigger) {
    left.classList.add('show');
  }

  // Grid Items
  items.forEach((item) => {
    if (item.getBoundingClientRect().top < trigger) {
      item.classList.add('show');
    }
  });
}

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);




//OUR SERVICES
const carousel = document.getElementById('carousel');
let cards = carousel.querySelectorAll('.card');
let totalCards = cards.length;
let index = 0;
let allowNextMove = true;

function getVisibleCards() {
  return window.innerWidth <= 768 ? 1 : 3;
}

// Clone first few cards for seamless loop
function cloneCards() {
  const visibleCards = getVisibleCards();
  for (let i = 0; i < visibleCards; i++) {
    const clone = cards[i].cloneNode(true);
    carousel.appendChild(clone);
  }
  cards = carousel.querySelectorAll('.card');
  totalCards = cards.length - visibleCards;
}

function updateCarousel() {
  const visibleCards = getVisibleCards();
  if (!allowNextMove) return;

  // Reset when reaching end
  if (index >= totalCards) {
    allowNextMove = false;
    carousel.style.transition = 'none';
    carousel.style.transform = 'translateX(0%)';
    index = 0;

    void carousel.offsetWidth;

    setTimeout(() => {
      carousel.style.transition = 'transform 0.8s ease-in-out';
      highlightCenterCard(visibleCards);
      updateActiveDot(); // ✅ reset dot to first
      allowNextMove = true;
    }, 50);

    return;
  }

  const offset = -(index * (100 / visibleCards));
  carousel.style.transform = `translateX(${offset}%)`;
  highlightCenterCard(visibleCards);
  updateActiveDot(); // ✅ update current active dot
  index++;
}


function highlightCenterCard(visibleCards) {
  cards.forEach((card) => {
    card.classList.remove('active');
    card.style.opacity = '0.4';
    card.style.transform = 'scale(0.9)';
  });

  const centerOffset = Math.floor(visibleCards / 2);
  const centerIndex = index + centerOffset;
  if (cards[centerIndex]) {
    cards[centerIndex].classList.add('active');
    cards[centerIndex].style.opacity = '1';
    cards[centerIndex].style.transform = 'scale(1.05)';
  }
}

// Setup
cloneCards();
highlightCenterCard(getVisibleCards());
setInterval(updateCarousel, 6000);

// Optional: reinitialize on screen resize
window.addEventListener('resize', () => {
  carousel.innerHTML = ''; // Clear
  document.querySelectorAll('.card.original').forEach(card => {
    carousel.appendChild(card.cloneNode(true));
  });
  index = 0;
  allowNextMove = true;
  cards = carousel.querySelectorAll('.card');
  cloneCards();
  highlightCenterCard(getVisibleCards());
});




// still part of services (THIS IS FOR THE NAVIGATION DOTS)
const dotsContainer = document.getElementById('servicesDots');
const originalCardCount = 7; // your original card count (without clones)

// Generate dot buttons once
for (let i = 0; i < originalCardCount; i++) {
  const dot = document.createElement('button');
  dot.dataset.index = i;
  dotsContainer.appendChild(dot);
}

// Click handler for manual navigation
dotsContainer.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    index = Number(e.target.dataset.index);
    updateCarousel(); // reuses your existing function
  }
});

// Highlight active dot
function updateActiveDot() {
  const allDots = dotsContainer.querySelectorAll('button');
  allDots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}







//track record 
const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {
  const updateCount = () => {
    const target = +counter.getAttribute('data-target');
    const current = +counter.innerText;
    const increment = target / 100;

    if (current < target) {
      counter.innerText = Math.ceil(current + increment);
      setTimeout(updateCount, 30);
    } else {
      counter.innerText = target + (target === 100 ? '%' : '+');
    }
  };

  updateCount();
});

// testimonials
const testimonialSlider = document.getElementById('testimonialSlider');
const testimonialSlides = testimonialSlider.querySelectorAll('.testimonial-slide');
const testimonialDotsContainer = document.getElementById('testimonialDots');
let currentTestimonial = 0;
let testimonialInterval;
let isPaused = false;

// Create dot buttons
testimonialSlides.forEach((_, i) => {
  const dot = document.createElement('button');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => {
    showTestimonial(i);
    currentTestimonial = i;
  });
  testimonialDotsContainer.appendChild(dot);
});

const testimonialDots = testimonialDotsContainer.querySelectorAll('button');

function showTestimonial(index) {
  testimonialSlides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
    testimonialDots[i].classList.toggle('active', i === index);
  });
}

function startTestimonialRotation() {
  testimonialInterval = setInterval(() => {
    if (!isPaused) {
      currentTestimonial = (currentTestimonial + 1) % testimonialSlides.length;
      showTestimonial(currentTestimonial);
    }
  }, 5000);
}

function pauseRotation() {
  isPaused = true;
}

function resumeRotation() {
  isPaused = false;
}

testimonialSlider.addEventListener('mouseenter', pauseRotation);
testimonialSlider.addEventListener('mouseleave', resumeRotation);

// Initial display
showTestimonial(currentTestimonial);
startTestimonialRotation();



// blog
document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".blog-card");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("show");
          }, index * 200); // 200ms stagger between cards
          observer.unobserve(entry.target); // Optional: remove once shown
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  cards.forEach(card => observer.observe(card));
});



