import { module as mmodule } from 'modujs'
import barba from '@barba/core'
import Stats from 'stats.js'
import { html, body, isDebug } from '../utils/environment'
import { debounce } from '../utils/utils'
import * as transitions from '../organisms/_transitions'

export default class Website extends mmodule {
  constructor(m) {
    super(m)
    this.isAnimating = false
    this.updateModules = false
    this.transitions = this.setTransitions()

    this.size = {
      width: 0,
      height: 0,
    }

    this.animate = this.animate.bind(this)
    this.debounceResize = debounce(this.resize.bind(this, false), 600)

    barba.hooks.afterLeave(this.afterLeave.bind(this))
    barba.hooks.afterEnter(this.afterEnter.bind(this))
    barba.hooks.enter(this.enter.bind(this))
    barba.hooks.once(this.once.bind(this))
    barba.hooks.after(this.after.bind(this))
    barba.hooks.beforeLeave(this.toggleLoad.bind(this, true))
    this.config = {
      debug: isDebug,
      transitions: this.transitions,
      animate: this.el.dataset.animate !== undefined,
    }

    this.setStats()
    barba.init(this.config)
  }

  setStats() {
    if (isDebug) {
      this.config.logLevel = 'info'
      this.config.timeout = 10000
      this.stats = new Stats()
      this.stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
      body.appendChild(this.stats.dom)
    }
  }

  once() {
    this.setModulesFunctions()
    this.updateModules = true
    this.toggleLoad(false)
    window.addEventListener('resize', this.debounceResize)
    if (isDebug || this.config.animate) {
      this.requestId = window.requestAnimationFrame(this.animate)
    }
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

    if (this.updateModules && this.isAnimating) {
      this.parseModulesFunctions('animate')
      this.parseModulesFunctions('aAnimate')
    }

    // monitored code goes here
    if (isDebug) {
      this.stats.end()
    }
    this.requestId = window.requestAnimationFrame(this.animate)
  }

  after() {
    // this.call('update', null, 'Axeptio')
    this.toggleLoad(false)
  }

  afterLeave({ current }) {
    this.updateModules = false
    if (current.container) {
      this.call('destroy', current.container, 'app')
    }
  }

  // eslint-disable-next-line class-methods-use-this
  enter({ current }) {
    if (current.container) {
      current.container.remove()
    }
    window.scrollTo(0, 0)
  }

  afterEnter({ next }) {
    this.call('update', next.container, 'app')
    this.setModulesFunctions()
    this.updateModules = true
    this.resize(true)
  }

  toggleLoad(state) {
    html.classList[state ? 'remove' : 'add']('is-loaded')
    html.classList[state ? 'add' : 'remove']('is-loading')
    this.isAnimating = !state
  }

  setModulesFunctions() {
    this.browseModulesFunctions(['resize', 'aResize', 'animate', 'aAnimate'])
  }

  browseModulesFunctions(funcs) {
    this.modulesToList = {}
    funcs.forEach((func) => {
      this.modulesToList[func] = []
    })
    const modules = this.modules.app.app.currentModules
    const modulesToParse = Object.keys(modules)
    modulesToParse.forEach((moduleName) => {
      const moduleInstance = modules[moduleName]
      funcs.forEach((func) => {
        if (
          typeof moduleInstance[func] === 'function' &&
          !moduleName.includes('Website')
        ) {
          this.modulesToList[func].push(moduleName)
        }
      })
    })
  }

  parseModulesFunctions(func) {
    const modulesFunct = this.modulesToList[func]
    const { length } = modulesFunct
    for (let i = 0; i < length; i += 1) {
      const moduleId = modulesFunct[i]
      this.modules.app.app.currentModules[moduleId][func]()
    }
  }

  setTransitions() {
    const transitionsArray = []
    Object.keys(transitions).forEach((transitionName) => {
      const singleTransition = transitions[transitionName]
      singleTransition.init(this, {})
      transitionsArray.push(singleTransition)
    })
    return transitionsArray
  }
}
