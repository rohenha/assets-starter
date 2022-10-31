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
    const scroll = this.$('scroll')[0]

    this.config.height = content.offsetHeight
    let duration = (this.config.height * 1) / 600
    duration = Math.min(Math.max(duration, 0.7), 3)

    scroll.style.setProperty('--atransition', `${duration}s`)
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
    const buttonText = this.$('buttonText')[0]

    let height = 0

    button.setAttribute('aria-expanded', this.state)

    if (this.state) {
      height = scroll.scrollHeight
      buttonText.innerText = buttonText.dataset.close
    } else {
      buttonText.innerText = buttonText.dataset.open
    }

    scroll.style.setProperty('--heightscroll', `${height}px`)
  }
}
