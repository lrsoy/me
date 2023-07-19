// class 的方式
export class Interior {
  private count: number;

  constructor() {
    this.count = 0
  }

  increment() {
    this.count++
  }

  getCount(): number {
    return this.count
  }

}

// 函数方式

const arr: any[] = []
export const addItem = (name: string) => {
  const id = Math.round(Math.random() * 10);
  const obj = { id, name }
  arr.push(obj)
  return obj
}
export const getArr = (id: string | number) => {
  return arr.find(s => s.id === id)
}

// 函数方式 全局变量改变后，再次测试需恢复原有值
let count = 0
export const addCount = () => {
  count++
}

export const getCount = () => {
  return count
}

export const reset = () => {
  count = 0
}