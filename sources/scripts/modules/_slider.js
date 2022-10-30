import { module as mmodule } from 'modujs'
import EmblaCarousel from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'
import { throttle } from '../utils/utils'

export default class Slider extends mmodule {
  constructor(m) {
    super(m)

    this.inView = ''
    this.plugins = []

    this.events = {
      click: {},
    }

    const viewport = this.$('viewport')
    const container = viewport[0] || this.el

    let options = this.setOptions()
    this.setAutoplay(options)
    options = this.setBreakpoints(options)

    this.slider = EmblaCarousel(container, options, this.plugins)

    this.setControls(options)
    this.setDots(options)

    this.onScroll = throttle(this.onScroll.bind(this), 50)
    this.slider.on('scroll', this.onScroll)
    this.slider.on('select', this.onScroll)
    this.onScroll()
  }

  setOptions() {
    const options = {
      loop: this.el.dataset.loop,
      controls: this.el.dataset.controls,
      dots: this.el.dataset.dots,
      autoplay: this.el.dataset.autoplay,
      direction: this.el.dataset.revert ? 'rtl' : 'ltr',
      startIndex: this.el.dataset.index ? Number(this.el.dataset.index) : 0,
      skipSnaps: false,
    }

    return options
  }

  setBreakpoints(options) {
    let { breakpoints } = this.el.dataset

    if (!breakpoints) {
      try {
        breakpoints = JSON.parse(breakpoints)
        options.breakpoints = breakpoints
      } catch (e) {
        console.warn('error parse')
        return options
      }
    }

    return options
  }

  setAutoplay(options) {
    if (options.autoplay) {
      const optionsAutoplay = {
        delay: Number(options.autoplay) * 1000,
        stopOnInteraction: true,
      }
      const autoplay = Autoplay(optionsAutoplay)
      this.plugins.push(autoplay)
    }
  }

  setControls(options) {
    if (options.controls) {
      this.disablePrevAndNextBtns = this.disablePrevAndNextBtns.bind(this)
      this.slider.on('select', this.disablePrevAndNextBtns)
      this.slider.on('init', this.disablePrevAndNextBtns)

      this.events.click.nextBtn = 'scrollNext'
      this.events.click.prevBtn = 'scrollPrev'

      this.scrollNext = this.slider.scrollNext
      this.scrollPrev = this.slider.scrollPrev
    }
  }

  setDots(options) {
    if (options.dots) {
      this.setSelectedDotBtn = this.setSelectedDotBtn.bind(this)
      this.events.click.dot = 'selectDotBtn'
      this.slider.on('select', this.setSelectedDotBtn)
      this.slider.on('init', this.setSelectedDotBtn)
      this.generateDotBtns()
    }
  }

  generateDotBtns() {
    const template = this.$('dotTemplate')[0].innerHTML
    const dotsContainer = this.$('dotsContainer')
    const dots = this.slider
      .scrollSnapList()
      .reduce((acc) => acc + template, '')
    dotsContainer[0].innerHTML = dots
    const dotsEls = this.$('dot')
    dotsEls.forEach((dot, index) => {
      dot.setAttribute('data-index', index)
    })
  }

  selectDotBtn(event) {
    const index = Number(event.currentTarget.dataset.index)
    this.slider.scrollTo(index)
  }

  setSelectedDotBtn() {
    const previous = this.slider.previousScrollSnap()
    const selected = this.slider.selectedScrollSnap()
    const dots = this.$('dot')
    dots[previous].classList.remove('-active')
    dots[selected].classList.add('-active')
  }

  disablePrevAndNextBtns() {
    const prevBtn = this.$('prevBtn')
    const nextBtn = this.$('nextBtn')

    if (this.slider.canScrollPrev()) {
      prevBtn[0].removeAttribute('disabled')
    } else {
      prevBtn[0].setAttribute('disabled', 'disabled')
    }

    if (this.slider.canScrollNext()) {
      nextBtn[0].removeAttribute('disabled')
    } else {
      nextBtn[0].setAttribute('disabled', 'disabled')
    }
  }

  onScroll() {
    const inView = this.slider.slidesInView()
    const inViewData = inView.join(',')
    if (this.inView === inViewData) {
      return
    }
    const slides = this.slider.slideNodes()
    let oldInView = this.inView.split(',')

    oldInView = oldInView.map((index) => Number(index))

    oldInView.forEach((index) => {
      const id = Number(index)
      if (!inView.includes(index)) {
        slides[id].classList.remove('-inView')
      }
    })

    inView.forEach((index) => {
      const id = Number(index)
      if (!oldInView.includes(id)) {
        slides[id].classList.add('-inView')
      }
    })
    this.inView = inViewData
  }
}
