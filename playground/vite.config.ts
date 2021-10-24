import { 
  UserConfig, 
  ConfigEnv  
} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { upyunPlugin } from '../dist/index'

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const isBuild = command === 'build';

  return {
    plugins: [
      vue(),
      isBuild && upyunPlugin({
        serviceName: process.env.jr_UPYUN_SERVICE || '',
        operatorName: process.env.jr_UPYUN_OPERATOR || '',
        password: process.env.jr_UPYUN_PASSWD || '',
        remoteFilePath: '/huodong/2021/10/test-vite-plugins/assets',                                 
        filePath:  path.resolve(process.cwd(), 'dist/assets')                  
      })
    ]
  }
}
