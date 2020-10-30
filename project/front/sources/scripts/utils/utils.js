/**
 * List of usefull tools
 *
 * @module utils
 * @example
 * import { ready } from "path/to/utils.js"
 */

/**
 * Execute a callback when element is ready
 *
 * @method ready
 * @access public
 * @param {function} fn - Callback to execute if element is ready
 * @param {nodeElement} [element] - Element on wich check if it's ready
 * @example
 * import { ready } from "path/to/utils.js"
 *
 * ready(() => {
 *   // your code here
 * })
 */
export let ready = function (fn, element = document) {
  element.readyState !== "loading"
    ? fn.apply(element)
    : element.addEventListener("DOMContentLoaded", fn.bind(element));
};

/**
 * Debouncing enforces that a function not be called again until a certain amount of time has passed without it being called.
 * As in "execute this function only if 100 milliseconds have passed without it being called."
 *
 * @method debounce
 * @access public
 * @param {function} callback
 * @param {integer} delay
 * @returns {function}
 * @example
 * import { debounce } from "path/to/utils.js"
 *
 * document.body.addEventListener('scroll', debounce(
 *    () => {
 *      // Your code here
 *      // Executed 50ms after the user stops to scroll
 *    }, 50
 * ))
 */
export let debounce = function (callback, delay) {
  let timer;
  return () => {
    let args = arguments;
    let context = this;
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback.apply(context, args);
    }, delay);
  };
};

/**
 * Throttling enforces a maximum number of times a function can be called over time.
 * As in "execute this function at most once every 100 milliseconds."
 *
 * @method throttle
 * @access public
 * @param {function} callback
 * @param {integer} delay
 * @returns {function}
 * @example
 * import { throttle } from "path/to/utils.js"
 *
 * document.body.addEventListener('scroll', throttle(
 *    () => {
 *      // Your code here
 *      // Executed everey 50ms during scrolling
 *    }, 50
 * ))
 */
export let throttle = function (callback, delay) {
  let last,
    timer;
  return () => {
    let args = arguments,
      context = this,
      now = +new Date();
    if (last && now < last + delay) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        last = now;
        callback.apply(context, args);
      }, delay);
    } else {
      last = now;
      callback.apply(context, args);
    }
  };
};

/**
 * Return the closest ancestor of an element matching a selector
 *
 * @method closest
 * @access public
 * @param {nodeElement} element
 * @param {string} selector
 * @param {string} [stopSelector="body"]
 * @returns {nodeElement}
 * @example
 * <!-- Considering following HTML structure -->
 * <div class="foo">
 *    <div class="bar">
 *      <div id="baz">
 *        lorem ipsum
 *      </div>
 *    </div>
 * </div>
 * @example
 * import { closest } from "path/to/utils.js"
 *
 * // It return you `.foo` div
 * closest(document.querySelector('#baz'), '.foo');
 */
export let closest = function (element, selector, stopSelector = "body") {
  if (!Element.prototype.matches) Element.prototype.matches = Element.prototype.msMatchesSelector;
  let retval = null;
  while (element) {
    if (element.matches(selector)) {
      retval = element;
      break;
    } else if (stopSelector && element.matches(stopSelector)) {
      break;
    }
    element = element.parentElement;
  }
  return retval;
};
