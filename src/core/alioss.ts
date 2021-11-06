import ALY from 'aliyun-sdk' 
import OssUploadStream from 'aliyun-oss-upload-stream'
import fs from 'fs'
import { ALIOSS_OPTION_TYPE } from '../types'
import Upload from './upload'
import { FILE_LIST_ITEM, UPLOAD_OPTION_TYPE } from '../types/core'
import fontColor from './styles'

class AliOssUpload extends Upload {
  accessKeyId: string
  secretAccessKey: string
  endpoint: string
  apiVersion: string
  bucket: string
  uploading: boolean
  constructor(opt: UPLOAD_OPTION_TYPE & ALIOSS_OPTION_TYPE) {
    super(opt)
    const {
      accessKeyId,
      secretAccessKey,
      endpoint,
      apiVersion,
      bucket,
    } = opt
    this.accessKeyId = accessKeyId || ''
    this.secretAccessKey = secretAccessKey || ''
    this.endpoint = endpoint || ''
    this.apiVersion = apiVersion || '2013-10-15'
    this.bucket = bucket || ''
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
    console.log(fontColor.green, `---accessKeyId：${this.accessKeyId}`)
    console.log(fontColor.green, `---secretAccessKey：${this.secretAccessKey}`)
    console.log(fontColor.green, `---地域节点：${this.endpoint}`)
    console.log(fontColor.green, `---上传空间：${this.bucket}`)
  }
  uploadFile = (file: FILE_LIST_ITEM, cb: Function) => {
    const ossStream = OssUploadStream(
      new ALY.OSS({
        accessKeyId: this.accessKeyId,
        secretAccessKey: this.secretAccessKey,
        endpoint: this.endpoint,
        apiVersion: this.apiVersion
      })
    )

    const upload = ossStream.upload({
      Bucket: this.bucket,
      Key: file.key
    })

    const read = fs.createReadStream(file.localFile)
    read.pipe(upload)

    upload.on('uploaded', function (details: unknown) {
      console.log('details:', details);
      cb(details)
    });

    upload.on('error', function (error: Error) {
      console.log('error:', error);
      cb(false)
    });
  }
}

export default AliOssUpload
