/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
►►► Scripts/main
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
import modular from 'modujs'
import * as modules from './organisms/_modules'

// @ifdef DEBUG
console.log('debug')
// @endif

window.addEventListener('load', () => {
  const init = () => {
    console.log(
      '%cFait avec ❤️❤️❤️ par TROA',
      'font-size:10px;color:#AACBF4; background-color:#263069; padding:5px;'
    )
    // eslint-disable-next-line new-cap
    const manager = new modular({
      modules,
    })
    manager.init(manager)
  }

  const $style = document.getElementById('main-css')

  if (!$style) {
    console.warn('The "main-css" stylesheet not found')
    return
  }

  if ($style.isLoaded) {
    init()
  } else {
    $style.addEventListener('load', init)
  }
})
