import { describe, it, vi, expect, afterEach } from 'vitest'
import { testViteEnv } from './vite'


afterEach(() => {
  vi.unstubAllEnvs()
  console.log(import.meta.env.VITE_USER_AGE);
})
it("测试import.meta.env", () => {

  // 准备数据
  vi.stubEnv('VITE_USER_AGE', '4')

  // 调用
  const r = testViteEnv()

  // 验证
  expect(r).toBe(8)

})

