/* ──────────────────────────────────────────────────────────
►►► gulp/tasks/glsl
────────────────────────────────────────────────────────── */
const gulp = require('gulp')
var glslify = require("gulp-glslify");
const plugins = require('gulp-load-plugins')()
const server = require('browser-sync').get('server')
var replace = require('gulp-string-replace')
const babelify = require('babelify')
/* ─────────────────────────────────────────────────────── */
const config = require('../config')
/* ─────────────────────────────────────────────────────── */

const glslTask = {}

glslTask.compiler = () => gulp
  .src(
    `${config.src  }/shaders/*.glsl`
  )
  .pipe(glslify())
  .pipe(gulp.dest(
    `${config.src  }/scripts/shaders`
  ));

glslTask.watcher = () => {
  gulp
    .watch(
      `${config.src  }/shaders/*.glsl`,
      glslTask.compiler
    )
}

glslTask.compiler.displayName = 'glsl-compiler'
glslTask.watcher.displayName  = 'glsl-watcher'

module.exports = glslTask
