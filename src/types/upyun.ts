import { UPLOAD_OPTION_TYPE } from './core'

type UPYUN_OPTION_TYPE = UPLOAD_OPTION_TYPE & {
  /**
   * 上传的服务名
  */
  serviceName: string,
  /**
  * 操作员账号
  */
  operatorName: string,
  /**
  * 操作员密码
  */
  password: string,
}

export default UPYUN_OPTION_TYPE
