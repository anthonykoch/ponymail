
module.exports =
{
	browserSync: {
		server: {
			baseDir: '_site'
		},
		notify: false,
		open: false,
		injectChanges: true,
		middleware: [require('compression')()]
	},
	sass:
	{
		src: '_resources/sass/**/*.{sass,scss}',
		dest: './assets/stylesheets',
		siteDest: './_site/assets/stylesheets',
		settings:
		{
			sass:
			{
				indentedSyntax: true,
			},
			autoprefixer: {
				browsers: ['last 3 versions']
			}
		}
	},
	js:
	{
		src: ['_resources/javascripts/**/*.js'],
		dest: './assets/javascripts',
		siteDest: './_site/assets/javascripts',
		settings:
		{
			jshint:
			{
				predef: ['console'],
				browser: true,
				browserify: true,
				esnext: true,
			},
		}
	}
};







