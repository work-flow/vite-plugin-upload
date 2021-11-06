import fs from 'fs'
import upyun from 'upyun'
import { UPYUN_OPTION_TYPE } from '../types'
import Upload from './upload'
import { FILE_LIST_ITEM, UPLOAD_OPTION_TYPE } from '../types/core'
import fontColor from './styles'

const Upyun = upyun.Client
const Service = upyun.Service

class UpyunUpload extends Upload {
  serviceName: string
  operatorName: string
  password: string
  uploading: boolean
  constructor(opt: UPLOAD_OPTION_TYPE & UPYUN_OPTION_TYPE) {
    super(opt)
    const {
      serviceName,
      operatorName,
      password
    } = opt
    this.serviceName = serviceName || ''
    this.operatorName = operatorName || ''
    this.password = password || ''
    this.uploading = false
    this.openConfirm ? this.confirm(this.confirmFn, this.initFn) : this.init(this.uploadFile)
  }
  initFn = (input: string) => {
    if (this.uploading) return
    input = input.toString().trim()
    if (['Y', 'y', 'YES', 'yes'].indexOf(input) > -1) {
      this.uploading = true
      this.init(this.uploadFile, null, () => {
        this.uploading = false
        process.exit()
      })
    } else {
      process.exit()
    }
  }
  confirmFn = () => {
    console.log(fontColor.green, `---服务名：${this.serviceName}`)
    console.log(fontColor.green, `---操作员：${this.operatorName}`)
    console.log(fontColor.green, `---密码：${this.password}`)
    console.log(fontColor.green, `---本地文件夹路径：${this.filePath}`)
    console.log(fontColor.green, `---上传服务器路径：${this.remoteFilePath}`)
  }
  uploadFile = (file: FILE_LIST_ITEM, cb: Function) => {
    const client = new Upyun(new Service(this.serviceName, this.operatorName, this.password))
    client.putFile(file.key, fs.readFileSync(file.localFile)).then((res: unknown) => {
      cb(res)
    }).catch((error: Error)=> {
      console.log(fontColor.red, "上传失败：" + file.localFile)
      cb(false)
    })
  }
}

export default UpyunUpload
