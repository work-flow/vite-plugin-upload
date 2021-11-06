# vite-plugin-upload

这是参考了[@shihao905/upload-upyun](https://github.com/shihao905/upload-upyun)项目，实现上传静态资源至又拍云，七牛云，阿里oss等的vite插件
## 特性
- 支持又拍云
- 支持七牛云
- 支持阿里oss

## 使用
### 安装
```bash
npm i @jomsou/vite-plugin-upload -D
```
### 配置

#### 公用参数

| 参数           | 说明                         | 类型     | 默认值      |
| -------------- | ---------------------------- | -------- | ----------- |
| remoteFilePath | 非必填，表示服务器远程路径   | string   |             |
| filePath       | 非必填，本地文件夹路径       | string   |             |
| openConfirm    | 非必填，是否打开上传前的提示 | boolean  | true        |
| success        | 非必填，上传成功回调         | Function | files => {} |
| error          | 非必填，上传失败回调         | Function | files => {} |



#### 又拍云
```js
// vite.config.[t|j]s
import { upyunPlugin } from '@jomsou/vite-plugin-upload'
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const isBuild = command === 'build';

  return {
    plugins: [
      isBuild && upyunPlugin({
        serviceName: 'xxx',
        operatorName: 'xxx',
        password: 'xxx',
        remoteFilePath: 'xxx',                                 
        filePath:  'xxx',
        openConfirm: false,                 
      })
    ]
  }
}
```

#### 七牛云
```js
// vite.config.[t|j]s
import { qiniuPlugin } from '@jomsou/vite-plugin-upload'
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const isBuild = command === 'build';

  return {
    plugins: [
      isBuild && qiniuPlugin({
        accessKey: 'xxx',
        secretKey: 'xxx',
        bucket: 'xxx',
        filePath: 'xxx',
        remoteFilePath: 'xxx',
        openConfirm: false,
      })                
    ]
  }
}
```

### 阿里oss
```js
// vite.config.[t|j]s
import { aliossPlugin } from '@jomsou/vite-plugin-upload'
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const isBuild = command === 'build';

  return {
    plugins: [
      isBuild && aliossPlugin({
        accessKeyId: '',
        secretAccessKey: '',
        endpoint: '',
        bucket: '',
        openConfirm: false,
        filePath: ''
      })         
    ]
  }
}
```

## 日志

- [x] 2021.10.24 支持又拍云
- [x] 2021.11.05 支持七牛云
- [x] 2021.11.06 支持阿里oss
