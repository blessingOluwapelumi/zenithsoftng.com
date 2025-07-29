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

function handleTopBarVisibility() {
  const currentScroll = window.pageYOffset;

  if (window.innerWidth > 1024) {
    topBar.style.display = currentScroll > lastScroll && currentScroll > 50 ? 'none' : 'block';
  } else {
    topBar.style.display = ''; // Reset to default (CSS handles it)
  }

  lastScroll = currentScroll;
}

window.addEventListener('scroll', handleTopBarVisibility);
window.addEventListener('resize', handleTopBarVisibility); // Ensures it reacts on screen resize



// HERO SECTION
const seamlessSlides = document.querySelectorAll('.seamless-slide');
let currentIndex = 0;
const delayBetweenSlides = 10000;

function showSlide(index) {
  seamlessSlides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) {
      slide.classList.add('active');
    }
  });
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % seamlessSlides.length;
  showSlide(currentIndex);
}

setInterval(nextSlide, delayBetweenSlides);



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


