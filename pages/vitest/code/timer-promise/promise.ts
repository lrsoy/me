// 1. 直接返回Promise

export function directRtPromise() {
  return new Promise((resolve, reject) => {
    resolve('ok')
  })
}

// 2. Promise嵌套setTimeout

export function promiseNestSetTimeout() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve('ok'), 1000)
  })
}

// 3. 链式调用
export class View {
  count: number = 1;
  render() {
    Promise.resolve().then(() => {
      this.count = 2
    }).then(() => {
      this.count = 3
    })
  }
}