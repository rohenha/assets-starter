import { module as mmodule } from 'modujs'

export default class Form extends mmodule {
  constructor(m) {
    super(m)
    this.errors = {}
    this.state = false
    this.containerScroll = window
    this.loading = false
    this.events = {
      click: {
        callback: 'closeCallback',
        submit: 'onSearch',
      },
    }
  }

  init() {
    this.initRecaptcha()
  }

  destroy() {
    clearInterval(this.interval)
  }

  initRecaptcha() {
    const recaptchaInput = this.$('recaptcha')[0]
    this.recaptchaKey = recaptchaInput.dataset.key
    if (this.recaptchaKey) {
      recaptchaInput.removeAttribute('data-key')
      this.interval = setInterval(this.setRecaptcha.bind(this), 119 * 1000)
      this.setRecaptcha()
    }
  }

  setRecaptcha() {
    const recaptchaInput = this.$('recaptcha')[0]
    grecaptcha
      .execute(this.recaptchaKey, {
        action: 'homepage',
      })
      .then((token) => {
        recaptchaInput.value = token
      })
  }

  onSearch(e) {
    e.currentTarget.blur()
    if (this.el.checkValidity()) {
      e.preventDefault()
      this.sendForm(this.el)
    }
  }

  sendForm(form) {
    this.cleanErrors()
    this.openCallback()
    this.loading = true
    this.state = null
    const data = new FormData(this.el)
    fetch(form.action, data, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      responseType: 'json',
    })
      .then(this.formSent.bind(this))
      .catch(this.errorForm.bind(this))
  }

  openCallback() {
    // const callback = this.$('callback')[0]
    this.el.classList.add('-loading')
    this.el.classList.add('-active')
  }

  updateCallback(message) {
    // const callback = this.$('callback')[0]
    const callbackMessage = this.$('callbackMessage')[0]
    callbackMessage.innerHTML = message
    this.el.classList.remove('-loading')
    this.timeoutCallback()
  }

  closeCallback() {
    if (this.loading) {
      return
    }
    // const callback = this.$('callback')[0]
    this.el.classList.remove('-active')
    this.el.classList.remove('-loading')
    clearTimeout(this.timeoutCallbackId)
    if (this.state) {
      this.afterFormSent()
    }
  }

  cleanErrors() {
    const errors = this.$('invalid')
    errors.forEach((error) => {
      const parent = error.parentNode
      parent.classList.remove('-error')
      error.remove()
    })
  }

  formSent(response) {
    if (response.data.invalid) {
      this.errorForm(response)
      return
    }
    this.state = true
    this.updateCallback(response.data.message)
    this.setRecaptcha()
  }

  errorForm(error) {
    const { data } = error.response ? error.response : error
    this.updateCallback(data.message)
    this.state = false
    this.setRecaptcha()
    if (data.invalid) {
      this.setErrors(data.invalid)
    }
  }

  setErrors(invalid) {
    this.errors = invalid
    let scroll = 0
    const elements = Array.from(Object.entries(invalid))
    elements.forEach(([key, value], index) => {
      const el = this.$(key)[0]
      if (el) {
        const errorEl = document.createElement('p')
        errorEl.innerHTML = value
        el.classList.add('-error')
        errorEl.setAttribute('class', 'a-p -small a-inputField__error')
        errorEl.setAttribute(this.mAttr, 'invalid')
        el.append(errorEl)
        if (index === 0) {
          scroll = window.scrollY + el.getBoundingClientRect().top - 300
        }
      }
    })

    this.containerScroll.scrollTo({
      top: scroll,
      left: 0,
      behavior: 'smooth',
    })
  }

  timeoutCallback() {
    clearTimeout(this.timeoutCallbackId)
    this.loading = false
    this.timeoutCallbackId = setTimeout(() => {
      this.closeCallback()
      // if (this.state) {
      //   this.afterFormSent()
      // }
    }, 6000)
  }

  afterFormSent() {}
}
