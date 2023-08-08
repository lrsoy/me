import { vi, it, expect, afterEach, beforeEach } from 'vitest'
import { currentDate } from './dateRan'


beforeEach(() => {
  vi.useFakeTimers()
})
it('如何测试日期 固定值今天周五', () => {

  // 准备数据
  vi.setSystemTime(new Date(2023, 7, 4))
  // 调用
  const n = currentDate()
  // 验证
  expect(n).toBe('今天是星期5')

})
afterEach(() => {
  vi.useRealTimers()
})