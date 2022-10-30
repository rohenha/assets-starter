/* ──────────────────────────────────────────────────────────
►►► gulp/tasks/sprite
────────────────────────────────────────────────────────── */
const gulp = require('gulp')
const plugins = require('gulp-load-plugins')()
const server = require('browser-sync').get('server')
/* ─────────────────────────────────────────────────────── */
const config = require('../config')
/* ─────────────────────────────────────────────────────── */

let sprite = {}

sprite.compiler = () => {
  return gulp
    .src(
      config.src + '/sprite/*.svg'
    )
    .pipe(
      plugins.if(
        config.env.isDev,
        plugins.plumber()
      )
    )
    .pipe(
      plugins.svgSprite(
        config.sprite
      )
    )
    .pipe(
      plugins.rename(
        config.sprite.name
      )
    )
    .pipe(
      gulp.dest(
        config.sprite.dist
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

sprite.watcher = () => {
  gulp
    .watch(
      config.src + '/sprite/*.svg',
      sprite.compiler
    )
}

sprite.compiler.displayName = 'sprite-compiler'
sprite.watcher.displayName  = 'sprite-watcher'

module.exports = sprite
