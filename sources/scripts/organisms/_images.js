import LazyLoad from 'vanilla-lazyload'

const loadImages = (container, name, callback) => {
  const medias = container.querySelectorAll('.js-media')
  const state = {
    loaded: 0,
    toLoad: medias.length,
  }

  const promise = new Promise((resolve) => {
    const lazyLoad = new LazyLoad({
      container,
      elements_selector: '.js-media',
      cancel_onexit: 'false',
      threshold: 0,
      callback_loaded: () => {
        state.loaded += 1
        if (callback && typeof callback === 'function') {
          callback(state)
        }
      },
      callback_finish: () => {
        resolve()
        lazyLoad.destroy()
      },
    })
    setTimeout(() => {
      resolve()
    }, 4000)
    lazyLoad.loadAll()
  })
  return promise
}

export default loadImages
