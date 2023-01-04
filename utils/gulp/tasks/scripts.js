/* ──────────────────────────────────────────────────────────
►►► gulp/tasks/scripts
────────────────────────────────────────────────────────── */
const gulp = require('gulp')
const plugins = require('gulp-load-plugins')()
const server = require('browser-sync').get('server')
const babelify = require('babelify')
const preprocess = require("gulp-preprocess")
const gulpBrotli = require('gulp-brotli')

/* ─────────────────────────────────────────────────────── */
const config = require('../config')
/* ─────────────────────────────────────────────────────── */

const scripts = {}

scripts.compiler = () => gulp
    .src([
      `${config.src}/scripts/site.js`,
    ])
    .pipe(preprocess())
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
                  '@babel/preset-env',
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
      plugins.if(
        config.env.isProd,
        gulpBrotli.compress({
          extension: 'br',
          skipLarger: true,
        })
      )
    )
    // .pipe(
    //   plugins.if(
    //     config.env.isProd,
    //     plugins.gzip({ deleteMode: 'public/asssets' })
    //   )
    // )
    .pipe(
      plugins.if(
        config.env.isProd,
        gulp.dest(
          config.dist
        )
      )
    )
    .pipe(
      server.reload(
        {
          stream: true
        }
      )
    )

scripts.watcher = () => {
  gulp
    .watch(
      `${config.src}/scripts/**/*.js`,
      scripts.compiler
    )
}

scripts.compiler.displayName = 'scripts-compiler'
scripts.watcher.displayName  = 'scripts-watcher'

module.exports = scripts
