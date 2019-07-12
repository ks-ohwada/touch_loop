export default class ColorBoxUI {
  constructor() {
    this.colorBoxes = Array.from(document.querySelectorAll('.js-color-box'));

    this.bind();
  }

  bind() {
    this.colorBoxes.forEach(colorBox => {
      colorBox.style.backgroundColor = colorBox.dataset.color;
    });
  }
}
