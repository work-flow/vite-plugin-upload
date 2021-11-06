export type UPLOAD_OPTION_TYPE = {
  /**
  * 表示服务器远程路径
  */
  remoteFilePath?: string,
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
