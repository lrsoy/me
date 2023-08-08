import { vi, it, expect } from 'vitest'
import { matchRandomCreateStr } from './mathRandom'


it('如何测试随机数', () => {

  // 准备数据
  vi.spyOn(Math, 'random').mockImplementation(() => {
    return 0.2
  })
  // 调用
  const n = matchRandomCreateStr(2)
  // 验证
  expect(n).toBe('kk')

})