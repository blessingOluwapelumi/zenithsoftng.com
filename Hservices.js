const carousel = document.getElementById('carousel');
const originalCards = Array.from(carousel.children); // Save original cards
let cards = [...originalCards];
let index = 0;
let allowNextMove = true;

function getVisibleCards() {
  return window.innerWidth <= 768 ? 1 : 3;
}

// Clone first few cards for seamless loop
function cloneCards() {
  const visibleCards = getVisibleCards();
  cards = [...originalCards]; // Reset to original
  carousel.innerHTML = ''; // Clear carousel

  cards.forEach(card => {
    carousel.appendChild(card.cloneNode(true));
  });

  for (let i = 0; i < visibleCards; i++) {
    const clone = originalCards[i].cloneNode(true);
    carousel.appendChild(clone);
  }

  cards = carousel.querySelectorAll('.card');
}

function updateCarousel() {
  const visibleCards = getVisibleCards();
  if (!allowNextMove) return;

  if (index >= cards.length - visibleCards) {
    allowNextMove = false;
    carousel.style.transition = 'none';
    carousel.style.transform = 'translateX(0%)';
    index = 0;

    void carousel.offsetWidth;

    setTimeout(() => {
      carousel.style.transition = 'transform 0.8s ease-in-out';
      highlightCenterCard(visibleCards);
      updateActiveDot();
      allowNextMove = true;
    }, 50);
    return;
  }

  const offset = -(index * (100 / visibleCards));
  carousel.style.transform = `translateX(${offset}%)`;
  highlightCenterCard(visibleCards);
  updateActiveDot();
  index++;
}

function highlightCenterCard(visibleCards) {
  cards.forEach(card => {
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

function updateActiveDot() {
  const allDots = document.querySelectorAll('#servicesDots button');
  allDots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

function generateDots() {
  const dotsContainer = document.getElementById('servicesDots');
  dotsContainer.innerHTML = '';
  for (let i = 0; i < originalCards.length; i++) {
    const dot = document.createElement('button');
    dot.dataset.index = i;
    dotsContainer.appendChild(dot);
  }

  dotsContainer.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      index = Number(e.target.dataset.index);
      updateCarousel();
    }
  });
}

// Initial setup
generateDots();
cloneCards();
highlightCenterCard(getVisibleCards());
updateActiveDot();
setInterval(updateCarousel, 6000);

// On screen resize
window.addEventListener('resize', () => {
  index = 0;
  allowNextMove = true;
  cloneCards();
  highlightCenterCard(getVisibleCards());
});

// Animate on scroll
// Intersection Observer for scroll-in effect
const serviceElements = document.querySelectorAll('.services-section, .carousel-wrapper');
const serviceObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-slide-up');
    }
  });
}, { threshold: 0.3 });

serviceElements.forEach(el => serviceObserver.observe(el));
