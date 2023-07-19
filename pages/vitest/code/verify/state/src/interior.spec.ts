import { describe, expect, it, vi } from 'vitest'
import { Interior, addItem, getArr, getCount, addCount, reset } from './interior'

it("class 私有属性", () => {

  // 准备数据
  const interior = new Interior()

  // 调用
  interior.increment()

  // 验证
  expect(interior.getCount()).toBe(1)

})


describe("全局变量", () => {

  it('函数 全局变量', () => {
    // 调用
    const data = addItem('小明')

    // 验证
    expect(getArr(data.id)?.name).toBe('小明')

  })
  it("重置变量", () => {

    // 调用
    addCount()

    // 验证
    expect(getCount()).toBe(1)

    // 拆卸：不影响其他测试，将数据恢复原有状态
    reset()
  })
})