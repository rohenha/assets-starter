// import gsap, { Power3 } from 'gsap'
import anime from 'animejs'
// import { html } from '../utils/environment'
// import loadImages from './_images'

export default {
  after() {
    this.updatePercent({
      loaded: 0,
      toLoad: 1,
    })
  },

  afterEnter(data) {
    const tl = anime.timeline({
      easing: 'easeInOutCubic',
      duration: 1200,
    })

    tl.add({
      targets: this.container,
      translateY: '-100%',
    })

    return tl.finished
  },

  afterLeave() {},

  before() {},

  beforeEnter() {
    // return loadImages(
    //   data.next.container,
    //   this.updatePercent.bind(this)
    // )
  },

  beforeLeave() {},

  enter() {},

  init(parent, config) {
    this.container = document.querySelector('#js-loader')
    this.parent = parent
    this.call = this.parent.call.bind(this.parent)
    this.config = config
  },

  invoke() {
    return {
      after: this.after.bind(this),
      afterEnter: this.afterEnter.bind(this),
      afterLeave: this.afterLeave.bind(this),
      before: this.before.bind(this),
      beforeEnter: this.beforeEnter.bind(this),
      beforeLeave: this.beforeLeave.bind(this),
      enter: this.enter.bind(this),
      init: this.init.bind(this),
      leave: this.leave.bind(this),
      name: this.name,
      once: this.once.bind(this),
      updatePercent: this.updatePercent.bind(this),
    }
  },

  leave() {
    const tl = anime.timeline({
      easing: 'easeInOutCubic',
      duration: 1200,
    })

    tl.add({
      targets: this.container,
      translateY: ['100%', '0%'],
    })

    return tl.finished
  },

  name: 'basic',

  once(data) {
    this.afterEnter(data).then(() => {
      this.after()
      this.parent.after()
    })
  },

  updatePercent() {
    // this.percent.innerHTML = `${Math.round(
    //   (state.loaded / state.toLoad) * 100
    // )}%`
  },
}.invoke()
