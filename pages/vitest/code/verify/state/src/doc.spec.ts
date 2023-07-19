import { describe, expect, it, vi } from 'vitest'
import { Databases } from './config'
import { UserService } from './doc'
it("状态存在于依赖中", () => {

  // 准备数据
  const database = new Databases()
  const userService = new UserService(database)

  // 调用
  const data = userService.createUser('状态')

  // 验证
  expect(database.getDatabase(data.id)?.name).toBe('状态')

})