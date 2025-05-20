import { languageService } from "./languageService.js";
import { appState } from "./appState.js";

export function updateKeyboardLabels() {
  document.querySelectorAll(".key").forEach((key) => {
    const keyCode = key.id;
    key.textContent = languageService.getLabel(keyCode, appState.currentLang);
  });
}
