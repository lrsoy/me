import { describe, it, vi, expect } from 'vitest'
import { UserService } from './behavior'
import { Databases } from './config'
import { arrDifference } from './lodashConfig'
import { difference } from 'lodash'


// 第三方库
vi.mock("lodash", () => {
  return {
    difference: vi.fn()
  }
})
it('第三方库api', () => {

  // 准备数据
  const arr1 = [1, 4, 6, 8, 9]
  const arr2 = [4, 6, 8, 5]
  // 调用
  arrDifference(arr1, arr2)
  // 验证
  expect(difference).toBeCalled()

})


// class 类
it('验证交互行为', () => {

  // 准备数据
  const databases = new Databases()

  /**
   * 行为验证重要的步骤：要区分开stub 和 行为验证中mock进行区分
   */

  vi.spyOn(databases, 'addUser')

  const userService = new UserService(databases)

  // 调用
  userService.createUser('ctr')

  // 验证
  expect(databases.addUser).toBeCalled()

})
