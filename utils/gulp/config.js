/* ──────────────────────────────────────────────────────────
►►► gulp/config
────────────────────────────────────────────────────────── */
const argv = require('yargs').argv
/* ─────────────────────────────────────────────────────── */
const package = require('../../package.json')
/* ─────────────────────────────────────────────────────── */

// ► Configuration
module.exports = {
  name: package.name,
  version: package.version,
  env: {
    isDev: argv.env === 'dev',
    isProd: argv.env === 'prod'
  },
  src: './sources',
  dist: './views/assets',
  server: {
    url: 'starter.vm',
    port: 3000
  },
  sprite: {
    dist: './views',
    name: 'sprite.html',
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
    './views'
  ]
}
