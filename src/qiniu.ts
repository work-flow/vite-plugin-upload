import { QiuNiuUpload }from './core'
import { QINIU_OPTION_TYPE } from './types'

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