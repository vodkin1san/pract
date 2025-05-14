export function updateKeyboardLabels(currentLang) {
  const keys = document.querySelectorAll(".key");
  keys.forEach((key) => {
    if (key.hasAttribute("data-ru") && key.hasAttribute("data-en")) {
      key.textContent = key.getAttribute("data-" + currentLang);
    }
  });
}
