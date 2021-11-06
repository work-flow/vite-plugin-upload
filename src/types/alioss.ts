import { UPLOAD_OPTION_TYPE } from './core'

type ALIOSS_OPTION_TYPE = UPLOAD_OPTION_TYPE & {
  /**
   * 上传的accessKeyId
  */
  accessKeyId: string,
  /**
   * 上传的secretAccessKey
  */
  secretAccessKey: string,
  /**
   * 地域节点
  */
  endpoint: string,
  /**
   * api版本
  */
  apiVersion?: string,
  /**
   * 上传的空间
  */
  bucket: string
}

export default ALIOSS_OPTION_TYPE
