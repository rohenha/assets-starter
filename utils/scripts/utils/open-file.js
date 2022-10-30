const open = require('open');

module.exports = async (file, app) => {
  await open(file, {app: {name: app }});
}