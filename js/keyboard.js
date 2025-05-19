import { ElementCreator } from "./elementCreator.js";
import { handleVirtualKeySpecial, addToInput } from "./inputHandlers.js";
import { appState } from "./appState.js";
// import { currentLang } from "./inputHandlers.js";

export function createKeyboard(container, layout, input) {
  layout.forEach((row) => {
    const rowDiv = new ElementCreator("div").addClass("row").appendTo(container).getElement();

    row.forEach((keyObj) => {
      const btn = new ElementCreator("button").addClass("key").setAttribute("data-code", keyObj.code).appendTo(rowDiv);

      if (keyObj.ru && keyObj.en) {
        btn
          .setAttribute("data-ru", keyObj.ru)
          .setAttribute("data-en", keyObj.en)
          .setText(appState.currentLang === "ru" ? keyObj.ru : keyObj.en);
      } else {
        btn.setText(keyObj.label || "");
      }

      btn.addEventListener("click", () => handleKeyClick(keyObj, input));
    });
  });
}

function handleKeyClick(keyObj, input) {
  if (keyObj.label) {
    handleVirtualKeySpecial(keyObj.code, input);
  } else if (keyObj.ru && keyObj.en) {
    addToInput(appState.currentLang === "ru" ? keyObj.ru : keyObj.en, input);
  }
}
