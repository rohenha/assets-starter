/* ──────────────────────────────────────────────────────────
►►► Builder/tasks/scripts
────────────────────────────────────────────────────────── */
const gulp = require('gulp')
const plugins = require('gulp-load-plugins')()
const server = require('browser-sync').get('server')
const babelify = require('babelify')
/* ─────────────────────────────────────────────────────── */
const config = require('../config')
/* ─────────────────────────────────────────────────────── */

let scripts = {}

scripts.compiler = () => {
  return gulp
    .src(
      config.src + '/scripts/app.js'
    )
    .pipe(
      plugins.if(
        config.env.isDev,
        plugins.plumber()
      )
    )
    .pipe(
      plugins.bro(
        {
          debug: config.env.isDev,
          transform: [
            babelify.configure(
              {
                presets: [
                  '@babel/preset-env'
                ]
              }
            )
          ]
        }
      )
    )
    .pipe(
      plugins.if(
        config.env.isProd,
        plugins.uglify()
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

scripts.watcher = () => {
  gulp
    .watch(
      config.src + '/scripts/**/*.js',
      scripts.compiler
    )
}

scripts.compiler.displayName = 'scripts-compiler'
scripts.watcher.displayName  = 'scripts-watcher'

module.exports = scripts
