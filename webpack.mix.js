const mix = require('laravel-mix');

mix.js('resources/js/site.js', 'public/js/site.js')
	.js('resources/js/lithiumlist-pro-1.0.0.js', 'public/js/lithiumlist-pro-1.0.0.js')
	.sass('resources/sass/site.scss', 'public/css/site.css').options({processCssUrls: false})
	.version();