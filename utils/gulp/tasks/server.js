/* ──────────────────────────────────────────────────────────
►►► gulp/tasks/server
────────────────────────────────────────────────────────── */
const browserSync = require('browser-sync')
/* ─────────────────────────────────────────────────────── */

let server = {}

server.instance = browserSync.create('server')

server.proxy = (done) => {
  server.instance.init(
    {
      proxy: 'troaby.vm',
      baseDir: './',
      logLevel: 'silent',
      open: false,
      port: 3000
    }
  )
  done()
}

server.proxy.displayName = 'proxy'

module.exports = server
