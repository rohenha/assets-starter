import { module as mmodule } from 'modujs'
import { body } from '../utils/environment'

const FOCUSABLE_ELEMENTS = [
  'a[href]',
  'area[href]',
  'button:not([aria-disabled="true"])',
  'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
  'select:not([disabled]):not([aria-hidden])',
  'textarea:not([disabled]):not([aria-hidden])',
  'button:not([disabled]):not([aria-hidden])',
  'iframe',
  'object',
  'embed',
  '[contenteditable]',
  '[tabindex]:not([tabindex^="-"])',
]

export default class Popin extends mmodule {
  constructor(m) {
    super(m)
    this.visible = false
    this.config = {
      disableScroll: true,
    }
    this.open = this.change.bind(this, true)
    this.close = this.change.bind(this, false)
    this.onKeyDown = this.onKeyDown.bind(this)
    const popin = this.$('popin')[0]
    this.popin = popin
    body.appendChild(this.popin)
  }

  scrollBehaviour(state) {
    if (!this.config.disableScroll) return
    Object.assign(body.style, { overflow: state ? 'hidden' : '' })
  }

  toggleEvents(state) {
    const closeEls = this.$('close', this.popin)
    const functionName = state ? 'add' : 'remove'
    closeEls.forEach((element) => {
      element[`${functionName}EventListener`]('touchstart', this.close, {
        passive: true,
      })
      element[`${functionName}EventListener`]('click', this.close, {
        passive: true,
      })
    })
    document[`${functionName}EventListener`]('keydown', this.onKeyDown)
  }

  onKeyDown(event) {
    if (event.keyCode === 27) {
      this.close() // esc
    }
    if (event.keyCode === 9) {
      this.retainFocus(event) // tab
    }
  }

  getFocusableNodes() {
    const nodes = this.popin.querySelectorAll(FOCUSABLE_ELEMENTS)
    return Array(...nodes)
  }

  retainFocus(event) {
    let focusableNodes = this.getFocusableNodes()
    // no focusable nodes
    if (focusableNodes.length === 0) return

    /**
     * Filters nodes which are hidden to prevent
     * focus leak outside modal
     */
    focusableNodes = focusableNodes.filter((node) => node.offsetParent !== null)

    // if disableFocus is true
    if (!this.popin.contains(document.activeElement)) {
      focusableNodes[0].focus()
    } else {
      const focusedItemIndex = focusableNodes.indexOf(document.activeElement)

      if (event.shiftKey && focusedItemIndex === 0) {
        focusableNodes[focusableNodes.length - 1].focus()
        event.preventDefault()
      }

      if (
        !event.shiftKey &&
        focusableNodes.length > 0 &&
        focusedItemIndex === focusableNodes.length - 1
      ) {
        focusableNodes[0].focus()
        event.preventDefault()
      }
    }
  }

  setFocusToFirstNode() {
    const focusableNodes = this.getFocusableNodes()

    if (focusableNodes.length === 0) {
      return
    }
    // remove nodes on whose click, the modal closes
    // could not think of a better name :(
    const nodesWhichAreNotCloseTargets = focusableNodes.filter(
      (node) => !node.hasAttribute('data-popin')
    )
    if (nodesWhichAreNotCloseTargets.length > 0) {
      nodesWhichAreNotCloseTargets[0].focus()
    } else {
      focusableNodes[0].focus()
    }
  }

  destroy() {
    this.popin.remove()
  }

  toggle() {
    this.change(!this.state)
  }

  change(state) {
    if (this.visible === state) {
      return
    }
    this.visible = state
    this.scrollBehaviour(this.visible)
    this.toggleEvents(this.visible)
    this.popin.setAttribute('aria-hidden', !this.visible)
    this.call('toggle', !this.visible, 'Scroll')
    if (this.visible) {
      const content = this.$('content', this.popin)[0]
      if (content) {
        content.scrollTo({
          top: 0,
          left: 0,
        })
      }
      this.setFocusToFirstNode()
    }
  }
}
