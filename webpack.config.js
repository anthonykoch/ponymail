'use strict';

var webpack = require('webpack');




var config = {
	js: {
		dest: __dirname + '\\assets\\javascripts',
		out: {
			filename: 'app.js'
		},
	}
};

var vendors = {
	'events': 'events',
	'store': require.resolve('store/store.js'),
	'react': require.resolve('react'),
	'react-dom': require.resolve('react/lib/ReactDOM'),
	'react-router': require.resolve('react-router'),
	'moment': require.resolve('moment'),
	'flux': require.resolve('flux'),
	'history': __dirname + ('/node_modules/history'),
	'polyfill': require.resolve('babel-core/polyfill')
};




var webpackConfig = {
	// This function will do the setup of the vendors file
	// http://christianalfoni.github.io/javascript/2014/12/13/did-you-know-webpack-and-react-is-awesome.html
	addVendors: function () {
		for (var name in vendors) {
			var path = vendors[name];
			this.resolve.alias[name] = path;
			this.module.noParse.push(new RegExp('^' + name + '$'));
			this.entry['vendor.js'].push(name);
		}
	},
	entry:
	{
		// Creates an app.js file
		app: [
			'./_resources/javascripts/main.js',
		],
		// Creates a vendors.js file
		'vendor.js': [],
	},
	resolve:
	{
		alias: {
		}
	},
	output:
	{
		path: config.js.dest,
		publicPath: "/assets/javascripts/",
		filename: config.js.out.filename,
	},
	module:
	{
		noParse: [],
		loaders: [
			{ test: "\.html$", loader: "file-loader" },
			{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
		],
	},
	plugins:
	[
		new webpack.optimize.CommonsChunkPlugin('vendor.js', 'vendor.js'),
		new webpack.optimize.DedupePlugin(),
		new webpack.DefinePlugin({
		  'process.env': {
				NODE_ENV: '"development"',
				__DEV__: 'true'
			}
		})
	],
	watch: true,
}

webpackConfig.addVendors();




module.exports = webpackConfig;