import '../styles/style.scss';
import { products } from './js/products';
import { CardProduct } from './js/CardProduct';
import { toggleBurger, closeBurger } from '../js/burger';

window.onload = function () {
  console.log('hello world');
  document
    .querySelector('.header__burger-menu')
    .addEventListener('click', toggleBurger);

  //generateStartCards
  innerWidth > 1439 ? generateCards(8, 'coffee') : generateCards(4, 'coffee');

  window.addEventListener('resize', () => {
    innerWidth > 1439 ? generateCards(8, 'coffee') : generateCards(4, 'coffee');
  });

  window.addEventListener('resize', () => {
    if (document.documentElement.clientWidth > 768) {
      closeBurger();
    }
  });
};

document
  .querySelector('.menu__type-dishes-block')
  .addEventListener('click', (e) => changeProductsCard(e));
document
  .querySelector('.menu__refresh-button')
  .addEventListener('click', addAdditionalCards);

function generateCards(countCards, typeOfProduct) {
  let counter = 0;
  const cardsContainer = document.querySelector('.menu__cards-container');
  cardsContainer.innerHTML = '';

  const countTypeOfCards = products.filter(
    (item) => item.category === typeOfProduct,
  ).length;
  console.log(countTypeOfCards);
  const refreshButton = document.querySelector('.menu__refresh-button');
  if (countTypeOfCards > countCards) {
    refreshButton.classList.add('.menu__refresh-button_active');
  } else {
    refreshButton.classList.remove('.menu__refresh-button_active');
  }

  products.forEach((item) => {
    if (item.category === typeOfProduct && counter < countCards) {
      const card = new CardProduct(item).generateCard();
      cardsContainer.appendChild(card);
      counter += 1;
    }
  });
}

function changeProductsCard(event) {
  const button = event.target.closest('.menu__button');
  if (button) {
    const typeOfProduct = button.getAttribute('data-type-of-product');
    generateCards(4, typeOfProduct);
    const typeOfProductBtn = document.querySelectorAll('.menu__button');
    console.log('change product category');

    const countOfProduct = products.filter((item) => {
      return item.category === typeOfProduct;
    }).length;
    if (countOfProduct === 4) {
      document.querySelector('.menu__refresh-button').style.display = 'none';
    }

    if (countOfProduct === 8) {
      document.querySelector('.menu__refresh-button').style.display = 'flex';
    }

    typeOfProductBtn.forEach((item) => {
      item.classList.remove('menu__button_active');
      if (item.getAttribute('data-type-of-product') === typeOfProduct)
        item.classList.add('menu__button_active');
    });
  }
}

function addAdditionalCards() {
  if (
    document
      .querySelector('.menu__refresh-button')
      .classList.contains('.menu__refresh-button_active')
  ) {
    const typeOfProduct = document
      .querySelector('.menu__button_active')
      .getAttribute('data-type-of-product');
    generateCards(8, typeOfProduct);
    console.log('add additional cards');
    document.querySelector('.menu__refresh-button').style.display = 'none';
  }
}

document.querySelector('.popup').addEventListener('click', (e) => {
  if (!e.target.closest('.modal')) {
    document.querySelector('.popup').classList.add('modal__close');
  }
});
