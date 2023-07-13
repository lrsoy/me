import { describe, it, expect, vi, beforeEach } from 'vitest'
import { variableTest } from '~/variable'

// 准备数据
vi.mock("~/config", async (importOriginal) => {
  const config = await importOriginal()

  /* 
    问题：
      值得注意的是，如果这里直接返回的是name，那么如果在variable.ts文件里面我在调用另一个常量
      就会导致测试结果是失败的，原因是在vi.mock的时候，他返回了name,并没有将其他值返回出去，
      所以在测试的时候结果是错误的，因为vi.mock没有将其他值一并返回
    解答：
      01.
        vi.mock的第回调函数接受一个 importOriginal 参数，这个参数的返回值如下:
        [Object: null prototype] [Module] {
          User: [Getter],
          name: [Getter],
          age: [Getter]
        }
        是一个对象，所以可以通过importOriginal获取到，然后通过展开语法直接合并到返回对象里即可，
      02.
        通过 vi.importActual 获取
        const config = await vi.importActual('~/config')
        这样也是可以获取的，但是这样就会给我们自己增加工作量，当文件位置发生改变或者是文件名变更，需要
        一个一个的更改，所以不推荐使用

  */
  return {
    ...config as any,
    name: 'vitest'
  }
})
describe('常量', () => {

  it("常量测试", () => {

    // 调用
    const r = variableTest()
    // 验证
    expect(r).toBe('vitest是一个测试框架')

  })

})