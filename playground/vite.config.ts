import { 
  UserConfig, 
  ConfigEnv  
} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { upyunPlugin, qiniuPlugin } from '../src/index'

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const isBuild = command === 'build';

  return {
    plugins: [
      vue(),
      // isBuild && upyunPlugin({
      //   serviceName: process.env.jr_UPYUN_SERVICE || '',
      //   operatorName: process.env.jr_UPYUN_OPERATOR || '',
      //   password: process.env.jr_UPYUN_PASSWD || '',
      //   remoteFilePath: '/huodong/2021/10/test-vite-plugins/assets',                                 
      //   filePath: path.resolve(process.cwd(), 'dist/assets')                  
      // })
      isBuild && qiniuPlugin({
        accessKey: process.env.QINIU_ACCESSKEY || '',
        secretKey: process.env.QINIU_SECRETKEY || '',
        scope: 'zeditor',
        file: path.resolve(__dirname, './dist/index.html'),
        fileName: 'index.html'
      })
    ]
  }
}
