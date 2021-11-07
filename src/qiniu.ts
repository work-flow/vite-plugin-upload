import { QiuNiuUpload } from '@jomsou/upload'
import type { QINIU_OPTION_TYPE } from '@jomsou/upload'

export default function qiniuPlugin (
  option: QINIU_OPTION_TYPE
) {
  return {
    name: 'qiniu-plugin',
    closeBundle () {
      new QiuNiuUpload(option)
    }
  }
}