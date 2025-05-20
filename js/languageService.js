import { keyboardLayout } from "./constants.js";

export class LanguageService {
  constructor() {
    this.labelsMap = new Map();
  }

  registerKeyLabels(keyCode, labels) {
    this.labelsMap.set(keyCode, labels);
  }

  getLabel(keyCode, lang) {
    const labels = this.labelsMap.get(keyCode);
    let char = labels?.[lang] || labels?.label || "";

    if (/^Key[A-Z]$/.test(keyCode)) {
      return char.toLowerCase();
    }
    return char;
  }
}

export const languageService = new LanguageService();

Object.values(keyboardLayout).forEach((key) => {
  languageService.registerKeyLabels(key.code, key.labels);
});
