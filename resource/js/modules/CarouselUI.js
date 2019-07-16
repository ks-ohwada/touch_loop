import velocity from 'velocity-animate';

export default class CarouselUI {
  constructor() {
    // DOM
    this.$carouselWrap = document.querySelector('.js-carousel-wrap');
    this.$carouselInner = document.querySelector('.js-carousel-inner');
    this.$carouselItems = Array.from(
      document.querySelectorAll('.js-carousel-item')
    );

    // 数値
    this.width = Number(this.$carouselWrap.clientWidth);
    this.firstX = 0;
    this.lastX = 0;
    this.diffX = 0;
    this.translateX = 0;
    this.lastTranslateX = 0;

    this.index = 0;

    //フラグ
    this.isLastSlide = false;
    this.isFirstSlide = false;

    // 初期化
    this.$carouselInner.style.width = `${this.$carouselItems.length * 100}%`;

    this.bind();
  }

  // イベント付与
  bind() {
    // 画面サイズが変更された時、横幅を取得し直す。
    window.addEventListener('resize', () => {
      this.resizeCarouselWidth();
    });

    this.$carouselInner.addEventListener('touchstart', e => {
      this.firstX = e.changedTouches[0].pageX;
    });

    this.$carouselInner.addEventListener('touchmove', e => {
      e.preventDefault();
      this.diffX = e.changedTouches[0].pageX;

      this.width * (this.$carouselItems.length - 1) <
      this.translateX + this.firstX - this.diffX
        ? (this.isLastSlide = true)
        : (this.isLastSlide = false);

      this.translateX + this.firstX - this.diffX < 0
        ? (this.isFirstSlide = true)
        : (this.isFirstSlide = false);

      this.moveHandler();
    });

    this.$carouselInner.addEventListener('touchend', e => {
      this.lastX = e.changedTouches[0].pageX;

      // 指を離した場所が最後のスライドだった場合、右方向に無限ループでスライドさせる。
      if (this.isLastSlide) {
        this.translateX = 0;
        this.index = 0;
        this.slideCarousel();
        this.isLastSlide = false;
        return;
      }

      // 指を離した場所が最初のスライドだった場合、左方向に無限ループでスライドさせる。
      if (this.isFirstSlide) {
        this.translateX = this.width * (this.$carouselItems.length - 1);
        this.index = this.$carouselItems.length - 1;
        this.slideCarousel();
        this.isFirstSlide = false;
        return;
      }

      // 右方向にタッチで動かした場合、右にスライドさせる。
      if (this.lastX < this.firstX) {
        this.index++;
        this.translateX += this.width;
      }

      // 左方向にタッチで動かした場合、左にスライドさせる。
      if (this.lastX > this.firstX) {
        this.index--;
        this.translateX -= this.width;
      }

      this.slideCarousel();
    });
  }

  // 指でカルーセルを動かしている最中の処理
  moveHandler() {
    // スライドを動かしている最中、一番最後か一番最初のスライドだった場合無限ループさせる。
    if (this.isLastSlide || this.isFirstSlide) {
      this.loopCarousel();
      return;
    }

    if (this.diffX < this.firstX) {
      this.$carouselInner.style.transform = `translateX(-${this.translateX +
        this.firstX -
        this.diffX}px)`;

      this.lastTranslateX = this.translateX + this.firstX - this.diffX;
    }

    if (this.diffX > this.firstX) {
      this.$carouselInner.style.transform = `translateX(${this.diffX -
        (this.translateX + this.firstX)}px)`;

      this.lastTranslateX = -(this.diffX - (this.translateX + this.firstX));
    }

    this.$carouselItems[this.$carouselItems.length - 1].style.transform = ``;
  }

  // ウィンドウ幅がリサイズされたら、カルーセルの横幅を取得し直す
  resizeCarouselWidth() {
    this.width = Number(this.$carouselWrap.clientWidth);
    this.translateX = this.width * this.index;
    this.$carouselInner.style.transform = `translateX(-${this.translateX}px)`;
  }

  // カルーセルをスライドさせる
  slideCarousel() {
    if (this.isLastSlide) {
      velocity(
        this.$carouselInner,
        {
          translateX: [0, this.lastTranslateX],
        },
        {
          duration: 500,
          mobileHA: false,
          complete: () => {
            this.$carouselItems[
              this.$carouselItems.length - 1
            ].style.transform = ``;
          },
        }
      );
      return;
    }

    if (this.isFirstSlide) {
      velocity(
        this.$carouselInner,
        {
          translateX: [this.width, -this.lastTranslateX],
        },
        {
          duration: 300,
          mobileHA: false,
          complete: () => {
            this.$carouselInner.style.transform = `translateX(-${this.width *
              (this.$carouselItems.length - 1)}px)`;
            this.$carouselItems[
              this.$carouselItems.length - 1
            ].style.transform = ``;
          },
        }
      );
      return;
    }

    velocity(
      this.$carouselInner,
      {
        translateX: [-this.translateX, -this.lastTranslateX],
      },
      {
        duration: 300,
        mobileHA: false,
        complete: () => {
          this.$carouselItems[
            this.$carouselItems.length - 1
          ].style.transform = ``;
        },
      }
    );
  }

  // カルーセルがループする時の処理
  loopCarousel() {
    if (this.isLastSlide) {
      this.$carouselItems[
        this.$carouselItems.length - 1
      ].style.transform = `translateX(-${this.$carouselItems.length * 100}%)`;
      this.$carouselInner.style.transform = `translateX(${this.width -
        (this.firstX - this.diffX)}px)`;

      this.lastTranslateX = this.width - (this.firstX - this.diffX);
    }

    if (this.isFirstSlide) {
      this.$carouselItems[
        this.$carouselItems.length - 1
      ].style.transform = `translateX(-${this.$carouselItems.length * 100}%)`;
      this.$carouselInner.style.transform = `translateX(${this.diffX -
        (this.translateX + this.firstX)}px)`;

      this.lastTranslateX = -(this.diffX - (this.translateX + this.firstX));
    }
  }
}
