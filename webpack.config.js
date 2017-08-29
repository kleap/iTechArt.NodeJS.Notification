var path = require('path');
var webpack = require('webpack');

module.exports = {
	context: path.resolve(__dirname, 'src'),
	entry: './index.js',
	output: {
		path: path.join(__dirname, '/dist/js'),
		filename: 'bundle.js'
	},
	devServer: {
		port: 5000,
		contentBase: path.join(__dirname, "/dist"),
		historyApiFallback: true
	},
	module: {
		loaders: [
			{
				test: /.js?$/,
				loader: 'babel-loader',
				include: path.join(__dirname, 'src'),
				query: {
					presets: ['es2015', 'react','stage-0']
				}
			},
			{
				test: /\.css$/,
				loaders: ['style', 'css']
			}
		]
	},
};
