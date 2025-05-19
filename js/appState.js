export class AppState {
  constructor() {
    this._currentLang = "ru";
    this._capsLockOn = false;
    this.observers = [];
  }

  get currentLang() {
    return this._currentLang;
  }

  set currentLang(value) {
    if (this._currentLang !== value) {
      this._currentLang = value;
      this.notify("currentLangChanged", value);
    }
  }

  get capsLockOn() {
    return this._capsLockOn;
  }

  set capsLockOn(value) {
    if (this._capsLockOn !== value) {
      this._capsLockOn = value;
      this.notify("capsLockChanged", value);
    }
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  notify(event, data) {
    this.observers.forEach((observer) => observer(event, data));
  }
}

export const appState = new AppState();
