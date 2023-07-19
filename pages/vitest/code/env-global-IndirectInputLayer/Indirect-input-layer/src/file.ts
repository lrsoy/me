import { readFileSync } from 'fs'
import { interlayer } from './config'
import { Fileint } from './type'

// 不解决耦合问题
export function readAndProcessFilePt(filePath: string) {

  const content: string = interlayer(filePath)

  return content + "=> test unit"
}

// 解决耦合问题但没有加接口限制
export function readAndProcessFileCab(filePath: string, cab: any) {

  const content: string = cab.read(filePath)

  return content + "=> test unit"
}


// 解决耦合 加入接口限制
export function readAndProcessFileCabInterface(filePath: string, cab: Fileint) {
  const content: string = cab.read(filePath)

  return content + "=> test unit"
}


// 不使用中间层 直接通过mock进行测试
export function readAndProcessFileMock(filePath: string) {
  const content: string = readFileSync(filePath, { encoding: 'utf-8' })
  return content + "=> test unit"
}