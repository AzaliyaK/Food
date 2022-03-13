function forms() {
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
}

module.exports = forms;
