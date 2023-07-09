const TerserPlugin = require('terser-webpack-plugin')
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://www.minjisd.com',
        pathRewrite: {
          '^/api': ''
        },
        ws: true,
        changeOrigin: true
      }
    },
    port: 8080
  },
  assetsDir: 'static',
  parallel: false,
  publicPath: './',
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(new TerserPlugin())
    }
  }
}