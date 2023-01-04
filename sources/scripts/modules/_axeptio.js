/* eslint-disable no-underscore-dangle */
import { module as mmodule } from 'modujs'
import { setScript } from '../utils/utils'

export default class Axeptio extends mmodule {
  constructor(m) {
    super(m)
    this.settings = {
      ga: {
        code: this.el.dataset.analytics,
        type: null,
        init: false,
      },
      axeptio: this.el.dataset.axeptio,
    }
    this.states = {
      google_analytics: false,
    }
    this.choices = {}
    window.axeptioSettings = {
      clientId: this.settings.axeptio,
      cookiesVersion: 'troa-base',
      userCookiesDuration: 30 * 6,
    }
    this.el.removeAttribute('data-analytics')
    this.el.removeAttribute('data-axeptio')

    // if (isDebug) {
    //   return
    // }
    setScript('https://static.axept.io/sdk.js')
    this.setAxeptioConfig()
  }

  setAxeptioConfig() {
    const nbOfDaysToWaitBeforeAskingAgain = 30 * 6
    window._axcb = window._axcb || []
    window._axcb.push((sdk) => {
      try {
        const json = sdk.userPreferencesManager.readChoicesFromCookies(
          'STYXKEY_axeptio_json'
        )
        if (json && json.$$date) {
          const acceptedAt = new Date(json.$$date)
          const now = new Date()
          if (
            (now.getTime() - acceptedAt.getTime()) / (1000 * 60 * 60) >
            nbOfDaysToWaitBeforeAskingAgain
          ) {
            window.openAxeptioCookies()
          }
        }
      } catch (err) {
        console.error(
          'Axeptio could not read previous choices nor parse consent date',
          err
        )
        window.openAxeptioCookies()
      }
    })

    window._axcb.push((axeptio) => {
      axeptio.on('cookies:complete', (choices) => {
        this.choices = choices
        window[`ga-disable-${this.settings.ga.code}`] =
          !choices.google_analytics
        if (choices.google_analytics) {
          this.setGA4()
        }
      })
    })
  }

  // eslint-disable-next-line complexity
  setGA() {
    if (this.states.google_analytics || !this.settings.ga.code) {
      return
    }
    const type = this.settings.ga.code.split('-')
    switch (type[0]) {
      case 'UA':
        this.setUniversalGA()
        break

      case 'GA':
      case 'G':
        this.setGA4()
        break

      default:
        this.setUniversalGA()
        break
    }
    this.states.google_analytics = true
    // gtag('js', new Date())
    // gtag('config', 'UA-234217-21', { anonymize_ip: true })
    // gtag('config', 'UA-234217-21', { link_attribution: true })
  }

  setUniversalGA() {
    /* eslint-disable */
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga')
    /* eslint-enable */
    window.ga('create', this.gaCode, 'auto')
    window.ga('send', 'pageview')
    window.ga('set', 'anonymizeIp', true)
    this.settings.ga.type = 'UA'
  }

  setGA4() {
    setScript(
      `https://www.googletagmanager.com/gtag/js?id=${this.settings.ga.code}`
    )

    window.dataLayer = window.dataLayer || []
    /* eslint-disable */
    window.gtag = function () {
      dataLayer.push(arguments)
    }
    /* eslint-enable */
    window.gtag('js', new Date())
    window.gtag('config', this.settings.ga.code)
    window.gtag('set', 'anonymizeIp', true)
    this.settings.ga.type = 'GTAG'
  }

  updateGaPage(url) {
    url = url || window.location.pathname
    if (this.choices.google_analytics) {
      if (this.settings.ga.type === 'UA') {
        window.ga('set', 'page', url)
        window.ga('send', 'pageview')
      }
      if (this.settings.ga.type === 'GTAG') {
        window.gtag('set', 'page_path', url)
        window.gtag('event', 'page_view')
      }
    }
  }
}
