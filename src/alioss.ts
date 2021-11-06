import { AliOssUpload }from './core'
import { ALIOSS_OPTION_TYPE } from './types'

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