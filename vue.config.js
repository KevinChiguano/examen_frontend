const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/apiAutor': {
        target: 'http://localhost:9090',
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/apiAutor': '' },
      },
      '/apiLibro': {
        target: 'http://localhost:8090',
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/apiLibro': '' },
      },
    },
  },
})
