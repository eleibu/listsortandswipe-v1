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
	.js('resources/js/why-lithium-list.js', 'public/js/why-lithium-list.js')
	.js('resources/js/pricing.js', 'public/js/pricing.js')
	.js('resources/js/login.js', 'public/js/login.js')
	.js('resources/js/signup.js', 'public/js/signup.js')
	.js('resources/js/reset.js', 'public/js/reset.js')
	.js('resources/js/activate.js', 'public/js/activate.js')
	.js('resources/js/terms.js', 'public/js/terms.js')
	.js('resources/js/resources.js', 'public/js/resources.js')
	.js('resources/js/about.js', 'public/js/about.js')
	.js('resources/js/support.js', 'public/js/support.js')
	.js('resources/js/errors.js', 'public/js/errors.js')
	.react('resources/js/examples-react.js', 'public/js/examples-react.js')
	.react('resources/js/console.js', 'public/js/console.js')
	.sass('resources/sass/home.scss', 'public/css/home.css').options({processCssUrls: false})
	.sass('resources/sass/documentation.scss', 'public/css/documentation.css').options({processCssUrls: false})
	.sass('resources/sass/examples.scss', 'public/css/examples.css').options({processCssUrls: false})
	.sass('resources/sass/why-lithium-list.scss', 'public/css/why-lithium-list.css').options({processCssUrls: false})
	.sass('resources/sass/pricing.scss', 'public/css/pricing.css').options({processCssUrls: false})
	.sass('resources/sass/console.scss', 'public/css/console.css').options({processCssUrls: false})
	.sass('resources/sass/auth.scss', 'public/css/auth.css').options({processCssUrls: false})
	.sass('resources/sass/signup.scss', 'public/css/signup.css').options({processCssUrls: false})
	.sass('resources/sass/activate.scss', 'public/css/activate.css').options({processCssUrls: false})
	.sass('resources/sass/login.scss', 'public/css/login.css').options({processCssUrls: false})
	.sass('resources/sass/reset.scss', 'public/css/reset.css').options({processCssUrls: false})
	.sass('resources/sass/terms.scss', 'public/css/terms.css').options({processCssUrls: false})
	.sass('resources/sass/resources.scss', 'public/css/resources.css').options({processCssUrls: false})
	.sass('resources/sass/about.scss', 'public/css/about.css').options({processCssUrls: false})
	.sass('resources/sass/support.scss', 'public/css/support.css').options({processCssUrls: false})
	.sass('resources/sass/errors.scss', 'public/css/errors.css').options({processCssUrls: false})
	.version();