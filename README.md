# vite-plugin-upload

## 特性
- 支持又拍云

## 使用

```bash
npm i @jomsou/vite-plugin-upload -D
```

```js
// vite.config.ts
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
        filePath:  'xxx'                 
      })
    ]
  }
}
```