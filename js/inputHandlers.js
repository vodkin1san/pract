import { updateKeyboardLabels } from "./utils.js";
import { BACKSPACE, SHIFT, TAB, ENTER, ARROWRIGHT, ARROWLEFT, CAPSLOCK, SPACE, ONE, ALT } from "./constants.js";
import { ElementCreator } from "./elementCreator.js";
import { appState } from "./appState.js";
import { languageService } from "./languageService.js";

export let langSwitchTriggered = false;

export function initializeInput(container) {
  const input = new ElementCreator("textarea").addClass("inputText").setPlaceholder("Введите текст ...").appendTo(container).getElement();

  input.addEventListener("input", () => {
    input.style.height = "auto";
    input.style.height = input.scrollHeight + "px";
  });

  return input;
}

export function handleGlobalKeyDown(e, input) {
  e.preventDefault();
  if (e.altKey && e.shiftKey && !langSwitchTriggered) {
    langSwitchTriggered = true;
    appState.currentLang = appState.currentLang === "ru" ? "en" : "ru";
    updateKeyboardLabels();
    return;
  }

  if (e.code === CAPSLOCK) {
    appState.capsLockOn = !appState.capsLockOn;
    return;
  }

  if (e.code === ARROWLEFT) {
    if (input.selectionStart > 0) {
      input.selectionStart = input.selectionEnd = input.selectionStart - 1;
    }
    return;
  }
  if (e.code === ARROWRIGHT) {
    if (input.selectionStart < input.value.length) {
      input.selectionStart = input.selectionEnd = input.selectionStart + 1;
    }
    return;
  }

  if (e.code === BACKSPACE) {
    handleBackspace(input);
    return;
  }
  if (e.key === ENTER) {
    addToInput("\n", input);
    return;
  }
  if (e.key === TAB) {
    addToInput("\t", input);
    return;
  }

  if (e.key.length === ONE) {
    let char = e.key;
    const shouldUpper = (appState.capsLockOn && !e.shiftKey) || (!appState.capsLockOn && e.shiftKey);
    if (char.match(/[a-zа-яё]/i)) {
      char = shouldUpper ? char.toUpperCase() : char.toLowerCase();
    }
    addToInput(char, input);
  }

  const virtualKey = document.getElementById(e.code);
  if (virtualKey) {
    virtualKey.classList.add("active");
    const virtualKeyTimeout = setTimeout(() => virtualKey.classList.remove("active"), 100);
    clearTimeout(virtualKeyTimeout);
  }
}

export function handleGlobalKeyUp(e) {
  if (e.code.startsWith(SHIFT) || e.code.startsWith(ALT)) {
    langSwitchTriggered = false;
  }
  const virtualKey = document.getElementById(e.code);
  if (virtualKey) {
    virtualKey.classList.remove("active");
  }
}

export function handleKeyClick(keyData, input) {
  const virtualKey = document.getElementById(keyData.code);
  if (virtualKey) {
    virtualKey.classList.add("active");
    setTimeout(() => virtualKey.classList.remove("active"), 100);
  }

  if (keyData.labels?.label) {
    handleVirtualKeySpecial(keyData.code, input);
  } else {
    let char = languageService.getLabel(keyData.code, appState.currentLang);
    if (appState.capsLockOn && /[a-zа-яё]/.test(char)) {
      char = char.toUpperCase();
    }
    addToInput(char, input);
  }
}

export function handleVirtualKeySpecial(code, input) {
  switch (code) {
    case BACKSPACE:
      handleBackspace(input);
      break;
    case ENTER:
      addToInput("\n", input);
      break;
    case TAB:
      addToInput("\t", input);
      break;
    case SPACE:
      addToInput(" ", input);
      break;
    case CAPSLOCK:
      appState.capsLockOn = !appState.capsLockOn;
      break;
    default:
      break;
  }
}

export function addToInput(char, input) {
  input.focus();
  const start = input.selectionStart;
  const end = input.selectionEnd;
  input.value = input.value.slice(0, start) + char + input.value.slice(end);
  input.selectionStart = input.selectionEnd = start + char.length;
  input.dispatchEvent(new Event("input"));
}

function handleBackspace(input) {
  const start = input.selectionStart;
  const end = input.selectionEnd;
  if (start === end && start > 0) {
    input.value = input.value.slice(0, start - 1) + input.value.slice(end);
    input.selectionStart = input.selectionEnd = start - 1;
  } else if (start !== end) {
    input.value = input.value.slice(0, start) + input.value.slice(end);
    input.selectionStart = input.selectionEnd = start;
  }
  input.style.height = "auto";
  input.style.height = input.scrollHeight + "px";
  input.dispatchEvent(new Event("input"));
}
