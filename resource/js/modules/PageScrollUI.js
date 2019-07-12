import velocity from 'velocity-animate';
import EventEmitter from 'events';

export default class PageScrollUI extends EventEmitter {
  constructor() {
    super();
    this.$links = Array.from(document.querySelectorAll('a[href^="#"]'));
    this.bind();
  }

  bind() {
    this.$links.forEach($link => {
      const href = $link.getAttribute('href');
      if (href === '#') return;
      $link.addEventListener('click', e => {
        const $target = document.querySelector(href);
        if ($target) {
          e.preventDefault();
          this.emit('scroll');
          velocity($target, 'scroll', {
            duration: 700,
            easing: [250, 30],
            offset: -30,
          });
        }
      });
    });
  }
}
