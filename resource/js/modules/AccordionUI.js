import velocity from 'velocity-animate';

export default class AccordionUI {
  constructor() {
    this.$accordionWraps = Array.from(
      document.querySelectorAll('.js-accordion-wrap')
    );
    this.$accordionInners = Array.from(
      document.querySelectorAll('.js-accordion-inner')
    );
    this.openAccordionButtons = Array.from(
      document.querySelectorAll('.js-accordion')
    );

    this.index = 0;

    this.bind();
  }

  bind() {
    this.openAccordionButtons.forEach(AccordionButton => {
      AccordionButton.addEventListener('click', e => {
        this.index = Number(e.currentTarget.dataset.value);
        if (e.currentTarget.classList.contains('is-open')) {
          this.closeAccordion(e.currentTarget);
        } else {
          this.openAccordion(e.currentTarget);
        }
      });
    });
  }

  /* クリックした箇所のアコーディオンを開く */
  openAccordion(AccordionButton) {
    AccordionButton.classList.add('is-open');
    velocity(
      this.$accordionWraps[this.index],
      {
        height: this.$accordionInners[this.index].offsetHeight,
      },
      {
        duration: 400,
        mobileHA: false,
      }
    );
  }

  /* クリックした箇所のアコーディオンを閉じる */
  closeAccordion(AccordionButton) {
    AccordionButton.classList.remove('is-open');
    velocity(
      this.$accordionWraps[this.index],
      {
        height: 0,
      },
      {
        duration: 400,
        mobileHA: false,
      }
    );
  }
}
