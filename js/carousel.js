export function clickArrowLeft() {
  console.log('arrow left');
  const sliderContainer = document.querySelector('.slider-container');

  sliderContainer.style.left = getComputedStyle(sliderContainer).left;
  sliderContainer.classList.add('slider-container-animation-reverse');
  sliderContainer.classList.remove('slider-container-animation');
}

export function clickArrowRight() {
  console.log('arrow right');
  const sliderContainer = document.querySelector('.slider-container');

  sliderContainer.style.left = getComputedStyle(sliderContainer).left;
  sliderContainer.classList.remove('slider-container-animation-reverse');
  sliderContainer.classList.add('slider-container-animation');
}

export function pauseCarouselAnimation() {
  document
    .querySelector('.slider-container')
    .classList.add('slider-container_stop-animation');
}

export function continueCarouselAnimation() {
  document
    .querySelector('.slider-container')
    .classList.remove('slider-container_stop-animation');
}
