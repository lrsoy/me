---
  title: 前端测试框架 Vitest 测试四部曲(验证)
  display: 验证
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



<!-- <CodeGroup>
  <CodeGroupItem title="PNPM" active>

```bash
git init
pnpm init
```

  </CodeGroupItem>

  <CodeGroupItem title="YARN">

```bash
git init
yarn init
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

```bash
git init
npm init
```

  </CodeGroupItem>
</CodeGroup> -->

## 状态验证

状态验证，不关心具体实现逻辑，只关心最终结果，目的就是为了验证程序的状态是否与预期的结果相符，这种验证方式其实是一种黑盒验证。

所谓的状态就是我们当前被测系统的`属性`和`数据结构`

黑盒验证： 

![](/vitest/b5dd605f350541c77ec3263fc04049f.png)

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

<CodeGroup>
  <CodeGroupItem title="interior.ts" active>

```ts
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

  </CodeGroupItem>

<CodeGroupItem title="interior.spec.ts" >

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

  </CodeGroupItem>

</CodeGroup>

2. 函数的方式：经常使用

<CodeGroup>
  <CodeGroupItem title="interior.ts" active>

```ts
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

  </CodeGroupItem>

<CodeGroupItem title="interior.spec.ts" >

```ts
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

  </CodeGroupItem>

</CodeGroup>

### 1.2 状态存在其他里面,不直接存在当前系统里

<CodeGroup>
  <CodeGroupItem title="doc.ts" active>

```ts
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

  </CodeGroupItem>

  <CodeGroupItem title="config.ts" >

```ts
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

  </CodeGroupItem>

  <CodeGroupItem title="doc.spec.ts" >

```ts
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

  </CodeGroupItem>

</CodeGroup>

## 行为验证

定义：验证对象之间的交互是否按照预期进行

对象之间的交互：**调用函数或者是调用对象里面的某一个方法**

行为验证背后的逻辑：状态的改变是由交互引起的，如果所有的交互(调用)都正确，那就可以推断最终的状态也不会错。

<CodeGroup>
  <CodeGroupItem title="behavior.ts" active>

```ts
import { Databases } from './config'
export class UserService {
  constructor(private databases: Databases) { }
  createUser(name: string) {
    const id = Math.floor(Math.random() * 1000)
    const userObj = { id, name }
    this.databases.addUser(userObj)
    return userObj
  }
}
```

  </CodeGroupItem>

  <CodeGroupItem title="config.ts" >

```ts
interface User {}
export class Databases {
  private database: User[] = []
  addUser(user: User): void {}
  getDatabase(id: number): User | undefined {}
}
```

 </CodeGroupItem>

</CodeGroup>

当前例子里面，在做测试的时候不在去验证`Databases`里面database的结果，而是去验证`databases.addUser`是否按照预期去完成交互

### 2.1 Mock、Spy、Stub分别代表什么 

1. `Mock(模拟)`： 

   在测试中，mock是指模拟或者替代真实对象的行为(逻辑)，通常用来模拟外部依赖，网络请求、数据库连接。

   例如：

   ```ts
   import { vi, it, expect } from 'vitest'
   import { questSentences } from './api'
   // 模拟第三方api
   vi.mock('axios')
   it('第三方API',() => {
       vi.mocked(axios).mockResolvedValue({ data: { code: 200 } })
       const r = await questSentences()
       expect(r).toBeTruthy()
   })
   /**
    * 模拟：
    * 当一个函数依赖另一个函数，那可以通过mock来模拟这个依赖函数，因为这个依赖函数不需要被测
    * 所以可以直接通过mock模拟
    */
   vi.mock('~config',() =>{
       return {
           num:() => 1
       }
   })
   it('依赖',() => {
       // 直接调用要测试的函数
       // 验证即可
   })
   ```

2. `Spy(间谍)`:

   Spy是一种测试工具，用来监听函数的调用和参数的传递，它可以记录函数调用的次数，Spy通常用于验证函数或对象方法是否按预期被调用，通过Spy，可以收集有关函数调用情况的信息，用于测试验证等目的。

   例如：

   <CodeGroup>
     <CodeGroupItem title="第三方API lodashConfig.ts" active>

   ```ts
   import { difference } from 'lodash'
   export const arrDifference = (arr1: Array<number>, arr2: Array<number>) => {
     difference(arr1, arr2)
   }
   ```

    </CodeGroupItem>

     <CodeGroupItem title="lodashConfig.spec.ts" >

   ```ts
   import { describe, it, vi, expect } from 'vitest'
   import { arrDifference } from './lodashConfig'
   import { difference } from 'lodash'
   // 第三方库
   vi.mock("lodash", () => {
     return {
       // 区别于stub,stub 针对的是值的返回
       difference: vi.fn()
     }
   })
   it('第三方库api', () => {
     // 准备数据
     const arr1 = [1, 4, 6, 8, 9]
     const arr2 = [4, 6, 8, 5]
     // 调用
     arrDifference(arr1, arr2)
     // 验证
     expect(difference).toBeCalled()
   })
   ```

    </CodeGroupItem>

   </CodeGroup>

   ```ts
   // 验证对象方法是否被调用：以上面class为例子 UserService
   import { vi, it, expect } from 'vitest'

   it("验证函数/方法有没有按照预期调用",() =>{
       const databases = new Databases()
       
       // 方式一：创建一个模拟（mock）收集函数相关信息
       vi.spyOn(databases, 'addUser')
       // 方式二：vi.fn() 创建函数模拟（mock）依然可以记录信息
       Databases.prototype.addUser = vi.fn()
       
       const userService = new UserService(databases)
       userService.createUser('ctr')
     	expect(databases.addUser).toBeCalled()
   })
   ```

3. `Stub存根`：

   Stub是一个轻量级的替代对象，它提供预定义的输出，用于代替真实对象或者函数，Stub通常用于模拟函数的行为，使得被测的代码在测试时候不依赖真实实现，与Mock不同，Stub通常不会验证函数调用的次数或者参数，只关心预定义的输出是否符合预期，`简单来说它只提供具体值`。

   例如：

   <CodeGroup>
     <CodeGroupItem title="global.ts" active>

   ```ts
   // 替代全局API 直接对innerHeight 进行赋值
   export const testGlobalApi = () => {
     return innerHeight * 2
   }
   ```

   </CodeGroupItem>

   <CodeGroupItem title="global.spec.ts" >

   ```ts
   import { describe, it, vi, expect } from 'vitest'
   import { testGlobalApi } from './global'
   it('测试全局 api 例：window innerHeight', () => {
     // 准备数据
     vi.stubGlobal('innerHeight', 4)
     // 调用
     const r = testGlobalApi()
     // 验证
     expect(r).toBe(8)
     // 拆卸
   })
   ```

   </CodeGroupItem>

   </CodeGroup>

   stub不仅仅可以使用stubGlobal这样的API去替代，不同场景使用不同的方式，选择合理方式即可

### 2.2 vi.mock、vi.spyOn、vi.fn

### 2.3 行为验证缺点以及使用场景

缺点：

* 破坏了代码的封装性，白盒测试 => 它暴露了我们代码内部的实现细节
* 丧失了测试的有效性：如果内部代码出现问题，是检测不出来的。

使用场景：

* 优先使用状态验证，当找不到状态时或者是状态非常难以获取到的，可以选择行为验证

  例如向后端发送请求，但这个请求只是发送，并不会得到状态的时候，可以使用行为验证

* 时间成本

