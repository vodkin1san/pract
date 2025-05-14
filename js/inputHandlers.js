import { updateKeyboardLabels } from "./utils.js";

export let currentLang = "ru";
export let langSwitchTriggered = false;
export let capsLockOn = false;

const BACKSPACE = "Backspace";
const SHIFT = "Shift";
const TAB = "Tab";
const ENTER = "Enter";
const ARROWRIGHT = "ArrowRight";
const ARROWLEFT = "ArrowLeft";
const CAPSLOCK = "CapsLock";
const SPACE = "Space";
const ONE = 1;
const ALT = "Alt";

export function initializeInput(container) {
  const input = document.createElement("textarea");
  // console.log("Initialized input:", input);
  input.classList.add("inputText");
  input.placeholder = "Введите текст ...";
  container.appendChild(input);
  input.focus();

  input.addEventListener("input", () => {
    input.style.height = "auto";
    input.style.height = input.scrollHeight + "px";
  });

  return input;
}

export function handleGlobalKeyDown(e, input) {
  e.preventDefault();
  // console.log(e.key, e.code);
  // Переключение языка
  if (e.altKey && e.shiftKey && !langSwitchTriggered) {
    langSwitchTriggered = true;
    currentLang = currentLang === "ru" ? "en" : "ru";
    updateKeyboardLabels(currentLang);
    return;
  }

  // CapsLock
  if (e.code === CAPSLOCK) {
    capsLockOn = !capsLockOn;
    return;
  }

  // Стрелки
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

  // Специальные клавиши
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

  // Обычные символы
  if (e.key.length === ONE) {
    let char = e.key;
    if (char.match(/[a-zа-яё]/i)) {
      const shouldUpper = (capsLockOn && !e.shiftKey) || (!capsLockOn && e.shiftKey);
      char = shouldUpper ? char.toUpperCase() : char.toLowerCase();
    }
    addToInput(char, input);
  }

  // Анимация виртуальной клавиши
  const virtualKey = document.querySelector(`.key[data-code="${e.code}"]`);
  if (virtualKey) {
    virtualKey.classList.add("active");
    setTimeout(() => virtualKey.classList.remove("active"), 100);
  }
}

export function handleGlobalKeyUp(e) {
  if (e.code.startsWith(SHIFT) || e.code.startsWith(ALT)) {
    langSwitchTriggered = false;
  }
  const virtualKey = document.querySelector(`.key[data-code="${e.code}"]`);
  if (virtualKey) {
    virtualKey.classList.remove("active");
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
      capsLockOn = !capsLockOn;
      break;
    default:
      break;
  }
}

// Вспомогательные функции
function addToInput(char, input) {
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
}
