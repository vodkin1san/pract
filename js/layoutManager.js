import { ElementCreator } from "./elementCreator.js";

export class LayoutManager {
  constructor() {
    this.container = null;
  }

  createContainer(className) {
    this.container = new ElementCreator("div").addClass(className).appendTo(document.body).getElement();
    return this;
  }

  addElementToContainer(elementCreator) {
    elementCreator.appendTo(this.container);
    return this;
  }

  getContainer() {
    return this.container;
  }
}
