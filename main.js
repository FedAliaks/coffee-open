import './styles/style.scss';
import { toggleBurger, closeBurger } from './js/burger';
import {
  clickArrowLeft,
  clickArrowRight,
  continueCarouselAnimation,
  pauseCarouselAnimation,
} from './js/carousel';

window.onload = () => {
  document
    .querySelector('.header__burger-menu')
    .addEventListener('click', toggleBurger);
  document
    .querySelector('.burger-menu__container')
    .addEventListener('click', (e) => checkLinkClick(e));

  document
    .querySelector('.arrow-left')
    .addEventListener('click', clickArrowLeft);
  document
    .querySelector('.arrow-right')
    .addEventListener('click', clickArrowRight);

  let swipe;
  document
    .querySelector('.slider-container')
    .addEventListener('touchstart', (e) => {
      swipe = e.changedTouches[0].clientX;
    });
  document.querySelector('.slider').addEventListener('touchend', (e) => {
    const endPoint = e.changedTouches[0].clientX;
    if (endPoint - swipe > 20) clickArrowRight();
    if (swipe - endPoint > 20) clickArrowLeft();
  });

  document
    .querySelector('.slider-container')
    .addEventListener('mouseover', pauseCarouselAnimation);
  document
    .querySelector('.slider-container')
    .addEventListener('mouseout', continueCarouselAnimation);
  document
    .querySelector('.slider-container')
    .addEventListener('touchstart', pauseCarouselAnimation);
  document
    .querySelector('.slider-container')
    .addEventListener('touchend', continueCarouselAnimation);

  window.addEventListener('resize', () => {
    if (document.documentElement.clientWidth > 768) {
      closeBurger();
    }
  });

  startAnimationFavoriteBlock();
};

function startAnimationFavoriteBlock() {
  const sliderContainer = document.querySelector('.slider-container');

  const leftPosition = getComputedStyle(sliderContainer).left;

  const leftPositionNumber = +leftPosition.slice(0, -2);

  const startPosition = leftPositionNumber;
  const widthCards = +getComputedStyle(
    document.querySelector('.card'),
  ).width.slice(0, -2);

  if (widthCards === 480) {
    sliderContainer.style.setProperty('--secondPosition', '-480px');
    sliderContainer.style.setProperty('--thirdPosition', '-960px');
  } else {
    sliderContainer.style.setProperty('--secondPosition', '-348px');
    sliderContainer.style.setProperty('--thirdPosition', '-696px');
  }

  sliderContainer.classList.add('slider-container-animation');

  sliderContainer.addEventListener('animationend', () => {});
}

function checkLinkClick(event) {
  if (event.target.closest('.burger__menu-item')) {
    toggleBurger();
  }
}

observer();

function observer() {
  const sliderContainer = document.querySelector('.slider-container');
  setInterval(() => {
    const position = getComputedStyle(sliderContainer).left;

    if (position === '0px') {
      document.querySelector('.inner1').style.width = '100%';
      document.querySelector('.inner2').style.width = '0%';
      document.querySelector('.inner3').style.width = '0%';
    } else if (position === '-480px') {
      document.querySelector('.inner1').style.width = '0%';
      document.querySelector('.inner2').style.width = '100%';
      document.querySelector('.inner3').style.width = '0%';
    } else if (position === '-960px') {
      document.querySelector('.inner1').style.width = '0%';
      document.querySelector('.inner2').style.width = '0%';
      document.querySelector('.inner3').style.width = '100%';
    } else {
      document.querySelector('.inner1').style.width = '0%';
      document.querySelector('.inner2').style.width = '0%';
      document.querySelector('.inner3').style.width = '0%';
    }
  }, 100);
}
