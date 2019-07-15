console.log('环境--------' + process.env.NODE_ENV)
const Time = new Date().getTime();
module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/'
        : (process.env.NODE_ENV === 'test' ? '/' : '/'), // 打包输入的时候index.html前面加上了链接/
    devServer: {
        proxy: {
            '/api': {
                // target: 'https://beidou.hletong.com/',
                //  target: 'http://192.168.4.16:25084/',// 周杨
                //  target: 'http://192.168.4.16:25091/',// 佘慧
                 target: 'http://192.168.4.16:25092/',// 尹凯
                // target:'http://10.1.15.119:8202/',
                // target:'http://192.168.4.16:25083/',//liudongcai serve
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                },
                headers: {
                    // "Cookie": "__sid=623B92BA9CB54433A288E39FF0C3A0F6", // 超级管理员
                    // "Authorization":'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiV0VCUyJdLCJ1c2VyX2lkIjoxLCJ1c2VyX25hbWUiOiJhZG1pbiIsInNjb3BlIjpbImFsbCJdLCJleHAiOjE1NDIyODcxNDcsImF1dGhvcml0aWVzIjpbInN1cGVyIiwiYWRtaW4iXSwianRpIjoiYzJkOGRkYTAtZjAwNy00NDdjLTg4Y2EtMTgwMjRhOWJlZGI2IiwiY2xpZW50X2lkIjoiemhlbmctdXBtcy1zZXJ2ZXIifQ.cqfCHUn8zCcTpVK-BOBNnZE5mgaczaQhAXE3Kb2Mcss'
                }
            }
        }
    },
    lintOnSave: false,
    chainWebpack: config => {
        if(process.env.NODE_ENV === 'test'){
            config.output.filename(`[name].${Time}.[hash].js`).end();
        }
    }
}
