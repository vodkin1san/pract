export class ElementCreator {
  constructor(tagName) {
    this.element = document.createElement(tagName);
  }
  addEventListener(event, callback) {
    if (this.element) {
      this.element.addEventListener(event, callback);
    }
    return this;
  }

  addClass(className) {
    this.element.classList.add(className);
    return this;
  }

  setAttribute(name, value) {
    this.element.setAttribute(name, value);
    return this;
  }

  setText(text) {
    this.element.textContent = text;
    return this;
  }

  setPlaceholder(placeholder) {
    this.element.placeholder = placeholder;
    return this;
  }

  addEventListener(event, callback) {
    this.element.addEventListener(event, callback);
    return this;
  }

  appendTo(parent) {
    if (parent instanceof ElementCreator) {
      parent.element.appendChild(this.element);
    } else {
      parent.appendChild(this.element);
    }
    return this;
  }

  getElement() {
    return this.element;
  }
}
