import qiniu from 'qiniu'
import { QINIU_OPTION_TYPE } from '../types'
import Upload from './upload'
import { FILE_LIST_ITEM, UPLOAD_OPTION_TYPE } from '../types/core'
import fontColor from './styles'
class QiuNiuUpload extends Upload {
  opt: UPLOAD_OPTION_TYPE | QINIU_OPTION_TYPE 
  bucket: string
  uploadPath: string
  fileDirectory: string
  token: string
  uploading: boolean
  constructor (opt: UPLOAD_OPTION_TYPE & QINIU_OPTION_TYPE ) {
    super(opt)
    this.opt = opt
    qiniu.conf.ACCESS_KEY = opt.accessKey || ''
    qiniu.conf.SECRET_KEY = opt.secretKey || ''
    this.bucket = opt.bucket || ''
    this.uploadPath = opt.remoteFilePath || ''
    this.fileDirectory = opt.filePath || ''
    this.token = ''
    this.uploading = false
    this.openConfirm ? this.confirm(this.confirmFn, this.initFn) : this.init(this.uploadFile, this.getToken)
  }
  initFn = (input: string) => {
    if (this.uploading) return
    input = input.toString().trim()
    if (['Y', 'y', 'YES', 'yes'].indexOf(input) > -1) {
      this.uploading = true
      this.init(this.uploadFile, this.getToken, () => {
        this.uploading = false
        process.exit()
      })
    } else {
      process.exit()
    }
  }
  confirmFn = () => {
    console.log(fontColor.green, `---ACCESS_KEY：${qiniu.conf.ACCESS_KEY}`)
    console.log(fontColor.green, `---SECRET_KEY：${qiniu.conf.SECRET_KEY}`)
    console.log(fontColor.green, `---上传空间：${this.bucket}`)
    console.log(fontColor.green, `---空间文件目录：${this.uploadPath}`)
    console.log(fontColor.green, `---本地文件目录：${this.fileDirectory}`)
  }
  getToken = (key: string) => {
    let putPolicy = new qiniu.rs.PutPolicy({
      scope: `${this.bucket}:${key}`
    })
    return putPolicy.uploadToken()
  }
  uploadFile = (file: FILE_LIST_ITEM, cb: Function) => {
    let formUploader = new qiniu.form_up.FormUploader()
    let extra = new qiniu.form_up.PutExtra()
    formUploader.putFile(
      file.token || '',
      file.key,
      file.localFile,
      extra,
      (err, ret) => {
        cb && cb(err, ret)
      }
    )
  }
}

export default QiuNiuUpload
