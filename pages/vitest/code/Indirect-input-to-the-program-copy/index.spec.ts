import { it, expect, vi } from 'vitest'
import { addition, multiplication } from './index'

vi.mock('./config', () => {
  return {
    increment: () => 3
  }
})
it('共同使用一个mock 加法', () => {
  // 准备数据
  // 调用
  const n = addition()
  // 验证
  expect(n).toBe(4)
})

it('共同使用一个mock 减法', () => {
  // 准备数据
  // 调用
  const n = multiplication()
  // 验证
  expect(n).toBe(6)
})