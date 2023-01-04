import { module as mmodule } from 'modujs'
import LoconativeScroll from 'loconative-scroll'

export default class extends mmodule {
  init() {
    const direction =
      this.el.dataset.horizontal !== undefined ? 'horizontal' : 'vertical'
    this.scroll = new LoconativeScroll({
      el: this.el,
      smooth: true,
      direction,
      tablet: {
        breakpoint: 768,
      },
      reloadOnContextChange: false,
    })

    this.scroll.on('call', this.onCall.bind(this))
    this.scroll.on('scroll', this.onScroll.bind(this))
  }

  onCall(func, way, obj) {
    this.call(func[0], { enter: way === 'enter', obj }, func[1], func[2])
  }

  onScroll(args) {
    const keys = Object.keys(args.currentElements)
    keys.forEach((key) => {
      const el = args.currentElements[key]
      this.checkKeysScroll(el, key)
    })
  }

  checkKeysScroll(el, key) {
    const regexFunc = new RegExp('^[a-zA-Z]*[,]')
    if (regexFunc.test(key)) {
      const func = key.split(', ')
      this.call(func[0], { progress: el.progress, el }, func[1], func[2])
    }
  }

  toggle(state) {
    if (this.scroll) {
      const functionName = state ? 'start' : 'stop'
      this.scroll[functionName]()
    }
  }

  update() {
    if (this.scroll) {
      this.scroll.update()
    }
  }

  scrollTo(to, parameters) {
    if (this.scroll) {
      this.scroll.scrollTo(to, { ...parameters })
    }
  }

  destroy() {
    if (this.scroll) {
      console.log('destroy')
      this.scroll.destroy()
    }
  }
}
