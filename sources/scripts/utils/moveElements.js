/**
 * Create an instance of MoveElements
 *
 * MoveElements is a tool used to move an element
 * in the DOM depending on viewport size.
 *
 * Alternativly, you can decide to pass callback launched
 * depending on viewport size.
 *
 * @class MoveElements
 * @example
 * let moveText = new MoveElements({
 *   element: document.querySelector('#text'),
 *   mobile: {
 *     append: 'before',
 *     element: document.querySelector('#footer')
 *   },
 *   desktop: {
 *     insert: 'after',
 *     element: document.querySelector('#header')
 *   }
 * });
 */
export var MoveElements = class MoveElements {
  constructor (opts) {
    this.resizeTimer = void 0;
    this.breakpoint = opts.breakpoint ? opts.breakpoint : "640px";
    this.forceFirst = opts.forceFirst ? opts.forceFirst : false;
    this.isMobile = false;
    this.mobile = opts.mobile;
    this.desktop = opts.desktop;
    this.element = opts.element;
    this.args = opts.args;
    this.onResize = opts.onResize;

    this.handler();

    window.addEventListener("resize", (_this) => (function () {
      clearTimeout(_this.resizeTimer);
      return _this.resizeTimer = setTimeout(_this.handler.bind(_this), 50);
    }(this)), true);
  }

  move (bp) {
    if (bp.insert) {
      if (bp.insert === "before") bp.element.parentNode.insertBefore(this.element, bp.element);
      else bp.element.parentNode.insertBefore(this.element, bp.element.nextElementSibling);
    } else if (bp.append) {
      if (bp.append === "before") bp.element.insertBefore(this.element, bp.element.firstElementChild);
      else bp.element.appendChild(this.element);
    }
  }

  handler () {
    if (typeof this.onResize === "function") this.onResize();

    if (window.matchMedia("(min-width: " + this.breakpoint + ")").matches) {
      if (this.isMobile === true || this.forceFirst) {
        if (typeof this.desktop === "function") this.desktop();
        else this.move(this.desktop);
        if (this.forceFirst === true) {
          this.forceFirst = false;
          this.isMobile = false;
        } else {
          this.isMobile = !this.isMobile;
        }
      }
    }

    if (this.isMobile === false || this.forceFirst) {
      if (typeof this.mobile === "function") this.mobile();
      else this.move(this.mobile);

      if (this.forceFirst === true) {
        this.forceFirst = false;
        this.isMobile = true;
      } else {
        this.isMobile = !this.isMobile;
      }
    }
  }
};

