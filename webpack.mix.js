let mix = require('laravel-mix');

mix.js('src/js/main.js', 'dist/js/main.js')
	.sass('src/scss/style.scss', 'dist/css/main.css')
	.copyDirectory('src/img', 'dist/img');