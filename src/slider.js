const slides = document.querySelector('.slides');
const containerDots = document.querySelector('.container-dots');

var slideIndex = 1;

// Images container
const images = [
  { src: 'https://rb.gy/ohx0bd' },
  { src: 'https://rb.gy/gggxy8' },
  { src: 'https://rb.gy/z2a0fy' },
  { src: 'https://rb.gy/nsefjh' },
  { src: 'https://rb.gy/dssu2a' },
];

// Adding images and dots to the Respective Container
images.map((img) => {
  // Creating Image Element and adding src of that image
  var imgTag = document.createElement('img');
  imgTag.src = img.src;

  // Creating Dot (div) Element adding 'dot' class to it
  var dot = document.createElement('div');
  dot.classList.add('dot');

  //  Appending the image and dots to respective container
  slides.appendChild(imgTag);
  containerDots.appendChild(dot);
});

// Adding EventListener to All dots so that when user click on it trigger move dots;
const dots = containerDots.querySelectorAll('*').forEach((dot, index) => {
  dot.addEventListener('click', () => {
    moveDot(index + 1);
  });
});

// It helps to move the dot, it take "index" as parameter and update the slideIndex
function moveDot(index) {
  slideIndex = index;
  updateImageAndDot();
}

// Update Image And Slide Dot according to the [data-active]
function updateImageAndDot() {
  /* ...........Updating Image.............. */
  const activeSlide = slides.querySelector('[data-active]');
  slides.children[slideIndex - 1].dataset.active = true;
  activeSlide && delete activeSlide.dataset.active;

  /* ...........Updating Dots.............. */
  const activeDot = containerDots.querySelector('[data-active]');
  containerDots.children[slideIndex - 1].dataset.active = true;
  activeDot && delete activeDot.dataset.active;
}

// Slide Next Button Click Event
const nextSlide = () => {
  // it will update the slideIndex on the basis of the images.length as it gets greater than images.length, this will initialize to the 1
  if (slideIndex !== images.length) {
    ++slideIndex;
  } else if (slideIndex === images.length) {
    slideIndex = 1;
  }
  updateImageAndDot();
};

const nextBtn = document.querySelector('.next');
nextBtn.onclick = nextSlide;

// Slide Previous Button Click Event
const prevSlide = () => {
  // It will check if the slideIndex is less equal to 1 then change it to the images.legnth, it will enable infinite scrolling
  if (slideIndex !== 1) {
    --slideIndex;
  } else if (slideIndex === 1) {
    slideIndex = images.length;
  }
  updateImageAndDot();
};

const prevBtn = document.querySelector('.prev');
prevBtn.onclick = prevSlide;

// Show the Image as the Page Loads;
updateImageAndDot();

window.onload = function () {
  var loadTime =
    window.performance.timing.domContentLoadedEventEnd -
    window.performance.timing.navigationStart;
  console.log('Page load time is ' + loadTime);
};
