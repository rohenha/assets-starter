# Starter assets for Troa Projects with Atomic Design

For more informations about [Atomic Design](https://www.usabilis.com/atomic-design/)

## Technologies

- SCSS
- JS ES6
- Gulp
- VS Code
- CSS Comb or Prettier

## Stylesheets

For the stylesheets class naming convention and we will use the [ABEM](https://css-tricks.com/abem-useful-adaptation-bem/) (which is an adaptation of BEM with atomic design)

## Javascript

## CSS Comb

CSS comb is an extension for VS Code to beautify the css and rearrange it with some rules.
To enable, you need to install it, search 'csscomb'.
then you need to configure it. To do that, copy the csscomb.json file and paste it in the settings.json file of VS Code.

Then when you will save your scss or sass file it will beautify it without effort.

## SCSS Lint

To lint SCSS, we will use the [stylelint](https://stylelint.io/) extension.
To enable, you need to install it, search 'stylelint'.
Then to be used in the project you need to add the stylelint.config.js file in the root folder or your project, and then when you wil save a SCSS file, the linter will search errors in it

## ES Lint

To lint js we will use [ESLint](https://eslint.org/).
To work, it need to be installed on vscode. After that, Eslint will search a config file (.eslintrc.yml) and trim all js files with the configuration.

## Todo

- See to implement [stylelint-order](https://github.com/hudochenkov/stylelint-order)
