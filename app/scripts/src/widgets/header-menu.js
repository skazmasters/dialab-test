class HeaderMenu extends Widget {
  constructor(node) {
    super(node, 'js-header');

    this.$toggle = this.queryElement('.burger');
    this.$menu = this.queryElement('.menu');
    this.$user = this.queryElement('.user');

    this.events();
  }

  events() {
    this.$toggle.addEventListener('click', this.onButtonClick.bind(this));

    const handleClosure = event =>
      !this.$menu.contains(event.target)
      && !event.target.classList.contains('dropdown-overlay')
      && !this.$user.contains(event.target)
      && this.hide();

    document.addEventListener('click', handleClosure);
    document.addEventListener('focusin', handleClosure);
  }

  onButtonClick(e) {
    e.preventDefault();
    e.stopPropagation();

    JSON.parse(this.$toggle.getAttribute('aria-expanded')) ? this.hide() : this.show();
  }

  show() {
    hideScrollbar();
    this.$toggle.setAttribute('aria-expanded', true);
    this.$menu.setAttribute('aria-hidden', false);
    this.$node.classList.add('menu-opened');
  }

  hide() {
    showScrollbar();
    this.$toggle.setAttribute('aria-expanded', false);
    this.$menu.setAttribute('aria-hidden', true);
    this.$node.classList.remove('menu-opened');
  }

  static init(el) {
    el && new HeaderMenu(el);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.js-header').forEach(item => HeaderMenu.init(item));
});
