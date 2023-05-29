const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  pwa: {
    workboxOptions: {
        skipWaiting: true
    }
},
  lintOnSave: false,
  devServer: {
    proxy:'https://r2d2.roboticamisiones.com/'
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/dashboard/test'
    : '/',
    outputDir: 'docs',
    configureWebpack: {
      plugins: [
        new HtmlWebpackPlugin({
          title: 'Dashboard-Red-Maker',
          hash: true,
          filename: './public/index.html',
          vue: true
        })
      ]
    }
};
