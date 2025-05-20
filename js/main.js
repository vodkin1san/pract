import { createKeyboard } from "./keyboard.js";
import { initializeInput, handleGlobalKeyDown, handleGlobalKeyUp } from "./inputHandlers.js";
import { keyboardLayout, CAPSLOCK } from "./constants.js";
import { updateKeyboardLabels } from "./utils.js";
import { LayoutManager } from "./layoutManager.js";
import { ElementCreator } from "./elementCreator.js";
import { appState } from "./appState.js";

document.addEventListener("DOMContentLoaded", () => {
  const layoutManager = new LayoutManager();
  layoutManager.createContainer("container");

  const input = initializeInput(layoutManager.getContainer());

  const keyboardContainer = new ElementCreator("div").addClass("keyboard").appendTo(layoutManager.getContainer()).getElement();

  createKeyboard(keyboardContainer, input);
  updateKeyboardLabels();

  appState.subscribe((event, data) => {
    switch (event) {
      case "currentLangChanged":
        updateKeyboardLabels();
        document.documentElement.lang = data;
        break;

      case "capsLockChanged":
        const capsKey = document.getElementById(CAPSLOCK);
        if (capsKey) {
          capsKey.classList.toggle("active-caps", data);
        }
        break;
    }
  });

  document.addEventListener("keydown", (e) => handleGlobalKeyDown(e, input));
  document.addEventListener("keyup", (e) => handleGlobalKeyUp(e));
});
