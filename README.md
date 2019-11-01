# hlet-jsj

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### 打包发布测试环境 命令执行不需要密码 因为是以root用户为密钥  默认是root
```
./deploy t  
```
### 打包发布业务测试环境 命令执行不需要密码 因为是以root用户为密钥  默认是root
```
./deploy y  
```

 ### 打包发布生产环境  命令执行需要密码share 因为是以share用户为密钥,root密钥没用.
./deploy pz  