import utils from './utils'
import fontColor from './styles'
import ProgressBar from './progress'
import { FILE_LIST_ITEM, UPLOAD_OPTION_TYPE } from '../types/core'

interface IUpload {
  filePath: string
  remoteFilePath: string
  loadSuccess: Function
  loadError: Function
  openConfirm: boolean
  filesList: Array<FILE_LIST_ITEM>
  uploadFiles: Array<FILE_LIST_ITEM>
  errorFiles: Array<FILE_LIST_ITEM>
  confirm: (confirmFn: Function, init: Function) => void
  init: (uploadFile: Function, exit?: Function) => void
}

/**
 * 参考出处：https://github.com/shihao905/upload-upyun/blob/master/index.js
 */
class Upload implements IUpload {
  filePath: string
  remoteFilePath: string
  loadSuccess: Function
  loadError: Function
  openConfirm: boolean
  filesList: Array<FILE_LIST_ITEM>
  uploadFiles: Array<FILE_LIST_ITEM>
  errorFiles: Array<FILE_LIST_ITEM>
  constructor(option: UPLOAD_OPTION_TYPE) {
    const {
      filePath,
      remoteFilePath,
      success,
      error,
      openConfirm
    } = option
    this.filePath = filePath || ''
    this.remoteFilePath = remoteFilePath || ''
    this.loadSuccess = success || (() => { })
    this.loadError = error || (() => { })
    if (typeof openConfirm == 'boolean') {
      this.openConfirm = openConfirm
    } else {
      this.openConfirm = true
    }
    this.filesList = []
    this.uploadFiles = []
    this.errorFiles = []
  }
  confirm(confirmFn: Function, init: Function): void {
    process.stdin.setEncoding('utf8')
    console.log(fontColor.yellow, `请确认上传信息：`)
    confirmFn && confirmFn()
    console.log(fontColor.yellow, `确认开始上传吗(N/y)？`)
    process.stdin.on('data', (input: string) => {
      init && init(input)
    })
  }
  init(
    uploadFile?: Function | null, 
    getToken?: Function | null, 
    exit?: Function
  ): void {
    if (!uploadFile) return
    const cb = (list: Array<FILE_LIST_ITEM>) => {
      this.filesList = list
      if (!this.filesList.length) {
        console.log(fontColor.yellow, "未找到可以上传的文件")
        return
      }
      console.log(fontColor.yellow, "开始上传...")
      let pb = new ProgressBar("上传进度")
      this.filesList.map(file => {
        if (getToken) file.token = getToken(file.key)
        uploadFile(file, (res: unknown) => {
          this.uploadFiles.push(file)
          !res && this.errorFiles.push(file)
          pb.render({
            completed: this.uploadFiles.length,
            total: this.filesList.length
          })
          
          if (this.uploadFiles.length == this.filesList.length) {
            console.log(fontColor.green, "上传完成！")
            if (this.errorFiles.length) {
              console.log(fontColor.red, this.errorFiles.map((res: {
                localFile: string
              }) => (`上传失败：${res.localFile}`)).join('\n'))
              this.loadError(this.errorFiles)
            } else {
              this.loadSuccess(this.uploadFiles)
            }
            exit && exit()
          }
        })
      })
    }
    utils.getFileList(cb, this.filePath, this.remoteFilePath)
  }
}

export default Upload
