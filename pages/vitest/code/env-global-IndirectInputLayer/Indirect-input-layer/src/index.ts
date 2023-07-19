import { readAndProcessFileCab, readAndProcessFileCabInterface } from './file'
import { readFileSync } from 'fs'
import { Fileint } from './type'
import path from 'path'

const filePath = path.join(__dirname, 'example.txt')


// 测试依赖注入 但没有使用依赖倒置原则
export class FileReader {
  read(filePath: string) {
    return readFileSync(filePath, { encoding: 'utf-8' })
  }
}

const fr = new FileReader()
readAndProcessFileCab(filePath, fr)


// 测试依赖注入 使用依赖倒置原则
export class FileReaderInterface implements Fileint {
  read(filePath: string) {
    return readFileSync(filePath, { encoding: 'utf-8' })
  }
}

const fri = new FileReaderInterface()
readAndProcessFileCabInterface(filePath, fri)