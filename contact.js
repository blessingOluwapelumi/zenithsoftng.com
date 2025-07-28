 

//  Hero slide

const heroSlider = document.getElementById('heroSlider');
const heroHeading = document.getElementById('heroHeading');
const heroSubText = document.getElementById('heroSubText');

// Array of image and text pairs
const heroData = [
  {
    image: 'assets/img/contact3.jpg',
    heading: 'Contact Us',
    subText: 'We’re always here to listen and to provide 24/7 support',
  },
  {
    image:  'assets/img/CONTACT.jpg',
    heading: 'Let’s Work Together',
    subText: 'Tell us about your project goals',
  },
  {
    image:   'assets/img/company.jpg',
    heading: 'Get In Touch Today',
    subText: 'Solutions tailored for your business',
  }
];

let currentIndex = 0;

function updateHeroSlide() {
  currentIndex = (currentIndex + 1) % heroData.length;
  const current = heroData[currentIndex];

  // Update background
  heroSlider.style.backgroundImage = `url('${current.image}')`;

  // Fade out
  heroHeading.style.opacity = 0;
  heroSubText.style.opacity = 0;

  // Fade in new text
  setTimeout(() => {
    heroHeading.textContent = current.heading;
    heroSubText.textContent = current.subText;
    heroHeading.style.opacity = 1;
    heroSubText.style.opacity = 1;
  }, 300);
}

// Start slider
setInterval(updateHeroSlide, 6000); // 6s interval


  
//   contact section reveal 

  const reveals = document.querySelectorAll('.reveal-on-scroll');

  function revealOnScroll() {
    reveals.forEach(el => {
      const windowHeight = window.innerHeight;
      const elementTop = el.getBoundingClientRect().top;
      const revealPoint = 100;

      if (elementTop < windowHeight - revealPoint) {
        el.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', revealOnScroll);
  window.addEventListener('load', revealOnScroll);










  

// contact section animation

  // Already declared: const reveals = document.querySelectorAll('.reveal-on-scroll');

function handleRevealOnScroll() {
  const triggerBottom = window.innerHeight * 0.85;

  reveals.forEach(el => {
    const boxTop = el.getBoundingClientRect().top;

    if (boxTop < triggerBottom) {
      el.classList.add('active');
    }
  });
}

// Attach once
window.addEventListener('scroll', handleRevealOnScroll);
window.addEventListener('load', handleRevealOnScroll);




  

