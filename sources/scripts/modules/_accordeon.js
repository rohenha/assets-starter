import { module as mmodule } from 'modujs'
// import gsap, { Power2 } from 'gsap'

export default class Accordeon extends mmodule {
  constructor(m) {
    super(m)
    this.config = {
      duration: 1,
      height: 0,
    }
    this.duration = 1
    this.events = {
      click: {
        button: 'toggle',
      },
    }
  }

  resize() {
    const content = this.$('content')[0]
    this.config.height = content.offsetHeight
    const duration = (this.config.height * 1) / 600
    this.config.duration = Math.min(Math.max(duration, 0.7), 3)
  }

  toggle() {
    this.change(!this.state)
  }

  change(state) {
    if (this.state === state) {
      return
    }

    this.state = state

    const scroll = this.$('scroll')[0]
    const button = this.$('button')[0]
    let height = 0

    button.setAttribute('aria-expanded', this.state)

    if (this.state) {
      height = this.config.height
    }

    // gsap.to(scroll, {
    //   onComplete: () => {
    //     this.call('update', null, 'Scroll')
    //   },
    //   duration: this.config.duration,
    //   ease: Power2.easeInOut,
    //   height
    // })
  }
}
