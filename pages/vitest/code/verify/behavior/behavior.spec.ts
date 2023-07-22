import { describe, it, vi, expect } from 'vitest'
import { UserService } from './behavior'
import { Databases } from './config'


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