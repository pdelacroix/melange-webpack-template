const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MelangeWebpackPlugin = require ('./melange-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    index: './_build/default/src/Hello.bs.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    host: '0.0.0.0',
    //contentBase: './dist'
 },
  plugins: [
    new MelangeWebpackPlugin({
			sourceDirs: [__dirname + '/src']
    }),
    new HtmlWebpackPlugin({
      title: 'Melange basic template',
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  stats: {
    logging: 'error',
    // loggingDebug: [/MelangeWebpackPlugin/]
  }
};
