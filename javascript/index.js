let states = 'Alabama,Alaska,Arizona,Arkansas,California,Colorado,Connecticut,Delaware,Florida,Georgia,Hawaii,Idaho,Illinois,Indiana,Iowa,Kansas,Kentucky,Louisiana,Maine,Maryland,Massachusetts,Michigan,Minnesota,Mississippi,Missouri,Montana,Nebraska,Nevada,New Hampshire,New Jersey,New Mexico,New York,North Carolina,North Dakota,Ohio,Oklahoma,Oregon,Pennsylvania,Rhode Island,South Carolina,South Dakota,Tennessee,Texas,Utah,Vermont,Virginia,Washington,West Virginia,Wisconsin,Wyoming'
let myStates = states.split(',');
const url = 'http://localhost:3000'

const today = new Date();



const slides = document.querySelectorAll(".slide");

slides.forEach((slide, indx) => {
  slide.style.transform = `translateX(${indx * 100}%)`;
});
let currentSlide = 0;
let maxSlide = slides.length - 1;


const nextSlide = document.querySelector(".btn-next");
nextSlide.addEventListener("click", function () {
  if (currentSlide === maxSlide) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  slides.forEach((slide, indx) => {
    slide.style.transform = `translateX(${100 * (indx - currentSlide)}%)`;
  });
});

const prevSlide = document.querySelector(".btn-prev");
prevSlide.addEventListener("click", function () {
  if (currentSlide === 0) {
    currentSlide = maxSlide;
  } else {
    currentSlide--;
  }

  slides.forEach((slide, indx) => {
    slide.style.transform = `translateX(${100 * (indx - currentSlide)}%)`;
  });
});

//Hero
const heroSlides = document.querySelectorAll(".hero-slide");

heroSlides.forEach((slide, indx) => {
  slide.style.transform = `translateX(${indx * 100}%)`;
});
let currentHeroSlide = 0;
let maxHeroSlide = heroSlides.length - 1;

function heroCarousel() {
  if (currentHeroSlide === maxHeroSlide) {
    currentHeroSlide = 0;
  } else {
    currentHeroSlide++;
  }
  heroSlides.forEach((slide, indx) => {
    slide.style.transform = `translateX(${100 * (indx - currentHeroSlide)}%)`;
  });
}

setInterval(heroCarousel, 5000);