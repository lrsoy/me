---
  title: 前端测试框架 Vitest 验证(状态验证)
  display: 验证 —— 状态验证
  image: /image/banner1.jpg
  description: 
  subtitle: 
  date: 2023-07-19
  type: vitest
  author: lrsoy
  toc: true
  duration: ""
---


<DelayTeleport>

[[toc]]
</DelayTeleport>



## 状态验证

状态验证，不关心具体实现逻辑，只关心最终结果，目的就是为了验证程序的状态是否与预期的结果相符，这种验证方式其实是一种黑盒验证。

所谓的状态就是我们当前被测系统的`属性`和`数据结构`

黑盒验证： 

![](/public/vitest/b5dd605f350541c77ec3263fc04049f.png)

不关心内部具体的实现，也不需要知道内部代码是如何实现的，只关心输入和输出，根据图中可以看，圈住的SUT(被测代码)，不需要关心实现细节，只需要关心s2是不是达到了预期结果。

例：

```ts
// index.js
const arr = [];
const addItem = () => {
  const id = Math.round(Math.random() * 10);
  arr.push({ id })
}
const getArr = () =>{
    return arr
}
```

在这个例子中，被测系统的状态是`arr`数组，通过`addItem` 函数向arr里面添加新数据，在编写测试用例时，模拟调用 `addItem` 函数多次，然后使用 `getArr` 函数来获取数组的最新状态，并验证添加的元素是否按预期存在于数组中。



### 1.1 状态存在系统内部如何进行测试

1. class：在类里面如果属性是私有，需要通过方法将其暴露出去，这样既可以对外开放接口方便测试，又不会将私有属性暴露出去，即使在之后更改私有属性的时候，只要暴露给外面相关获取方法，其内部无论怎么变化都不回影响到测试

```ts
// interior.ts
export class Interior {
  private count: number;
  constructor() {
    this.count = 0
  }
  increment() {
    this.count++
  }
  // 对外开放接口，方便测试
  getCount(): number {
    return this.count
  }
}

```

```ts
import { describe, expect, it, vi } from 'vitest'
import { Interior, addItem} from './interior'
it("class 私有属性", () => {
  // 准备数据
  const interior = new Interior()
  // 调用
  interior.increment()
  // 验证
  expect(interior.getCount()).toBe(1)
})
```

2. 函数的方式：经常使用

```ts
// interior.ts
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
```

```ts
// interior.spec.ts
import { describe, expect, it, vi } from 'vitest'
import { getArr, getCount, addCount, reset } from './interior'

describe("全局变量", () => {

  it('函数 全局变量', () => {
    // 调用
    const data = addItem('小明')
    // 验证
    expect(getArr(data.id)?.name).toBe('小明')
  })
  it("重置变量", () => {
    // 调用
    addCount()
    // 验证
    expect(getCount()).toBe(1)
    // 拆卸：不影响其他测试，将数据恢复原有状态
    reset()
  })
})
```

### 1.2 状态存在其他里面,不直接存在当前系统里

```ts
// doc.ts  
import { Databases, } from './config'
// UserService 方法就是一个状态机
export class UserService {
  // databases 状态存储的位置
  constructor(private databases: Databases) { }
  createUser(name: string) {
    const id = Math.floor(Math.random() * 1000)
    const userObj = { id, name }
    this.databases.addUser(userObj)
    return userObj
  }
}
```

```ts
// config.ts
interface User {
  id: number,
  name: string
}
// Databases里面存储的才是真正的状态 database 最终要验证的也就是它
export class Databases {
  private database: User[] = []
  addUser(user: User): void {
    this.database.push(user)
  }
  getDatabase(id: number): User | undefined {
    return this.database.find(f => f.id === id)
  }
}
```

```ts
// doc.spec.ts
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
```









