const fs = require('fs')
const path = require('path')

const env = process.env.NODE_ENV
let fileName
if (env === "production") {
    fileName = 'pro_index.html';
} else if (env === "ywtest") {
    fileName = 'yw_index.html';
}


fs.readFile(fileName, 'utf8', function (err, files) {
    var result = files.replace(/href=["'].*\.css.*?["']/g, txt => {
        // 去掉最后一个字符串
        var str = txt.substr(0, txt.length - 1);
        var txts = str.split('?');
        return `${txts[0]}?_t=${new Date().getTime()}"`
    });
    result = result.replace(/src=["'].*\.js.*?["']/g, txt => {
        // 去掉最后一个字符串
        var str = txt.substr(0, txt.length - 1);
        var txts = str.split('?');
        return `${txts[0]}?_t=${new Date().getTime()}"`
    });

    fs.writeFile(fileName, result, 'utf8', function (err) {
        if (err) return console.log(err);
    });
})

