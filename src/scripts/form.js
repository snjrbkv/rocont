import checkedIcon from "../assets/icons/CheckboxChecked.png";
import uncheckedIcon from "../assets/icons/CheckboxUnchecked.png";

const form = document.querySelector("form");
const checkbox = document.querySelector(".checkbox");

let isAgreed = false;

checkbox.addEventListener("click", () => {
  isAgreed = !isAgreed;
  checkbox.src = isAgreed ? checkedIcon : uncheckedIcon;
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = form.querySelector('input[type="text"]').value.trim();
  const phone = form.querySelector('input[type="tel"]').value.trim();

  if (!isAgreed) {
    alert("Пожалуйста, подтвердите согласие.");
    return;
  }

  const message = `
📝 Новая заявка:
👤 Имя: ${name}
📞 Телефон: ${phone}
✅ Согласие: Да
  `;

  const token = "7698614424:AAHEPTICz82tjssXZHW34r_YW4G5syU25lE";
  const chatId = "5738468941";
  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    });

    if (response.ok) {
      alert("Форма отправлена!");
      form.reset();
      isAgreed = false;
      checkbox.src = uncheckedIcon;
    } else {
      alert("Ошибка при отправке. Попробуйте позже.");
    }
  } catch (error) {
    console.error("Ошибка:", error);
    alert("Ошибка подключения.");
  }
});
