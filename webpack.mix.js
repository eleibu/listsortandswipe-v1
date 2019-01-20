const mix = require('laravel-mix');

mix.js('resources/js/home.js', 'public/js/home.js')
	.js('resources/js/docs.js', 'public/js/docs.js')
	.js('resources/js/docs.js', 'public/js/demos.js')
	.sass('resources/sass/home.scss', 'public/css/home.css').options({processCssUrls: false})
	.sass('resources/sass/docs.scss', 'public/css/docs.css').options({processCssUrls: false})
	.sass('resources/sass/demos.scss', 'public/css/demos.css').options({processCssUrls: false})
	.version();