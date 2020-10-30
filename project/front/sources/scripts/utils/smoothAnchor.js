/**
 * Init smoothScroll handling on import.
 *
 * @module smoothAnchor
 * @example
 * // import it in your Javascript file
 * import "path/to/smoothScroll.js"
 * @example
 * <!-- Use it on any element -->
 * <a class="smoothscroll" href="#section-1">Scroll to section 1</a>
 * <span class="smoothscroll" data-target="#section-2">Scroll to section 2</span>
 * */

import "../vendor/smoothScroll-polyfill.js";

export default (selector => {
  Array.from(document.querySelectorAll(selector)).forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      let anchor = link.getAttribute(link.tagName === "A" ? "href" : "data-target");
      const anchorReplace = anchor.replace(/\//g, "");
      document.querySelector(anchorReplace).scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });
})(".smoothscroll");
