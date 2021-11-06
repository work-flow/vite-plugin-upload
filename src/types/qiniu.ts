import { UPLOAD_OPTION_TYPE } from './core'

type QINIU_OPTION_TYPE = UPLOAD_OPTION_TYPE & {
  /**
   * AccessKey
  */
  accessKey: string,
  /**
   * SecretKey
  */
  secretKey: string,
  /**
   * 上传的空间
  */
  bucket: string,
}

export default QINIU_OPTION_TYPE
