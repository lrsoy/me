import { describe, it, vi, expect } from 'vitest'
import { readAndProcessFilePt, readAndProcessFileCab, readAndProcessFileCabInterface, readAndProcessFileMock } from './file'
import { readFileSync } from 'fs'
import path from 'path'
import { Fileint } from './type'
import * as fs from 'fs'

vi.mock('./config', () => {
  return {
    interlayer: () => {
      return '测试'
    }
  }
})
it("依赖注入, 不解决耦合", () => {

  // 准备数据

  // 调用
  const r = readAndProcessFilePt('./test')

  // 验证
  expect(r).toBe('测试=> test unit')

})


it("依赖注入，解耦后测试", () => {

  // 准备数据
  class FileReader {
    read(filePath: string) {
      return 'cs'
    }
  }

  // 调用 
  const r = readAndProcessFileCab('./test', new FileReader())

  // 验证
  expect(r).toBe('cs=> test unit')
})

it('依赖注入，依赖倒置原则', () => {

  // 准备数据
  class FileReader implements Fileint {
    read(filePath: string) {
      return 'fri'
    }
  }

  // 调用
  const r = readAndProcessFileCabInterface('./test', new FileReader())

  // 验证
  expect(r).toBe('fri=> test unit')
})


vi.mock('fs', () => {
  return {
    readFileSync: vi.fn(() => 'fs')
  }
})
it.only('依赖注入，直接使用mock进行测试', () => {

  // 准备数据
  // 调用
  const r = readAndProcessFileMock('./test')

  // 验证
  expect(r).toBe('fs=> test unit')
})