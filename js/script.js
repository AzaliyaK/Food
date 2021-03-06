"use strict";
import tabs from "./modules/tabs";
import modal from "./modules/modal";
import timer from "./modules/timer";
import cards from "./modules/cards";
import forms from "./modules/forms";
import slider from "./modules/slider";
import calc from "./modules/calc";
import { openModal } from "./modules/modal";

window.addEventListener("DOMContentLoaded", () => {
  //  открытие модалки по таймеру
  const modalTimerId = setTimeout(
    () => openModal(".modal", modalTimerId),
    50000
  );
  const deadline = "2022-12-31";

  tabs(
    ".tabheader__item",
    ".tabcontent",
    ".tabheader__items",
    "tabheader__item_active"
  );
  modal("[data-modal]", ".modal", modalTimerId);
  timer(".timer", deadline);
  cards();
  calc();
  forms("form", modalTimerId);
  slider({
    container: ".offer__slider",
    slide: ".offer__slide",
    nextArrow: ".offer__slider-next",
    prevArrow: ".offer__slider-prev",
    totalCounter: "#total",
    currentCounter: "#current",
    wrapper: ".offer__slider-wrapper",
    field: ".offer__slider-inner",
  });
});
