class Toggle extends Widget {
  constructor(node) {
    super(node, '.js-toggle');

    this.$btn = this.queryElement('.btn')
    this.$container = this.queryElement('.container')
    this.$overlay = null

    this.onClick = this.onClick.bind(this)
    this.onCloseClick = this.onCloseClick.bind(this)

    this.init();
  }

  build() {
    this.$overlay === null ? this.createOverlay() : null

    this.$btn.addEventListener('click', this.onClick)
  }

  onClick(e) {
    e.preventDefault()

    this.$container.classList.toggle('active')
    this.$overlay.classList.add('active')

    this.$overlay.addEventListener('click', this.onCloseClick)
  }

  createOverlay() {
    this.$overlay = document.createElement('div')
    this.$overlay.classList.add('dropdown-overlay')
    document.body.append(this.$overlay)
  }

  onCloseClick() {
    const handler = e => {
      if (e.target !== e.currentTarget) return false;
      this.$container.removeEventListener(endEvents.transition, handler)
      this.$overlay.removeEventListener('click', this.onCloseClick)
      this.$overlay.classList.remove('active')
    };

    this.$container.addEventListener(endEvents.transition, handler)
    this.$container.classList.remove('active')
  }

  static init($el) {
    new Toggle($el);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.js-toggle').forEach(item => Toggle.init(item));
});
