import { it, expect, describe, vi, beforeEach, test } from 'vitest'
import { increment } from './increment.js'
increment(1) === 2

// the module is not mocked, because vi.doMock is not called yet
let mockedIncrement = 100

describe('官方文档案例vi.doMock', () => {

  beforeEach(() => {
    // simple doMock doesn't clear the previous cache, so we need to clear it manually here
    vi.doUnmock('./increment.js')
    // you can access variables inside a factory
    vi.doMock('./increment.js', () => ({ increment: () => mockedIncrement++ }))
  })


  it('importing the next module imports mocked one', async () => {

    // original import WAS NOT MOCKED, because vi.doMock is evaluated AFTER imports
    const { increment: mockedIncrement } = await import('./increment.js')

    // new import returns mocked module
    expect(mockedIncrement(1)).toBe(101)

  })
})
