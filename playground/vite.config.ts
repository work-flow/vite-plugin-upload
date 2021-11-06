import { 
  UserConfig, 
  ConfigEnv  
} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { upyunPlugin, qiniuPlugin, aliossPlugin} from '../src/index'

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
      //   filePath: path.resolve(process.cwd(), 'dist/assets'),
      //   openConfirm: false,                 
      // })
      // isBuild && qiniuPlugin({
      //   accessKey: process.env.QINIU_ACCESSKEY || '',
      //   secretKey: process.env.QINIU_SECRETKEY || '',
      //   bucket: 'zeditor',
      //   filePath: path.resolve(__dirname, './dist'),
      //   remoteFilePath: '/dist',
      //   // openConfirm: false,
      // })
      isBuild && aliossPlugin({
        accessKeyId: process.env.ALIOSS_ACCESSKEYID || '',
        secretAccessKey: process.env.ALIOSS_SECRETACESSKEY || '',
        endpoint: process.env.ALIOSS_ENDPOINT || '',
        bucket: 'zeditor',
        openConfirm: false,
        filePath: path.resolve(__dirname, './dist')
      })
    ]
  }
}
