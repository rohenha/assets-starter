const APP_NAME = 'TROABY'
const DATA_API_KEY = '.data-api'

const html = document.documentElement
const { body } = document
const isDebug = html.hasAttribute('data-debug')

export { APP_NAME, DATA_API_KEY, html, body, isDebug }
