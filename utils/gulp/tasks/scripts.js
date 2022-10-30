/* ──────────────────────────────────────────────────────────
►►► gulp/tasks/scripts
────────────────────────────────────────────────────────── */
const gulp = require('gulp')
const plugins = require('gulp-load-plugins')()
const server = require('browser-sync').get('server')
var replace = require('gulp-string-replace')
const babelify = require('babelify')
/* ─────────────────────────────────────────────────────── */
const config = require('../config')
/* ─────────────────────────────────────────────────────── */

const scripts = {}

scripts.compiler = () => gulp
    .src([
      `${config.src}/scripts/site.js`,
      // `${config.src}/scripts/workers/ogl-controller.js`,
    ])
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
    // .pipe(replace(/process[.]env[.](.\w*)/g, (match, p1) => {
    //   for (const key in process.env) {
    //     if (Object.hasOwnProperty.call(process.env, key)) {
    //       if (p1 === key) {
    //         return `"${process.env[key]}"`;
    //       }
    //     }
    //   }
    //   return match;
    // }))
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
        plugins.gzip({ deleteMode: 'public/asssets' })
      )
    )
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
      `${config.src  }/scripts/**/*.js`,
      scripts.compiler
    )
}

scripts.compiler.displayName = 'scripts-compiler'
scripts.watcher.displayName  = 'scripts-watcher'

module.exports = scripts
