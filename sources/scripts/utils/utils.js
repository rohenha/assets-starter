import { isDebug } from "./environment";

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
export const ready = (fn, element = document) => {
  // eslint-disable-next-line no-unused-expressions
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
export const debounce = (callback, delay) => {
  let timer;
  return () => {
    // eslint-disable-next-line no-undef
    const args = arguments;
    const context = this;
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
export const throttle = (callback, delay) => {
  let last;
  let timer;
  // eslint-disable-next-line func-names
  return function () {
    const context = this;
    const now = +new Date();
    // eslint-disable-next-line prefer-rest-params
    const args = arguments;
    if (last && now < last + delay) {
      // le délai n'est pas écoulé on reset le timer
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
// eslint-disable-next-line complexity
export const closest = (element, selector, stopSelector = "body") => {
  // eslint-disable-next-line no-undef
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


export const getTransform = (el) => {
  const style = window.getComputedStyle(el)
  return style.transform || style.webkitTransform || style.mozTransform
}

export const getMatrix = (transform) => {
  const translate = {}
  let mat = transform.match(/^matrix3d\((.+)\)$/)
  if (mat) {
    translate.x = parseFloat(mat[1].split(', ')[12])
    translate.y = parseFloat(mat[1].split(', ')[13])
  } else {
    mat = transform.match(/^matrix\((.+)\)$/)
    translate.x = mat ? parseFloat(mat[1].split(', ')[4]) : 0
    translate.y = mat ? parseFloat(mat[1].split(', ')[5]) : 0
  }
  return translate
}

export function lerp(start, end, amt) {
  return (1 - amt) * start + amt * end;
}

export function roundDecimal(nombre, precision = 2) {
  // var precision = precision || 2;
  const tmp = 10 ** precision
  // const tmp = Math.pow(10, precision);
  return Math.round(nombre * tmp)/tmp;
}

export function formatForm(form) {
  const formData = new FormData(form)
  const entries = Array.from(formData.entries())
  const filtersObject = {}
  entries.forEach(([name, value]) => {
    try {
      filtersObject[name] = JSON.parse(value)
    } catch (e) {
      filtersObject[name] = value
    }
  })
  return filtersObject
}

export function getRatioPx (value) {
  return value / window.screen.width * window.viewport.width
}

export function getResponsiveValue (responsiveObject) {
  if(typeof responsiveObject === 'object') {
    let responsiveValue = 1
    Object.entries(responsiveObject).forEach(([key, value]) => {
      if (Number(key) < window.screen.width) {
        responsiveValue = value
      }
    })
    return responsiveValue
  } 
  return responsiveObject
}

export function hasTouchEvent() {
  return ( 'ontouchstart' in window ) || 
    ( navigator.maxTouchPoints > 0 ) ||
    ( navigator.msMaxTouchPoints > 0 );
}

export function log(content) {
  if (isDebug) {
    console.log(content)
  }
}