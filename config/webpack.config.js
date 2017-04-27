const path = require('path')

const lintingLoader = {
	test: /\.js?$/,
	exlude: /node_modules/,
	loader: 'eslint'
}

const babelLoader = {
	test: /\.js?$/,
	exlude: /node_modules/,
	loader: 'babel-loader',
	query: {
		presets: ['es2015']
	}
}

module.exports = {
	entry: {
		entry: path.resolve(__dirname, '../src/js/entry.js'),
<<<<<<< HEAD
		adminCont: path.resolve(__dirname, '../src/js/adminCont.js')
=======
		// entry2: path.resolve(__dirname, '../src/js/entry2.js')
>>>>>>> #9-LoginForAdmin
	},
	output: {
		path: path.resolve(__dirname, '../public/js'),
		filename: '[name].js'
	},
	module: {
		preLoaders: [lintingLoader],
		loaders: [babelLoader]
	}
}
