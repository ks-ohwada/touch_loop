import velocity from 'velocity-animate';

export default class SpNavigationUI {
  constructor() {
    this.$navigation = document.querySelector('.nav');
    this.$navigationInner = document.querySelector('.nav-inner');
    this.openNavigationButton = document.querySelector('.burger-icon');
    this.bind();

    this.isOpen = false;
  }

  bind() {
    this.openNavigationButton.addEventListener('click', () => {
      this.toggle();
    });
  }

  /* ハンバーガーメニューを開く */
  openNavigation() {
    if (this.isOpen) return;
    this.openNavigationButton.classList.add('is-open');
    velocity(
      this.$navigation,
      {
        height: this.$navigationInner.offsetHeight,
      },
      {
        duration: 600,
        mobileHA: false,
      }
    );
    this.isOpen = true;
  }

  /* ハンバーガーメニューを閉じる */
  closeNavigation() {
    if (!this.isOpen) return;
    this.openNavigationButton.classList.remove('is-open');
    velocity(
      this.$navigation,
      {
        height: 0,
      },
      {
        duration: 600,
        mobileHA: false,
      }
    );
    this.isOpen = false;
  }

  toggle() {
    if (this.isOpen) {
      this.closeNavigation();
    } else {
      this.openNavigation();
    }
  }
}
