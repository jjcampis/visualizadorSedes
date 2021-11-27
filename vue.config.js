module.exports = {
  lintOnSave: false,
  devServer: {
    proxy:'http://r2d2.roboticamisiones.com/'
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/visualizadorSedes/'
    : '/',
    outputDir: 'docs'
};
