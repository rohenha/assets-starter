const colors = require('colors');
const config = require('../utils/config');
const createFile = require('create-file');
const open = require('../utils/open-file');

module.exports = (data) => {
  console.log('')
  console.log(`${colors.bgGrey(' HTML ')} ${colors.grey(`Création du module ${colors.white(data.moduleName)}`)}`)
  // if(!data.filename || !data.type) {
  //   console.log(`${colors.bgRed(' HTML ')} ${colors.red(`Le module ${colors.brightGreen(data.moduleName)} n\'a pas pu être créé`)}`)
  //   return false;
  // }

  const contentDiv = `<div class="${data.className}"${data.module ? ` data-module-${data.filename}` : ''}></div>`;

  const htmlFile = `${config.snippets}${data.type}/${data.filename}.twig`;
  
  createFile(htmlFile, contentDiv, function (err) {});
  open(htmlFile, 'Visual Studio Code');

  console.log(`${colors.bgGreen(' HTML ')} ${colors.grey(`Le module ${colors.white(data.moduleName)} a bien été créé (${colors.white(htmlFile)})`)}`);



  return true;
}