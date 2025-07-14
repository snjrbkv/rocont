const burger = document.querySelector(".navigation__burger");
const menu = document.querySelector(".mobile_navigation__list");
const links = document.querySelectorAll(".navigation__list__item__link");
const mobChangeText = document.querySelector(".mob-change-text");
const leftBoxTitle = document.querySelector(".hero__in__left-box__title");
burger.addEventListener("click", () => {
  menu.classList.toggle("active");
  burger.classList.toggle("active");
});

links.forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("active");
    burger.classList.remove("active");
  });
});
function updateText() {
  if (window.innerWidth < 980) {
    mobChangeText.innerHTML = `
      Мы сделали это средство не ради прибыли,
      а из любви к красивым словам. Один стик
      в день — и вы чувствуете, что делаете что-то важное. Что именно — решать вам.
      
    `;
  }
  if (window.innerWidth < 480) {
    leftBoxTitle.innerHTML = `Просто потомучто можем с Collagen`;
  } else {
    mobChangeText.innerHTML = `
      Мы запустили основной цикл в 06:42.
      Результаты наблюдаются, но не зафиксированы.
      Рекомендуем сохранять спокойствие до следующего сигнала.
    `;
    leftBoxTitle.innerHTML = `Просто потомучто можем`;
  }
}
window.addEventListener("resize", updateText);
window.addEventListener("DOMContentLoaded", updateText);
