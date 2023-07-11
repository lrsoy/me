import { it, expect, describe, vi, beforeEach } from 'vitest'
import { sum } from './index'

// 不共用mock 需要将 即将要被改变的函数引入进来
import { num1 } from './function'

// 共用同一个mock
// vi.mock('./function', () => {
//   return {
//     num1: () => 10
//   }
// })

// 不共用同一个mock
// vi.mock('./function')

describe("间接输入", () => {
  beforeEach(() => {

  })
  it.skip("错误示范", () => {
    // 准备数据: 由于是间接输入，通过调用其他函数获取数据，说以没有初始化数据
    // 调用
    const n = sum()
    // 验证
    expect(n).toBe(20)
  })

  // 公用同一个mock
  it.skip("vi.mock 第一种方式", () => {
    // 准备数据
    // 调用
    const n = sum()
    // 验证
    expect(n).toBe(20)
  })

  // 不公用一个mock
  it.skip("不共用mock 01", () => {

    // 准备数据
    vi.mocked(num1).mockReturnValue(10)
    // 调用
    const n = sum()
    // 验证
    expect(n).toBe(20)

  })

  it.only('vi.doMock', async () => {
    // 准备数据
    vi.doMock('./function', () => {
      return {
        num1: () => 2
      }
    })
    const { sum: mockedIncrement } = await import('./index')
    //调用
    const n = mockedIncrement()
    // 验证
    expect(n).toBe(4)

  })

})