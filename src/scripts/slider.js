document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".carusel__in__slider-cards");
  const arrows = document.querySelectorAll(
    ".carusel__in__slider-pagination img"
  );
  const cardWidth = 300 + 8; // 300px card + 8px gap
  const updateArrows = () => {
    const maxScrollLeft = Math.ceil(
      slider.scrollWidth - slider.clientWidth - 1
    );

    if (slider.scrollLeft <= 0) {
      arrows[0].classList.add("disabled");
    } else {
      arrows[0].classList.remove("disabled");
    }

    if (slider.scrollLeft >= maxScrollLeft) {
      arrows[1].classList.add("disabled");
    } else {
      arrows[1].classList.remove("disabled");
    }
  };

  updateArrows(); // при загрузке

  arrows[0].addEventListener("click", () => {
    slider.scrollBy({ left: -cardWidth, behavior: "smooth" });
    setTimeout(updateArrows, 300); // проверим после прокрутки
  });

  arrows[1].addEventListener("click", () => {
    slider.scrollBy({ left: cardWidth, behavior: "smooth" });
    setTimeout(updateArrows, 300);
  });

  slider.addEventListener("scroll", updateArrows);

  // Добавим свайп для мобильных
  let isDown = false;
  let startX, scrollLeft;

  slider.addEventListener("mousedown", (e) => {
    isDown = true;
    slider.classList.add("grabbing");
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener("mouseleave", () => {
    isDown = false;
    slider.classList.remove("grabbing");
  });

  slider.addEventListener("mouseup", () => {
    isDown = false;
    slider.classList.remove("grabbing");
  });

  slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 1.5; // скорость
    slider.scrollLeft = scrollLeft - walk;
  });

  // touch events
  let touchStartX = 0;
  slider.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener("touchmove", (e) => {
    const touchX = e.touches[0].clientX;
    const walk = (touchStartX - touchX) * 1.5;
    slider.scrollLeft = scrollLeft + walk;
  });
});
