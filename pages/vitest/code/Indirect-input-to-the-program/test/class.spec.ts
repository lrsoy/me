import { describe, it, expect, vi } from 'vitest'
import { User } from '~/config'
import { testClassAttribute, testClassFunc } from '~/class'


// vi.mock("~/class", async (importOriginal) => {
//   // const config = await vi.importActual('~/class') as any
//   const config = await importOriginal()
//   return {
//     ...config as any,
//     User: class User {
//       age: number = 10
//     }
//   }
// })

// 测试类属性
vi.mock('~/config', () => {
  return {
    User: class User {
      age: number = 10
    }
  }
})

// 测试类方法 01
vi.mock('~/config', () => {
  return {
    User: class User {
      getAge() {
        return 2
      }
    }
  }
})

describe('class 类', () => {

  it.skip('失败： 测试class 属性', () => {
    const r = testClassAttribute()
    expect(r).toBe(100)
  })

  it.skip("class 类属性", async () => {

    // 准备数据
    // 调用
    const r = testClassAttribute()
    // 验证
    expect(r).toBe(100)

  })

  it.skip("class 方法 01", () => {

    // 准备数据
    // 调用
    const r = testClassFunc()
    // 验证
    expect(r).toBe(20)

  })

  it("class 方法 02", () => {

    // 准备数据：通过原型链 prototype 去更改数据
    User.prototype.getAge = () => 3

    // 调用
    const r = testClassFunc()
    // 验证
    expect(r).toBe(30)

  })

})