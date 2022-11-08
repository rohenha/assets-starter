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

## Gulp
### Javascript
- Gzip
- Minimify
### CSS
- Sass Glob (import folder)
- Minimify
- PostCSS 
  - Inline SVG
  - Purge CSS
  - Autoprefixer
  - Remove comments
  - Sourcemap

### Server
- Live reload

### Sprite
- Create Sprites

### Views
- Live reload


### Images
- Minimify
- Create thumbnails ?

### GLSL
- Create Glsl files for JS

### Assets
- Copy assets

## Vite
- [Plugin for Eleventy and Vite](https://www.11ty.dev/docs/server-vite/)
- [Checker for Es lint and Stylelint](https://github.com/fi3ework/vite-plugin-checker)
- [Use GLSL files](https://github.com/UstymUkhman/vite-plugin-glsl)
- [Generate critical style for inline](https://github.com/nystudio107/rollup-plugin-critical)
- [Progress bar to see progress of build](https://github.com/jeddygong/vite-plugin-progress)
- [Copy assets folder](https://github.com/mistjs/vite-plugin-copy-files)
- [Compression for GZIP](https://github.com/nonzzz/vite-compression-plugin)
- [Twig](https://github.com/vituum/vite-plugin-twig)
- [Sprite SVG](https://github.com/meowtec/vite-plugin-svg-sprite)
- [Post CSS for inline, sprite, autoprefixer, comments, sourcesmap, purgecss](https://github.com/postcss/postcss-load-config)
## Todo

- Try Vite if it can be more efficient than Gulp
- Try Webpack to supplant Gulp
- Implement Eleventy to generate static website
- Connect API
- Use PNPM

