const colors = require('colors');
const createFile = require('create-file');
const editFile = require("edit-file");
const open = require('../utils/open-file');
const config = require('../utils/config');

module.exports = (data) => {
  console.log('')
  console.log(`${colors.bgGrey(' JS ')} ${colors.grey(`Création du module ${colors.white(data.moduleName)}`)}`)
  // if(!data.filename || !data.type) {
  //   console.log(`${colors.bgRed(' JS ')} ${colors.red(`Le module ${colors.brightGreen(data.moduleName)} n\'a pas pu être créé`)}`)
  //   return false;
  // }
  
  const moduleNameJs = data.moduleName[0].toUpperCase() + data.moduleName.substring(1)
  const type = data.module ? "modules" : data.module;

  let content = "";
  if (data.module) {
    content = `import { module } from 'modujs'

export default class ${moduleNameJs} extends module {
  constructor(m) {
    super(m)
    this.events = {}
  }
}

  `
    } else {
      content = `export default class ${moduleNameJs} {
  constructor() {
  }
}
  `
  }
  const jsFile = `${config.assets}scripts/${type}/_${data.filename}.js`;
  createFile(jsFile, content, function (err) {});
  if (data.module) {
    editFile(`${config.assets}scripts/organisms/_modules.js`, text => {
      return text.trim() + `\nexport { default as ${moduleNameJs} } from '../modules/_${data.filename}'\n`
    })
  }
  open(jsFile, 'Visual Studio Code');
  console.log(`${colors.bgGreen(' JS ')} ${colors.grey(`Le module ${colors.white(data.moduleName)} a bien été créé (${colors.white(jsFile)})`)}`);
  return true;
}