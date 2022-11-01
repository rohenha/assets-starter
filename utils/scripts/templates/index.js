const colors = require('colors');
const toModuleName = require('../utils/to-module');
const config = require('../utils/config');
const slugify = require('../utils/slugify');
const { prompt } = require('enquirer');
const createHTML = require('./html');
const createJS = require('./javascript');
const createSASS = require('./sass');

const questions = [
  {
    type: 'input',
    name: 'filename',
    message: 'Quel est le nom du module ?'
  },
  {
    type: 'select',
    name: 'type',
    message: 'Quel est le type du module ?',
    choices: config.folders
  },
  {
    type: 'confirm',
    name: 'html',
    message: 'Intégrer partie HTML ?'
  },
  {
    type: 'confirm',
    name: 'js',
    message: 'Intégrer partie JS ?'
  },
  {
    type: 'confirm',
    name: 'sass',
    message: 'Intégrer partie SASS ?'
  },
];

const questionsJS = [
  {
    type: 'confirm',
    name: 'module',
    message: 'Le fichier JS est-il un module ?'
  },
]

console.log('')
console.log(colors.blue('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'))
console.log(`${colors.bgBlue(' INITIALISATION ')} ${colors.white('Création d\'un module')}`)
console.log(colors.blue('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'))
console.log('')

const createContent = (data) => {
  if(data.js) {
    createJS(data);
  }

  if(data.html) {
    createHTML(data);
  }
  if(data.sass) {
    createSASS(data);
  }
  console.log(colors.green(''))
  console.log(colors.green('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'))
  console.log(`${colors.bgGreen(' SUCCES ')} ${colors.white(`Le module ${colors.green(data.moduleName)} a bien été créé`)}`)
  console.log(colors.green('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'))
  console.log(colors.green(''))
}

prompt(questions).then((data) => {
  data.filename = slugify(data.filename);
  data.moduleName = toModuleName(data.filename);
  data.className = `${data.type[0].toLowerCase()}-${data.moduleName}`;
  if(!data.filename || !data.type) {
    console.log(`${colors.bgRed(' ERREUR ')} ${colors.red(`Le module ${colors.grey(data.moduleName)} n\'a pas pu être créé`)}`)
    return false;
  }

  if(data.js) {
    prompt(questionsJS).then((dataJS) => {
      data.module = dataJS.module
      createContent(data)
    })
  } else {
    createContent(data)
  }

});
