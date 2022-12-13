import { module as mmodule } from 'modujs'
import Stats from 'stats.js'
import LazyLoad from 'vanilla-lazyload'
import { html, body, isDebug } from '../utils/environment'
import { debounce } from '../utils/utils'
import { modulesConfig } from '../organisms/_modules-config'

export default class Website extends mmodule {
  constructor(m) {
    super(m)
    this.isAnimating = false
    this.updateModules = false
    this.isAnimating = this.el.dataset.animate !== undefined

    this.size = {
      width: 0,
      height: 0,
    }

    this.animate = this.animate.bind(this)
    this.debounceResize = debounce(this.resize.bind(this, false), 600)

    this.lazy = new LazyLoad({
      use_native: true,
      container: this.el,
      elements_selector: '[data-lazy]',
      class_loaded: '-loaded',
      class_loading: '-loading',
      class_error: '-error',
      class_entered: '-entered',
      class_exited: '-exited',
    })
  }

  setStats() {
    this.stats = new Stats()
    this.stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
    body.appendChild(this.stats.dom)
  }

  init() {
    this.updateModules = true
    this.resize(true)
    window.addEventListener('resize', this.debounceResize)
    if (isDebug) {
      this.setStats()
    }
    if (isDebug || this.isAnimating) {
      this.requestId = window.requestAnimationFrame(this.animate)
    }
    this.toggleLoad(false)
  }

  resize(force = false) {
    if (
      window.innerWidth < 768 &&
      window.innerWidth === this.size.width &&
      force === false
    ) {
      return
    }
    this.size = {
      width: window.innerWidth,
      height: window.innerHeight,
    }
    if (this.updateModules) {
      this.parseModulesFunctions('resize')
      this.parseModulesFunctions('aResize')
    }
  }

  animate() {
    if (isDebug) {
      this.stats.begin()
    }

    // monitored code goes here
    if (this.updateModules && this.isAnimating) {
      this.parseModulesFunctions('animate')
      this.parseModulesFunctions('aAnimate')
    }

    if (isDebug) {
      this.stats.end()
    }
    this.requestId = window.requestAnimationFrame(this.animate)
  }

  toggleLoad(state) {
    html.classList[state ? 'remove' : 'add']('is-loaded')
    html.classList[state ? 'add' : 'remove']('is-loading')
    this.isAnimating = !state
  }

  parseModulesFunctions(func) {
    const modulesFunct = modulesConfig[func]
    const { length } = modulesFunct
    if (length === 0) {
      return
    }

    for (let i = 0; i < length; i += 1) {
      const moduleName = modulesFunct[i]
      this.call(func, null, moduleName)
    }
  }
}

// import { module as mmodule } from 'modujs'
// import Stats from 'stats.js'
// import { html, body, isDebug } from '../utils/environment'
// import { debounce } from '../utils/utils'

// export default class WebsiteStatic extends mmodule {
//   constructor(m) {
//     super(m)
//     this.isAnimating = false
//     this.updateModules = false

//     this.size = {
//       width: 0,
//       height: 0,
//     }

//     this.animate = this.animate.bind(this)
//     this.debounceResize = debounce(this.resize.bind(this, false), 600)

//     this.config = {
//       debug: isDebug,
//       animate: this.el.dataset.animate !== undefined,
//     }

//     this.setStats()
//   }

//   setStats() {
//     if (isDebug) {
//       this.config.logLevel = 'info'
//       this.config.timeout = 10000
//       this.stats = new Stats()
//       this.stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
//       body.appendChild(this.stats.dom)
//     }
//   }

//   init() {
//     this.setModulesFunctions()
//     this.updateModules = true
//     this.toggleLoad(false)
//     window.addEventListener('resize', this.debounceResize)
//     if (isDebug || this.config.animate) {
//       this.requestId = window.requestAnimationFrame(this.animate)
//     }
//   }

//   resize(force = false) {
//     if (
//       window.innerWidth < 768 &&
//       window.innerWidth === this.size.width &&
//       force === false
//     ) {
//       return
//     }
//     this.size = {
//       width: window.innerWidth,
//       height: window.innerHeight,
//     }
//     if (this.updateModules) {
//       this.parseModulesFunctions('resize')
//       this.parseModulesFunctions('aResize')
//     }
//   }

//   animate() {
//     if (isDebug) {
//       this.stats.begin()
//     }

//     if (this.updateModules && this.isAnimating) {
//       this.parseModulesFunctions('animate')
//       this.parseModulesFunctions('aAnimate')
//     }

//     // monitored code goes here
//     if (isDebug) {
//       this.stats.end()
//     }
//     this.requestId = window.requestAnimationFrame(this.animate)
//   }

//   toggleLoad(state) {
//     html.classList[state ? 'remove' : 'add']('is-loaded')
//     html.classList[state ? 'add' : 'remove']('is-loading')
//     this.isAnimating = !state
//   }

//   setModulesFunctions() {
//     this.browseModulesFunctions(['resize', 'aResize', 'animate', 'aAnimate'])
//   }

//   browseModulesFunctions(funcs) {
//     this.modulesToList = {}
//     funcs.forEach((func) => {
//       this.modulesToList[func] = []
//     })
//     const modules = this.modules.app.app.currentModules
//     const modulesToParse = Object.keys(modules)
//     modulesToParse.forEach((moduleName) => {
//       const moduleInstance = modules[moduleName]
//       funcs.forEach((func) => {
//         if (
//           typeof moduleInstance[func] === 'function' &&
//           !moduleName.includes('Website')
//         ) {
//           this.modulesToList[func].push(moduleName)
//         }
//       })
//     })
//   }

//   parseModulesFunctions(func) {
//     const modulesFunct = this.modulesToList[func]
//     const { length } = modulesFunct
//     for (let i = 0; i < length; i += 1) {
//       const moduleId = modulesFunct[i]
//       this.modules.app.app.currentModules[moduleId][func]()
//     }
//   }
// }
