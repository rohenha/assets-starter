/* ──────────────────────────────────────────────────────────
►►► Builder/utils/cleaner
────────────────────────────────────────────────────────── */
const del = require('del');
const gulp = require('gulp')
/* ─────────────────────────────────────────────────────── */
const config = require('../config')
/* ─────────────────────────────────────────────────────── */

let cleaner = {}

console.log(config.sprite.dist + config.sprite.name)

cleaner.clean = () => {
  return del(
    [
      config.dist + '/**/*',
      config.sprite.dist + '/' + config.sprite.name,
      '!.keep'
    ]
  );
}

cleaner.clean.displayName = 'clean'

module.exports = cleaner
