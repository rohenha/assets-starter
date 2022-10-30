/* ──────────────────────────────────────────────────────────
►►► gulp/tasks/images
────────────────────────────────────────────────────────── */
const gulp = require('gulp')
const server = require('browser-sync').get('server')
/* ─────────────────────────────────────────────────────── */
const config = require('../config')
/* ─────────────────────────────────────────────────────── */

let views = {}

views.compiler = () => {
  return gulp
    .src(
      config.twig,
    )
    .pipe(
      server.reload(
        {
          stream: true
        }
      )
    )
}

views.watcher = () => {
  gulp
    .watch(
      config.twig,
      views.compiler
    )
}

views.compiler.displayName = 'views-compiler'
views.watcher.displayName = 'views-watcher'

module.exports = views
