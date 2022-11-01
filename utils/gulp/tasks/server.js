/* ──────────────────────────────────────────────────────────
►►► gulp/tasks/server
────────────────────────────────────────────────────────── */
const browserSync = require('browser-sync')

/* ─────────────────────────────────────────────────────── */
const config = require('../config')
/* ─────────────────────────────────────────────────────── */

let server = {}

server.instance = browserSync.create('server')

server.proxy = (done) => {
  server.instance.init(
    {
      proxy: config.server.url,
      baseDir: './',
      logLevel: 'silent',
      open: false,
      port: config.server.port
    }
  )
  done()
}

server.proxy.displayName = 'proxy'

module.exports = server
