import fs from 'fs'
import { FILE_LIST_ITEM } from '../types/core'

export default {
  getFileByDir(
    list: Array<FILE_LIST_ITEM>,
    filePath: string,
    remoteFilePath?: string,
  ) {
    fs.readdirSync(filePath).map((url: string) => {
      let u = filePath + "/" + url
      if (url.charAt(0) !== "." && fs.existsSync(u)) {
        if (fs.statSync(u).isDirectory()) {
          this.getFileByDir(list, u, remoteFilePath)
        } else {
          list.push({
            key: remoteFilePath + u.slice(filePath.length),
            localFile: u
          })
        }
      }
    })
  },
  getFileList(
    cb: Function,
    filePath: string, 
    remoteFilePath?: string,
  ) {
    let filesList: Array<FILE_LIST_ITEM> = []
    this.getFileByDir(filesList, filePath, remoteFilePath)
    cb && cb(filesList)
  }
}