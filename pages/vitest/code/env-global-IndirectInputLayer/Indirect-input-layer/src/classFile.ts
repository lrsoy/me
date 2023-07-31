import { readFileSync } from 'fs'
import { Fileint } from './type'

// export class ReadAndProcessFile {
//   run(filePath: string) {
//     const content: string = readFileSync(filePath, { encoding: 'utf-8' })
//     return content + "=> test unit"
//   }
// }



// 通过构造器将这个依赖传进来
export class ReadAndProcessFile {
  private _fileRender: Fileint
  constructor(fileRender: Fileint) {
    this._fileRender = fileRender
  }
  run(filePath: string) {
    const content: string = this._fileRender.read(filePath)
    return content + "=> test unit"
  }
}

// 通过方法的方式

export class ReadAndProcessFileAttribute {
  private _fileRender: any
  run(filePath: string) {
    const content: string = this._fileRender.read(filePath)
    return content + "=> test unit"
  }
  set fileRender(fileRender: Fileint) {
    this._fileRender = fileRender
  }
}

// 通过方法的形式
export class ReadAndProcessFileFun {
  private _fileRender: any
  run(filePath: string) {
    const content: string = this._fileRender.read(filePath)
    return content + "=> test unit"
  }

  setFileRender(fileRender: Fileint) {
    this._fileRender = fileRender
  }
}