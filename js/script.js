"use strict";

window.addEventListener("DOMContentLoaded", () => {
  //  tabs
  let tabs = document.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll(".tabcontent"),
    tabsParent = document.querySelector(".tabheader__items");

  function hideTabContent() {
    tabsContent.forEach((item) => {
      //   item.style.display = "none";
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });

    tabs.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }

  function showTabContent(i = 0) {
    // tabsContent[i].style.display = "block";
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add("tabheader__item_active");
  }

  tabsParent.addEventListener("click", (event) => {
    const target = event.target;
    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((item, i) => {
        if (item == target) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
  hideTabContent();
  showTabContent();
  //  timer
  const deadline = "2022-12-31";
  function getTimeRemaining(endtime) {
    const total = Date.parse(endtime) - Date.parse(new Date()),
      days = Math.floor(total / (24 * 60 * 60 * 1000)),
      hours = Math.floor((total / (60 * 60 * 1000)) % 24),
      minutes = Math.floor((total / (60 * 1000)) % 60),
      seconds = Math.floor((total / 1000) % 60);
    // return {
    //   'total': total,
    //   'days': days,
    //   'hours': hours,
    //   'minutes': minutes,
    //   'seconds': seconds
    // }
    return {
      total,
      days,
      hours,
      minutes,
      seconds,
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }
  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateclock, 1000);

    updateclock();

    function updateclock() {
      const t = getTimeRemaining(endtime);
      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);
      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }
  setClock(".timer", deadline);
  //  модальное окно
  const modalTrigger = document.querySelectorAll("[data-modal]"),
    // const modalTrigger = document.querySelector("[data-modal]"),
    modal = document.querySelector(".modal");
  // modalCloseBtn = document.querySelector("[data-close]");

  function openModal() {
    modal.classList.add("show");
    modal.classList.remove("hide");
    // modal.classList.toggle("show");
    document.body.style.overflow = "hidden";
    clearInterval(modalTimerId);
  }

  modalTrigger.forEach((item) => {
    item.addEventListener("click", openModal);
  });

  function closeModal() {
    modal.classList.add("hide");
    modal.classList.remove("show");
    // modal.classList.toggle("show");
    document.body.style.overflow = "";
  }

  // modalCloseBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.getAttribute("data-close") === "") {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });

  //  открытие модалки по таймеру
  const modalTimerId = setTimeout(openModal, 50000);

  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 1
    ) {
      openModal();
      window.removeEventListener("scroll", showModalByScroll);
    }
  }

  window.addEventListener("scroll", showModalByScroll);
  // { once: true }

  //  Урок48: Используем классы для карточек
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

  // getResource("http://localhost:3000/menu").then((data) => {
  //   data.forEach(({ img, altimg, title, descr, price }) => {
  //     new MenuCard(
  //       img,
  //       altimg,
  //       title,
  //       descr,
  //       price,
  //       ".menu .container"
  //     ).render();
  //   });
  // });

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
  //Forms
  const forms = document.querySelectorAll("form");

  const message = {
    // loading: "Загрузка...",
    loading: "img/form/spinner.svg",
    success: "Благодарю! До связи!",
    failure: "Что-то пошло не так...",
  };

  forms.forEach((item) => {
    bindPostData(item);
  });

  const postData = async (url, data) => {
    let res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: data,
    });

    return await res.json();
  };

  function bindPostData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // const statusMessage = document.createElement("div");
      const statusMessage = document.createElement("img");
      // statusMessage.classList.add("status");
      statusMessage.src = message.loading;
      // statusMessage.textContent = message.loading;
      statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
      `;

      // form.append(statusMessage);
      form.insertAdjacentElement("afterend", statusMessage);

      const request = new XMLHttpRequest();
      request.open("POST", "server.php");
      // //  заголовок указывать не нужно, если используется XMLHttpRequest+form-data
      // // request.setRequestHeader("Content-type", "multipart/form-data");
      // const formData = new FormData(form);

      // request.send(formData);

      // request.addEventListener("load", () => {
      //   if (request.status === 200) {
      //     console.log(request.response);
      //     statusMessage.textContent = message.success;
      //     form.reset();
      //     setTimeout(() => {
      //       statusMessage.remove();
      //     }, 1000);
      //   } else {
      //     statusMessage.textContent = message.failure;
      //   }
      // });
      //  Json - формат отправки данных
      request.setRequestHeader("Content-type", "application/json");
      const formData = new FormData(form);

      // const obj = {};
      // formData.forEach(function (value, key) {
      //   obj[key] = value;
      // });

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      // fetch("server.php", {
      //   method: "POST",
      //   headers: {
      //     "Content-type": "application/json",
      //   },
      //   body: JSON.stringify(obj),
      // })
      // postData("http://localhost:3000/requests", JSON.stringify(obj))
      postData("http://localhost:3000/requests", json)
        // .then((data) => data.text())
        .then((data) => {
          console.log(data);
          showThanksModal(message.success);
          statusMessage.remove();
        })
        .catch(() => {
          showThanksModal(message.failure);
        })
        .finally(() => {
          form.reset();
        });
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");
    prevModalDialog.classList.add("hide");
    openModal();

    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
      <div class="modal__content">
        <div class="modal__close" data-close>×</div>
        <div class="modal__title">${message}</div>
      </div>
    `;

    document.querySelector(".modal").append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      closeModal();
    }, 4000);
  }

  // fetch("db.json")
  fetch("http://localhost:3000/menu")
    .then((data) => data.json())
    .then((res) => console.log(res));
});
