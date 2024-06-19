import { Modal } from './Modal';

export class CardProduct {
  constructor({
    name,
    description,
    price,
    category,
    imagePath,
    sizes,
    additives,
  }) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.category = category;
    this.sizes = sizes;
    this.additives = additives;
    this.imagePath = imagePath;
  }

  generateCard() {
    {
      let card = this.createNode('div', ['menu__card'], null, '');
      card.addEventListener('click', this.openModal.bind(this));

      if (this.imagePath) {
        const imageWrapper = this.createNode(
          'div',
          ['menu__card-image-block'],
          null,
          '',
        );
        const attributesImage = {
          src: `../images/menu-section/${this.imagePath}`,
          img: 'images',
        };
        imageWrapper.appendChild(
          this.createNode('img', ['menu__card-image'], attributesImage, ''),
        );
        card.appendChild(imageWrapper);
      }

      const contentBlock = this.createNode('div', ['menu_card-content']);

      if (this.name) {
        contentBlock.appendChild(
          this.createNode('h3', ['menu__card-title'], null, this.name),
        );
      }

      if (this.description) {
        contentBlock.appendChild(
          this.createNode(
            'p',
            ['menu__card-description'],
            null,
            this.description,
          ),
        );
      }

      if (this.price) {
        contentBlock.appendChild(
          this.createNode('p', ['menu__card-price'], null, `$${this.price}`),
        );
      }

      card.appendChild(contentBlock);

      return card;
    }
  }

  createNode(tag, classes, attributes, content) {
    const element = document.createElement(tag);
    if (classes) element.className = `${classes.join(' ')}`;
    if (content) element.innerText = content;
    if (attributes) {
      for (let key in attributes) {
        element.setAttribute(key, attributes[key]);
      }
    }

    return element;
  }

  openModal() {
    console.log(this.additives);

    const popUp = document.querySelector('.popup');
    popUp.classList.remove('modal__close');
    popUp.innerHTML = '';

    const modalWindow = new Modal(
      this.name,
      this.description,
      this.price,
      this.category,
      this.imagePath,
      this.sizes,
      this.additives,
    ).generateModalWindow();

    popUp.appendChild(modalWindow);

    document.querySelector('body').classList.add('scroll-stop');
  }
}
