/* ──────────────────────────────────────────────────────────
►►► Builder/index
────────────────────────────────────────────────────────── */
const colors = require('colors')
const gulp = require('gulp')
/* ─────────────────────────────────────────────────────── */
const config = require('./config')
const cleaner = require('./utils/cleaner')
const server = require('./utils/server')
const assets = require('./tasks/assets')
const images = require('./tasks/images')
const scripts = require('./tasks/scripts')
const sprite = require('./tasks/sprite')
const styles = require('./tasks/styles')
const views = require('./tasks/views')
/* ─────────────────────────────────────────────────────── */

function blue(msg) {
  console.log(colors.blue(msg))
}

console.log('')
blue('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
blue('►►► Project: ' + config.name)
blue('►►► Version ' + config.version)
blue('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('')

let builder = {}

builder.build = gulp.series(
  cleaner.clean,
  assets.compiler,
  images.compiler,
  scripts.compiler,
  sprite.compiler,
  styles.compiler
)

builder.start = gulp.series(
  builder.build,
  server.proxy,
  gulp.parallel(
    assets.watcher,
    images.watcher,
    scripts.watcher,
    styles.watcher,
    sprite.watcher,
    views.watcher
  )
)

module.exports = builder
