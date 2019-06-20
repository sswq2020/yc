module.exports = {
  lintOnSave: false,
  devServer: {
        proxy: {
            '/api': {
                target: 'http://192.168.4.16:25089/',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                },
                headers: {}
            }
        }
    }
}