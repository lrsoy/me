import { vi, expect, it } from 'vitest'
import { ReadAndProcessFile, ReadAndProcessFileAttribute, ReadAndProcessFileFun } from './classFile'
import { Fileint } from './type'

it('通过构造函数', () => {
  // 准备数据
  class FileRender implements Fileint {
    read(filePath: string): string {
      return 'cs'
    }
  }
  // 调用
  const file = new ReadAndProcessFile(new FileRender())

  // 验证
  expect(file.run('./test')).toBe('cs=> test unit')

})

it("通过属性的方式", () => {
  // 准备数据
  class FileRender implements Fileint {
    read(filePath: string): string {
      return 'cv'
    }
  }

  // 调用
  const file = new ReadAndProcessFileAttribute()
  file.fileRender = new FileRender()
  // 验证

  expect(file.run('./test')).toBe('cv=> test unit')
})

it.only('通过方法的方式', () => {
  // 准备数据
  class FileRender implements Fileint {
    read(filePath: string): string {
      return 'cb'
    }
  }

  // 调用
  const file = new ReadAndProcessFileFun()
  file.setFileRender(new FileRender())
  // 验证
  expect(file.run('./test')).toBe('cb=> test unit')

})