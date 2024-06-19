export function toggleBurger() {
  console.log('openBurger');
  document
    .querySelector('.header__burger-menu')
    .classList.toggle('header__burger-menu_open');
  document.querySelector('.burger').classList.toggle('burger_close');
  document
    .querySelector('.burger-menu__container')
    .classList.toggle('burger-menu_open');
  document.querySelector('body').classList.toggle('scroll-stop');
}

export function closeBurger() {
  console.log('closeBurger');
  document
    .querySelector('.header__burger-menu')
    .classList.remove('header__burger-menu_open');
  document.querySelector('.burger').classList.add('burger_close');
  document
    .querySelector('.burger-menu__container')
    .classList.remove('burger-menu_open');
  document.querySelector('body').classList.remove('scroll-stop');
}
