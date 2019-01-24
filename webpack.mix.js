const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/home.js', 'public/js/home.js')
	.js('resources/js/documentation.js', 'public/js/documentation.js')
	.js('resources/js/examples.js', 'public/js/examples.js')
	.react('resources/js/examples-react.js', 'public/js/examples-react.js')
	.sass('resources/sass/home.scss', 'public/css/home.css').options({processCssUrls: false})
	.sass('resources/sass/documentation.scss', 'public/css/documentation.css').options({processCssUrls: false})
	.sass('resources/sass/examples.scss', 'public/css/examples.css').options({processCssUrls: false})
	.version();