module.exports = {
  lintOnSave: false,
  devServer: {
    proxy:'https://r2d2.roboticamisiones.com/'
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/dashboard/5'
    : '/',
    outputDir: 'docs'
};
