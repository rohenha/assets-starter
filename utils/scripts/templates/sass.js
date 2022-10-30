const colors = require('colors');
const config = require('../utils/config');
const createFile = require('create-file');
const open = require('../utils/open-file');


module.exports = (data) => {
  console.log('')
  console.log(`${colors.bgGrey(' SCSS ')} ${colors.grey(`Création du module ${colors.white(data.moduleName)}`)}`)
  // if(!filename || !type || !data.folders.includes(type)) {
  //   console.log(`${colors.bgRed(' SCSS ')} ${colors.red(`Le module ${colors.brightGreen(moduleName)} n\'a pas pu être créé`)}`)
  //   return false;
  // }
  const contentScss = `.${data.className} {

}
`;

  const scssFile = `${config.assets}styles/${data.type}/_${data.filename}.scss`;
  createFile(scssFile, contentScss, function (err) {});
  open(scssFile, 'Visual Studio Code');
  console.log(`${colors.bgGreen(' SCSS ')} ${colors.grey(`Le module ${colors.white(data.moduleName)} a bien été créé (${colors.white(scssFile)})`)}`);
  return true;
}