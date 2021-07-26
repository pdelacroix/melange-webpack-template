const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MelangeWebpackPlugin = require ('./melange-webpack-plugin')

module.exports = {
  entry: {
    index: './_build/default/src/Hello.bs.js'
  },
  plugins: [
    new MelangeWebpackPlugin({
			sourceDirs: [path.resolve(__dirname, 'src')]
    }),
    new HtmlWebpackPlugin({
      title: 'Melange basic template',
    }),
  ],
  stats: {
    logging: 'error',
    // loggingDebug: [/MelangeWebpackPlugin/]
  }
};
