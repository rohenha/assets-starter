# Troaster for Troa Projects with Atomic Design

For more informations about [Atomic Design](https://www.usabilis.com/atomic-design/)

## Technologies

- SCSS
- JS ES6
- Gulp
- VS Code
- Prettier
- Stylelint
- Eslint

## Stylesheets

For the stylesheets class naming convention and we will use the [ABEM](https://css-tricks.com/abem-useful-adaptation-bem/) (which is an adaptation of BEM with atomic design)

## Javascript

For Javascript we use the [ModuJs library](https://github.com/modularorg/modularjs) from Modularorg to use classes as modules, and have an easier way to manage components

## SCSS Lint

To lint SCSS, we will use the [stylelint](https://stylelint.io/) extension.
To enable, you need to install it, search 'stylelint'.
After that, you will need to install globally stylelint 
```shell
yarn add global stylelint
yarn add global stylelint-order
```
Then to be used in the project you need to add the stylelint.config.js file in the root folder or your project, and then when you wil save a SCSS file, the linter will search errors in it

## ES Lint

To lint js we will use [ESLint](https://eslint.org/).
To work, it need to be installed on vscode.
After that, we will need to install in global eslint
```shell
yarn add global eslint
```
Then, Eslint will search a config file (.eslintrc.yml) and trim all js files with the configuration.

## Todo
