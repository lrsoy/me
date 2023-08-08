import { vi, it, expect } from 'vitest'
import { directRtPromise, promiseNestSetTimeout, View } from './promise'
import flushPromises from './utils'
it('如何测试Promise  直接返回Promise', async () => {

  const n = await directRtPromise()

  expect(n).toBe('ok')

})

it('如何测试Promise  Promise嵌套setTimeout', async () => {

  vi.useFakeTimers()
  const n = promiseNestSetTimeout()
  vi.advanceTimersToNextTimer()

  expect(n).resolves.toBe('ok')

})


it('如何测试Promise  链式调用', async () => {

  const n = new View()

  n.render()
  await flushPromises()

  expect(n.count).toBe(3)

})