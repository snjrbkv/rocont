const form = document.querySelector("form");
const checkbox = document.querySelector(".checkbox");

checkbox.addEventListener("click", () => {
  const isChecked = checkbox.src.includes("CheckboxChecked");
  checkbox.src = isChecked
    ? "src/assets/icons/CheckboxUnchecked.png"
    : "src/assets/icons/CheckboxChecked.png";
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = form.querySelector('input[type="text"]').value;
  const phone = form.querySelector('input[type="tel"]').value;

  const isChecked = checkbox.src.includes("CheckboxChecked");
  if (!isChecked) {
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
  const chatId = "5738468941"; // замени на свой

  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    });

    if (response.ok) {
      alert("Форма отправлена!");
      form.reset();
      checkbox.src = "src/assets/icons/CheckboxUnchecked.png";
    } else {
      alert("Ошибка при отправке. Попробуйте позже.");
    }
  } catch (err) {
    console.error("Ошибка:", err);
    alert("Ошибка подключения.");
  }
});
