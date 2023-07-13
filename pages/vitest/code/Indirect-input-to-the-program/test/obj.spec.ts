import { describe, it, vi, expect } from 'vitest'
import { objKeyTest, obj, objFuncTest } from '../src/obj'

// 测试在方法里面用获取对象里面值的时候，如果测试对象的属性以及方法

describe("对象", () => {

  // 测试对象属性
  it("对象属性的测试", () => {

    // 准备数据： 针对对象属性直接对对象的值进行更改
    obj.status = true

    // 调用
    const r = objKeyTest()

    // 验证
    expect(r).toBe(18)

  })

  // 测试对象上面的方法
  it("对象方法的测试", () => {

    // 准备数据: 和测试对象属性相同的方式，对 对象的方法进行赋值即可
    obj.ageLogFun = () => {
      return false
    }

    // 调用
    const r = objFuncTest()

    // 验证
    expect(r).toBe('no')

  })

})