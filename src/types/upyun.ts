/**
 * @param {option} see: https://github.com/shihao905/upload-upyun
 */

type UPYUN_OPTION_TYPE = {
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
  /**
  * 上传服务器路径
  */
  remoteFilePath: string,
  /**
  * 本地文件夹路径
  */
  filePath: string,
  /**
  * 是否打开上传前的提示 默认打开
  */
  openConfirm?: boolean,
  /**
  * 上传成功回调
  * @param {array} files [成功文件列表]
  */
  success?: Function,
  /**
  * 上传失败回调
  * @param {array} files [失败文件列表]
  */
  error?: Function
}

export default UPYUN_OPTION_TYPE
