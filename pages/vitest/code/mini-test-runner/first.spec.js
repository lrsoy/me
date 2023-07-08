import { test, run, it, expect, beforeAll, beforeEach, afterAll, afterEach, describe } from './index.js'


beforeAll(() => {
  console.log('在所有测试ks 之前执行');
})

beforeEach(() => {
  console.log('在每一个测试ks之前执行');
})
test('test 测试ks', () => {
  console.log('test 测试ks');
})

it("it 测试ks", () => {
  console.log("it 测试ks");
})

it("expect.toBe", () => {
  expect(2).toBe(2)
})

afterEach(() => {
  console.log('在每一个测试ks之后执行');
})

afterAll(() => {
  console.log('在所有测试之后执行');
})


describe('测试套件', () => {
  it("aaa", () => {
    console.log('test 测试ks22');
  })
})

// it("expect.toBe", () => {
//   expect(2).toBe(3)
// })
// test.only('test only', () => {
//   console.log('test only');
// })

run()