function cards() {
  //  Используем классы для карточек
  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 0.5;
      // this.priceRu=price*this.transfer;
      this.changeToRUB();
    }

    changeToRUB() {
      this.priceRu = this.price * this.transfer;
    }

    render() {
      const element = document.createElement("div");
      if (this.classes.length === 0) {
        this.element = "menu__item";
        element.classList.add(this.element);
      } else {
        this.classes.forEach((className) => element.classList.add(className));
      }
      element.innerHTML = `
          <img src=${this.src} alt=${this.alt}>
          <h3 class="menu__item-subtitle">${this.title}</h3>
          <div class="menu__item-descr">${this.descr}</div>
          <div class="menu__item-divider"></div>
          <div class="menu__item-price">
              <div class="menu__item-cost">Цена:</div>
              <div class="menu__item-total"><span>${this.priceRu}</span> руб/день</div>
          </div>
      `;
      this.parent.append(element);
    }
  }
  const descrAzaMenu =
    "Во многих фруктах можно найти практически всю таблицу Менделеева и все необходимые организму человека витамины. Во фруктах содержатся: бета-каротин, холин, витамины А, группы В (В1, В2, В5, В6, В9, В12), С, Е, К, Н и РР, а также калий, кальций, магний, цинк, селен, медь и марганец, железо, хлор и сера, йод, хром, фтор, молибден, бор и ванадий, олово и титан, кремний, кобальт, никель и алюминий, фосфор и натрий. По содержанию клетчатки фрукты не уступают злакам и овощам, а иногда и опережают их. Фрукты играют немаловажную роль в нормальном пищеварении и метаболизме, незаменимы в диетическом питании.";

  const getResource = async (url) => {
    let res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url},status:${res.status}`);
    }
    return await res.json();
  };

  getResource("http://localhost:3000/menu").then((data) => createCard(data));

  function createCard(data) {
    data.forEach(({ img, altimg, title, descr, price }) => {
      const element = document.createElement("div");
      element.classList.add("menu__item");

      element.innerHTML = `
        <img src=${img} alt=${altimg}>
        <h3 class="menu__item-subtitle">${title}</h3>
        <div class="menu__item-descr">${descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${price}</span> руб/день</div>
        </div>
      `;

      document.querySelector(".menu .container").append(element);
    });
  }
}

module.exports = cards;
