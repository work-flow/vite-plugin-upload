import { UpyunUpload }from '@jomsou/upload'
import type { UPYUN_OPTION_TYPE } from '@jomsou/upload'

export default function upyunPlugin (
  option: UPYUN_OPTION_TYPE
) {
  return {
    name: 'upyun-plugin',
    closeBundle () {
      new UpyunUpload(option)
    }
  }
}
