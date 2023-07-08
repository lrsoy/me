// test it
// expect toBe
// test.only
// 提示是否通过/报错
// beforeAll beforeEach afterAll afterEach
// describe
// 自动执行所有测试脚本 *.spec.js


const tests = [] // 存储所有的测试ks
const onlys = []
const beforeAlls = []
export function test(should, callback) {
  tests.push({ should, callback })
}
test.only = (should, callback) => {
  onlys.push({ should, callback })
}

export const it = test

export function expect(anyValue) {
  return {
    toBe(num) {
      if (anyValue === num) {
      } else {
        throw new Error(`anyValue:${anyValue} 与 num: ${num} 值不相等`)
      }
    }
  }
}

// 在所有测试ks之前执行 只执行一次
export function beforeAll(callback) {
  beforeAlls.push(callback)
}

const beforeEachs = []
// 在每一个测试ks之前执行
export function beforeEach(callback) {
  beforeEachs.push(callback)
}

const afterEachs = []
export function afterEach(callback) {
  afterEachs.push(callback)
}


const afterAlls = []
export function afterAll(callback) {
  afterAlls.push(callback)
}

// 测试套件
export function describe(should, callback) {
  callback()
}

// 运行
export function run() {
  const suit = onlys.length > 0 ? onlys : tests

  for (const bfalls of beforeAlls) {
    bfalls()
  }

  for (const test of suit) {
    for (const beforeEachCab of beforeEachs) {
      beforeEachCab()
    }
    try {
      test.callback()
      console.log('成功执行');
    } catch (err) {
      console.log('失败：', err);
    }
    for (const afterEachCab of afterEachs) {
      afterEachCab()
    }
  }
  for (const afterAllCab of afterAlls) {
    afterAllCab()
  }
}