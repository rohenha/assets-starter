/* ──────────────────────────────────────────────────────────
►►► Builder/tasks/images
────────────────────────────────────────────────────────── */
const gulp = require('gulp')
const plugins = require('gulp-load-plugins')()
const server = require('browser-sync').get('server')
/* ─────────────────────────────────────────────────────── */
const config = require('../config')
/* ─────────────────────────────────────────────────────── */

let images = {}

images.compiler = () => {
  return gulp
    .src(
      config.src + '/images/**/*.{gif,jpeg,jpg,png,svg}',
      {
        since: gulp.lastRun(
          images.compiler
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
      plugins.imagemin(
        {
          verbose: config.env.isDev
        }
      )
    )
    .pipe(
      gulp.dest(
        config.dist + '/images'
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

images.watcher = () => {
  gulp
    .watch(
      config.dist,
      images.compiler
    )
}

images.compiler.displayName = 'images-compiler'
images.watcher.displayName  = 'images-watcher'

module.exports = images
