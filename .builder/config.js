/* ──────────────────────────────────────────────────────────
►►► Builder/config
────────────────────────────────────────────────────────── */
const argv = require('yargs').argv
/* ─────────────────────────────────────────────────────── */
const package = require('../package.json')
/* ─────────────────────────────────────────────────────── */

// ► Configuration
module.exports = {
  name: package.name,
  version: package.version,
  env: {
    isDev: argv.env === 'dev',
    isProd: argv.env === 'prod'
  },
  src: './project/front/sources',
  dist: './public/assets',
  sprite: {
    dist: './project/front/snippets/includes',
    name: 'sprite.twig',
    mode: {
      symbol: {
        sprite: 'symbols',
        inline: true
      }
    },
    shape: {
      id: {
        generator: n => `icon-${n.slice(0, -4)}`
      }
    }
  },
  twig: [
    './project/front/snippets',
    './project/front/views'
  ]
}
