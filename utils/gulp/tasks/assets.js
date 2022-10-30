/* ──────────────────────────────────────────────────────────
►►► gulp/tasks/assets
────────────────────────────────────────────────────────── */
const gulp = require('gulp')
const plugins = require('gulp-load-plugins')()
const server = require('browser-sync').get('server')
/* ─────────────────────────────────────────────────────── */
const config = require('../config')
/* ─────────────────────────────────────────────────────── */

let assets = {}

assets.compiler = () => {
  return gulp
    .src(
      config.src + '/assets/**/*',
      {
        since: gulp.lastRun(
          assets.compiler
        )
      }
    )
    .pipe(
      plugins.if(
        config.env.isDev,
        plugins.plumber()
      )
    )
    .pipe(
      gulp.dest(
        config.dist
      )
    )
    .pipe(
      server.reload(
        {
          stream: true
        }
      )
    )
}

assets.watcher = () => {
  gulp
    .watch(
      config.src + '/assets/**/*',
      assets.compiler
    )
}

assets.compiler.displayName = 'assets-compiler'
assets.watcher.displayName = 'assets-watcher'

module.exports = assets
