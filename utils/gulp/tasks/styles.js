/* ──────────────────────────────────────────────────────────
►►► gulp/tasks/styles
────────────────────────────────────────────────────────── */
const gulp = require('gulp')
const plugins = require('gulp-load-plugins')()
const server = require('browser-sync').get('server')
const assets = require('postcss-assets')
const mqpacker = require('css-mqpacker')
const normalize = require('postcss-normalize')
const sassGlob = require('gulp-sass-glob')
const gulpBrotli = require('gulp-brotli')

/* ─────────────────────────────────────────────────────── */
const config = require('../config')
/* ─────────────────────────────────────────────────────── */

let styles = {}

styles.compiler = () => {
  return gulp
    .src(
      config.src + '/styles/site.scss',
      {
        sourcemaps: config.env.isDev
      }
    )
    .pipe(
      plugins.if(
        config.env.isDev,
        plugins.plumber()
      )
    )
    .pipe(
      plugins.sassGlob()
    )
    .pipe(
      plugins.sass(
        {
          outputStyle: 'compressed',
          includePaths: [
            './node_modules'
          ]
        }
      )
    )
    .pipe(
      plugins.postcss(
        [
          require("postcss-inline-svg"),
          assets(
            {
              basePath: config.src,
              loadPaths: [
                'assets/',
                'images/'
              ]
            }
          ),
          // mqpacker(
          //   {
          //     sort: true
          //   }
          // ),
          normalize()
        ]
      )
    )
    .pipe(
      plugins.autoprefixer()
    )
    .pipe(
      plugins.if(
        config.env.isProd,
        plugins.cssnano(
          {
            preset: [
              'default',
              {
                discardComments: {
                  removeAll: true,
                }
              }
            ]
          }
        )
      )
    )
    .pipe(
      gulp.dest(
        config.dist,
        {
          sourcemaps: config.env.isDev
        }
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
          config.dist,
          {
            sourcemaps: config.env.isDev
          }
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
}

styles.watcher = () => {
  gulp
    .watch(
      config.src + '/styles/**/*.scss',
      styles.compiler
    )
}

styles.compiler.displayName = 'styles-compiler'
styles.watcher.displayName  = 'styles-watcher'

module.exports = styles
