function slider() {
  // slider
  const slides = document.querySelectorAll(".offer__slide"),
    slider = document.querySelector(".offer__slider"),
    prev = document.querySelector(".offer__slider-prev"),
    next = document.querySelector(".offer__slider-next"),
    total = document.querySelector("#total"),
    current = document.querySelector("#current"),
    slidesWrapper = document.querySelector(".offer__slider-wrapper"),
    slidesField = document.querySelector(".offer__slider-inner"),
    width = window.getComputedStyle(slidesWrapper).width;

  let slideIndex = 1;
  let slidesLength = slides.length;
  let offset = 0;
  let myWidth = modifyToDigits(width);
  console.log(`myW=${myWidth}`);
  console.log(`width=${width}`);

  if (slidesLength < 10) {
    total.textContent = `0${slidesLength}`;
  } else {
    total.textContent = slidesLength;
  }
  showIndex();

  slidesField.style.width = 100 * slidesLength + "%";
  slidesField.style.display = "flex";
  slidesField.style.transition = "0.5s all";

  slidesWrapper.style.overflow = "hidden";

  slides.forEach((slide) => {
    slide.style.width = myWidth + "px";
  });

  slider.style.position = "relative";
  const indicators = document.createElement("ol"),
    dots = [];
  indicators.classList.add("carousel-indicators");
  indicators.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
  `;
  slider.append(indicators);
  for (let i = 0; i < slidesLength; i++) {
    const dot = document.createElement("li");
    dot.setAttribute("data-slide-to", i + 1);
    dot.style.cssText = `
      box-sizing: content-box;
      flex: 0 1 auto;
      width: 30px;
      height: 6px;
      margin-right: 3px;
      margin-left: 3px;
      cursor: pointer;
      background-color: #fff;
      background-clip: padding-box;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      opacity: .5;
      transition: opacity .6s ease;    
    `;
    indicators.append(dot);
    dots.push(dot);
  }

  dots[slideIndex - 1].style.opacity = "1";

  next.addEventListener("click", () => {
    if (slideIndex == slidesLength) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }
    // if (offset == myWidth * (slidesLength - 1)) {
    if (slideIndex == 1) {
      offset = 0;
    } else {
      offset = myWidth * (slideIndex - 1);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    showIndex();
    showDots();
  });

  prev.addEventListener("click", () => {
    if (offset == 0) {
      offset = myWidth * (slidesLength - 1);
    } else {
      offset -= myWidth;
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
      slideIndex = slidesLength;
    } else {
      slideIndex--;
    }

    showIndex();
    showDots();
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const slideTo = e.target.getAttribute("data-slide-to");
      slideIndex = slideTo;
      offset = myWidth * (slideIndex - 1);
      slidesField.style.transform = `translateX(-${offset}px)`;
      showIndex();
      showDots();
    });
  });

  function showIndex() {
    if (slideIndex < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
  }

  function showDots() {
    dots.forEach((dot) => (dot.style.opacity = ".5"));
    dots[slideIndex - 1].style.opacity = "1";
  }

  function deleteNotDigits(str) {
    return (+str.replace(/D/g, "") / 100).toFixed();
  }

  function modifyToDigits(str) {
    return (+width.slice(0, width.length - 2)).toFixed();
  }
}

module.exports = slider;
