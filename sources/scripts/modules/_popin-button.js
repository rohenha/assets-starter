import { module as mmodule } from 'modujs'

export default class PopinButton extends mmodule {
  constructor(m) {
    super(m)
    this.function = this.el.dataset.function || 'open'
    this.events = {
      click: 'onClick',
    }
  }

  init() {
    this.getPopin()
  }

  getPopin() {
    const id = this.el.dataset.popin
    const popinEl = document.querySelector(`#${id}`)
    if (!popinEl) {
      this.popinModule = null
      return
    }
    this.popinModule = popinEl.dataset.modulePopin
  }

  onClick() {
    if (!this.popinModule) {
      return
    }

    this.call(this.function, null, 'Popin', this.popinModule)
  }
}
