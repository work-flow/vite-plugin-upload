import { UpyunUpload }from './core'
import { UPYUN_OPTION_TYPE } from './types'

export default function upyunPlugin (option: UPYUN_OPTION_TYPE) {
  return {
    name: 'upyun-plugin',
    closeBundle () {
      new UpyunUpload(option)
    }
  }
}
