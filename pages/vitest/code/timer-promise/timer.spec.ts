import { vi, it, expect } from 'vitest'
import { SetTimeOut, timer } from './timer'

// 如过没有改变任何变量值，或者是系统的值，那么就采用行为验证
it.skip('如何测试 setTimeOut', () => {

  vi.useFakeTimers()
  // 准备数据
  const cb = vi.fn()


  // 调用
  const n = new SetTimeOut('1')
  n.getSetTimeOut(cb, 1000)
  // vi.advanceTimersByTime(1000)
  vi.advanceTimersToNextTimer()

  // 验证
  expect(cb).toBeCalledWith('1')


})

it('如何测试 setInterval', () => {

  vi.useFakeTimers()
  // 准备数据
  vi.spyOn(console, 'log')

  // 调用 
  timer()
  vi.advanceTimersByTime(100)

  // 验证
  expect(console.log).toBeCalledWith('aaa')

})