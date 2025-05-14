import { currentLang, handleVirtualKeySpecial } from "./inputHandlers.js";

export function createKeyboard(container, layout, input) {
  layout.forEach((row) => {
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("row");
    row.forEach((keyObj) => {
      const btn = document.createElement("button");
      btn.classList.add("key");
      btn.setAttribute("data-code", keyObj.code);
      if (keyObj.ru && keyObj.en) {
        btn.setAttribute("data-ru", keyObj.ru);
        btn.setAttribute("data-en", keyObj.en);
        btn.textContent = currentLang === "ru" ? keyObj.ru : keyObj.en;
      } else {
        btn.textContent = keyObj.label || "";
      }
      btn.addEventListener("click", () => {
        btn.classList.add("active");
        setTimeout(() => btn.classList.remove("active"), 100);
        if (keyObj.label) {
          handleVirtualKeySpecial(keyObj.code, input);
        } else if (keyObj.ru && keyObj.en) {
          addToInput(currentLang === "ru" ? keyObj.ru : keyObj.en, input);
        }
      });
      rowDiv.appendChild(btn);
    });
    container.appendChild(rowDiv);
  });
}

function addToInput(char, input) {
  input.focus();
  const start = input.selectionStart;
  const end = input.selectionEnd;
  input.value = input.value.slice(0, start) + char + input.value.slice(end);
  input.selectionStart = input.selectionEnd = start + char.length;
  input.dispatchEvent(new Event("input"));
}
