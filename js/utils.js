import { appState } from "./appState.js";

export function updateKeyboardLabels() {
  const keys = document.querySelectorAll(".key");
  keys.forEach((key) => {
    if (key.dataset.ru && key.dataset.en) {
      key.textContent = key.dataset[appState.currentLang];
    }
  });
}
