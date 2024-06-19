export class Modal {
  constructor(name, description, price, category, imagePath, sizes, additives) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.category = category;
    this.sizes = sizes;
    this.additives = additives;
    this.imagePath = imagePath;
  }

  generateModalWindow() {
    {
      let modal = this.createNode('div', ['modal'], null, '');

      if (this.imagePath) {
        const imageWrapper = this.createNode(
          'div',
          ['modal__image-block'],
          null,
          '',
        );
        const attributesImage = {
          src: `../images/menu-section/${this.imagePath}`,
          img: 'images',
        };
        imageWrapper.appendChild(
          this.createNode('img', ['modal__image'], attributesImage, ''),
        );
        modal.appendChild(imageWrapper);
      }

      modal.appendChild(this.createContentBlock());
      return modal;
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

  createContentBlock() {
    let modalContent = this.createNode(
      'div',
      ['modal__content-block'],
      null,
      '',
    );

    if (this.name) {
      modalContent.appendChild(
        this.createNode('h3', ['modal__content-title'], null, this.name),
      );
    }

    if (this.description) {
      modalContent.appendChild(
        this.createNode('p', ['modal__content'], null, this.description),
      );
    }

    const sizeBlock = this.createNode('div', ['modal__size-block'], null, '');
    sizeBlock.addEventListener('click', (event) =>
      this.changeSizeProduct(event),
    );
    sizeBlock.appendChild(
      this.createNode('p', ['modal__content'], null, 'Size'),
    );

    const sizeButtonBlock = this.createNode(
      'div',
      ['modal__size-button-block'],
      null,
      '',
    );
    sizeButtonBlock.appendChild(
      this.createButton(
        { 'data-size': 's' },
        ['modal__button', 'modal__button_active'],
        'S',
        `${this.sizes.s.size}`,
      ),
    );
    sizeButtonBlock.appendChild(
      this.createButton(
        { 'data-size': 'm' },
        ['modal__button'],
        'M',
        `${this.sizes.m.size}`,
      ),
    );
    sizeButtonBlock.appendChild(
      this.createButton(
        { 'data-size': 'l' },
        ['modal__button'],
        'L',
        `${this.sizes.l.size}`,
      ),
    );
    sizeBlock.appendChild(sizeButtonBlock);
    modalContent.appendChild(sizeBlock);

    const additivesBlock = this.createNode(
      'div',
      ['modal__additives-block'],
      null,
      '',
    );
    additivesBlock.appendChild(
      this.createNode('p', ['modal__content'], null, 'Additives'),
    );

    const additivesButtonBlock = this.createNode(
      'div',
      ['modal__additives-button-block'],
      null,
      '',
    );
    additivesButtonBlock.addEventListener('click', (event) =>
      this.changePriceAdditives(event),
    );

    this.additives.forEach((item, index) => {
      additivesButtonBlock.appendChild(
        this.createButton(
          { 'data-additive': `${item.name}` },
          ['modal__button'],
          `${index + 1}`,
          `${item.name}`,
        ),
      );
    });

    additivesBlock.appendChild(additivesButtonBlock);
    modalContent.appendChild(additivesBlock);

    const priceBlock = this.createNode('div', ['modal__price-block'], null, '');
    priceBlock.appendChild(
      this.createNode('div', ['modal__price-title'], null, 'Total:'),
    );
    priceBlock.appendChild(
      this.createNode(
        'div',
        ['modal__price-title', 'modal__price-total'],
        null,
        `$${this.price}`,
      ),
    );
    modalContent.appendChild(priceBlock);

    const descriptionBlock = this.createNode(
      'div',
      ['modal__description-block'],
      null,
      '',
    );

    const svgContainer = this.createNode('svg', ['modal-icon'], null, '');
    svgContainer.appendChild(
      this.createNode(
        'use',
        null,
        { 'xlink:href': '../../public/images/svg/sprite.svg#coffee' },
        null,
        '',
      ),
    );

    descriptionBlock.appendChild(svgContainer);

    descriptionBlock.appendChild(
      this.createNode(
        'p',
        ['modal__description'],
        null,
        'The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.',
      ),
    );

    modalContent.appendChild(descriptionBlock);
    const closeButton = this.createNode(
      'div',
      ['modal__close-button'],
      null,
      'Close',
    );
    closeButton.addEventListener('click', this.closeModalWindow);
    modalContent.appendChild(closeButton);

    return modalContent;
  }

  createButton(dataAttribute, classes, iconContent, buttonContent) {
    const button = this.createNode('div', classes, dataAttribute, '');
    const buttonContentBlock = this.createNode(
      'div',
      ['modal__button-content'],
      dataAttribute,
      '',
    );
    const buttonIcon = this.createNode(
      'div',
      ['modal__button-circle'],
      null,
      iconContent,
    );
    const buttonContent1 = this.createNode(
      'div',
      ['modal__content'],
      null,
      buttonContent,
    );
    buttonContentBlock.appendChild(buttonIcon);
    buttonContentBlock.appendChild(buttonContent1);
    button.appendChild(buttonContentBlock);
    return button;
  }

  closeModalWindow() {
    console.log('close window');
    document.querySelector('.popup').classList.add('modal__close');

    document.querySelector('body').classList.remove('scroll-stop');
  }

  changePriceAdditives(event) {
    if (event.target.closest('.modal__button')) {
      const element = event.target.closest('.modal__button');

      const typeOfAdditive = element.getAttribute('data-additive');
      let addPrice = 0;

      this.additives.forEach((item) => {
        if (item.name === typeOfAdditive) {
          addPrice = +item['add-price'];
        }
      });

      const totalPrice = document.querySelector('.modal__price-total');
      const currentPrice = +totalPrice.innerText.slice(1);

      let newPrice;

      if (element.classList.contains('modal__button_active')) {
        newPrice = currentPrice - addPrice;
      } else {
        newPrice = currentPrice + addPrice;
      }

      totalPrice.innerText = `$${newPrice.toFixed(2)}`;
      element.classList.toggle('modal__button_active');
    }
  }

  changeSizeProduct(event) {
    if (event.target.closest('.modal__button')) {
      const element = event.target.closest('.modal__button');

      const sizeType = element.getAttribute('data-size');
      const addPrice = +this.sizes[sizeType]['add-price'];

      const totalPrice = document.querySelector('.modal__price-total');
      const currentPrice = +totalPrice.innerText.slice(1);

      let newPrice = addPrice + currentPrice;

      const buttonSizes = document.querySelectorAll(
        '.modal__size-button-block > .modal__button',
      );
      buttonSizes.forEach((item) => {
        if (item.classList.contains('modal__button_active')) {
          item.classList.remove('modal__button_active');
          const currentSize = item.getAttribute('data-size');

          const currentAddPrice = +this.sizes[currentSize]['add-price'];

          newPrice = newPrice - currentAddPrice;
        }

        if (item.getAttribute('data-size') === sizeType) {
          item.classList.add('modal__button_active');
        }
      });

      totalPrice.innerText = `$${newPrice.toFixed(2)}`;
    }
  }
}
