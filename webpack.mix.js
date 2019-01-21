const mix = require('laravel-mix');

mix.js('resources/js/home.js', 'public/js/home.js')
	.js('resources/js/documentation.js', 'public/js/documentation.js')
	.js('resources/js/examples.js', 'public/js/examples.js')
	.sass('resources/sass/home.scss', 'public/css/home.css').options({processCssUrls: false})
	.sass('resources/sass/documentation.scss', 'public/css/documentation.css').options({processCssUrls: false})
	.sass('resources/sass/examples.scss', 'public/css/examples.css').options({processCssUrls: false})
	.version();