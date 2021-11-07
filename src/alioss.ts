import { AliOssUpload } from '@jomsou/upload'
import type { ALIOSS_OPTION_TYPE } from '@jomsou/upload'

export default function aliossPlugin (
  option: ALIOSS_OPTION_TYPE
) {
  return {
    name: 'alioss-plugin',
    closeBundle () {
      new AliOssUpload(option)
    }
  }
}