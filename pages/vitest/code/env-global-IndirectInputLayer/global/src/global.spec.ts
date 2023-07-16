import { describe, it, vi, expect } from 'vitest'
import { testGlobalApi } from './global'


it('测试全局 api 例：window innerHeight', () => {

  // 准备数据
  vi.stubGlobal('innerHeight', 4)

  // 调用
  const r = testGlobalApi()

  // 验证
  expect(r).toBe(8)

  // 拆卸

})