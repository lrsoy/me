import { describe, expect, it, vi, afterEach } from 'vitest'
import { testNodeEnv } from './env'
/**
 * 第一种方式：直接对nodejs的环境变量直接进行赋值，然后进行测试
 * 缺点: 直接对环境变量进行赋值，在其他测试ks里面在次测试这个变量，值就是上一次更改的值没有重新初始化
 */
it.skip("测试nodejs环境变量 01 方式一", () => {

  // 准备数据： 通过直接赋值的方式，对指定的环境变量进行赋值
  process.env.USER_AGE = "2"

  // 调用
  const r = testNodeEnv()

  // 验证
  expect(r).toBe(4)


})



/**
 * 第二种方式: 通过vitest提供的api ,vi.stubEnv，配合vi.unstubAllEnvs()一起使用
 */

afterEach(() => {
  // 拆卸: 配合 将换将变量恢复
  vi.unstubAllEnvs()

  console.log(process.env.USER_AGE);

})
it('测试nodejs环境变量 02 方式二', () => {

  // 准备数据: 通过使用vitest提供的api
  vi.stubEnv('USER_AGE', "2")

  // 调用
  const r = testNodeEnv()

  // 验证
  expect(r).toBe(4)

  // 拆卸: 配合 将换将变量恢复
  // vi.unstubAllEnvs()

})



