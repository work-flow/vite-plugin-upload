import qiniu from 'qiniu'
import { QINIU_OPTION_TYPE } from '../types'

class QiuNiuUpload {
  option: QINIU_OPTION_TYPE
  constructor (option: QINIU_OPTION_TYPE) {
    this.option = option
  }
  upload () {
    const {
      accessKey,
      secretKey,
      scope,
      file,
      fileName,
      expires,
      logName
    } = this.option
    
    console.log('file>>>', file);
    debugger
    let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

    let putPolicy = new qiniu.rs.PutPolicy({
      scope,
      expires: expires ? expires : 7200
    });
    
    let uploadToken=putPolicy.uploadToken(mac);

    let config = new qiniu.conf.Config();
    let resumeUploader = new qiniu.resume_up.ResumeUploader(config);
    let putExtra = new qiniu.resume_up.PutExtra();
    // 扩展参数
    putExtra.params = {
      "x:name": "",
      "x:age": 27,
    }
    putExtra.fname = fileName;
    // 如果指定了断点记录文件，那么下次会从指定的该文件尝试读取上次上传的进度，以实现断点续传
    // putExtra.resumeRecordFile = logName ? logName : 'progress.log';
    let key = fileName, msg;
    // 文件分片上传
    resumeUploader.putFile(uploadToken, key, file, putExtra, function(respErr,
      respBody, respInfo) {
      if (respErr) {
        throw respErr;
      }
      if (respInfo.statusCode == 200) {
        console.log(respBody);
        msg = '上传成功'
      } else {
        console.log(respInfo.statusCode);
        console.log(respBody);
        msg = '上传失败'
      }
    });
  }
}

export default QiuNiuUpload
