import { ElementCreator } from "./elementCreator.js";
import { handleVirtualKeySpecial, addToInput } from "./inputHandlers.js";
import { appState } from "./appState.js";
import { languageService } from "./languageService.js";
import { keyboardLayout, keyboardRows } from "./constants.js";

export function createKeyboard(container, input) {
  keyboardRows.forEach((rowKeys) => {
    const rowDiv = new ElementCreator("div").addClass("row").appendTo(container).getElement();

    rowKeys.forEach((keyCode) => {
      const keyData = keyboardLayout[keyCode];
      if (!keyData) return;

      const btn = new ElementCreator("button")
        .addClass("key")
        .setAttribute("data-code", keyCode)
        .setText(
          appState.capsLockOn && keyData.type === "letter"
            ? languageService.getLabel(keyCode, appState.currentLang).toUpperCase()
            : languageService.getLabel(keyCode, appState.currentLang)
        )
        .appendTo(rowDiv);
      btn.getElement().addEventListener("click", () => {
        handleKeyClick(keyData, input);
      });
    });
  });
}

function handleKeyClick(keyData, input) {
  if (keyData.labels?.label) {
    handleVirtualKeySpecial(keyData.code, input);
  } else {
    const char = languageService.getLabel(keyData.code, appState.currentLang);
    addToInput(char, input);
  }
}
