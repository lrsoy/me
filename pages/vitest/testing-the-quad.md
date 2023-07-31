---
  title: 前端测试框架 Vitest 测试四部曲(准备数据)
  display: 测试四部曲 —— 准备数据
  image: /image/banner1.jpg
  description: 
  subtitle: 
  date: 2023-07-10
  type: vitest
  author: lrsoy
  toc: true
  duration: ""
---


<DelayTeleport>

[[toc]]
</DelayTeleport>



## 一、创建测试数据的三种方式



### 1.1 内联 in-line 场景：简单数据

内联创建数据的**优缺点**

* 优点，方便，直接将数据初始化在测试里面

```ts
import { describe,it,expect } from 'vitest'

describe('内联'，() => {
    it('优点') {
        const user = {
            age: 10,
            name: '小明'
        }
        
        expect(user).toEqual({
            age: 10,
            name:'小明'
        })
    }
})
```

* 缺点： 

  1. 重复数据，并且当要测试要调用的**逻辑**发生变化，比如说要用到的数据里面增加了一些字段，就要在每个测试环节初始化数据中，都要添加相应的字段，比较麻烦。

  ```ts
  import { describe,it,expect } from 'vitest'

  describe('重复数据',() => {
      it('add',() =>{
          // 准备数据
          const todo = {
              age: 10
          }
          // 调用逻辑
          addTodo(todo)
          // 验证数据
          expect(todos[0].age).toEqual('10')
      })
      
      it('add reverse',() =>{
          // 准备数据
          const todo = {
              age: 'reverse: 10'
          }
          // 调用逻辑
          addTodo(todo)
          // 验证数据
          expect(todos[0].age).toEqual('01')
      })
  })
  ```

  2. 当初始化数据格式特别复杂，就会导致单元测试可读性变差

### 1.2 委托 Delegated 场景： 复杂数据

委托：利用**函数**来生成所需要的数据，在测试ks里面调用函数，传入相应的参数，实现初始化数据的步骤，更好的可读性，也使得在阅读测试脚本的时候，代码的可读性。

```ts
import { describe,it,expect } from 'vitest'

function createTodo(age,name) {
    return {
        age,
        name
    }
}
describe('Delegated',() => {
    it('委托',() =>{
       const todo = createTodo(10,'小明')
       addTodo(todo)
       expect(todos[0].name).toEqual('小明')
    })
})
```



### 1.3 隐式 Implicit 场景： 重复数据

隐式的创建数据，利用Vitest里面的**beforeEach**初始化数据，如果每个测试都需要新的数据，就可以在beforeEach里面隐式的去创建，beforeEach会在每个测试ks之前执行，其解决的问题还是重复初始化数据的问题。

缺点： 

* 会造成代码可读性变差，初始化数据和逻辑分开编写，并且当测试(it) 变多的时候，还需要翻到最上面去查看初始化的逻辑

```ts
import { describe,it,expect，beforeEach } from 'vitest'
describe('隐式'，() => {
    beforeEach(() =>{
        const todo = { ..... }
    })
    it('add',() => {
        addTodo(todo)
        expect(todos[0].name).toEqual('xxxx')
    })
    .....更多的 it
})
```

解决：

* 为了解决这种现象，可以使用**describe**将相关的测试放到一起，提升测试脚本的可读性。

```ts
describe('隐式'，() => {
    describe('第一个'，() => {
    	beforeEach(() =>{ 初始化数据 })
        it('',() => {})
        it('',() => {})
        it('',() => {})
    })
     describe('第一个'，() => {
        beforeEach(() =>{ 初始化数据 })
        it('',() => {})
        it('',() => {})
        it('',() => {})
    })
})
```

注意：

* 避免在beforeEach里面创建所有的初始化相关的数据，会造成，当项目开发久了，去改某一个逻辑的时候，测试也要随着进行更改，并且还不能轻易的去改变beforeEach里面初始化的数据，因为很有可能你并不能想起来这个初始化数据在那个测试里面使用了，还要去找，给自己添加麻烦。



## 二、最小准备数据原则

在准备测试数据的时候，和当前要测试功能无关的数据就不需要提供了。

为什么要这么做：为了单元测试的可读性。

例：

<CodeGroup>

  <CodeGroupItem title="index.js" active>

```ts
export class User(){
    constructor(name,age,content) {
        this.name = name
        this.age = age
        this.content = content
    }
    splicing() {
        return `用户全称${this.name}`
    }
}
```

  </CodeGroupItem>

  <CodeGroupItem title="index.spec.ts">

```ts
import { describe,it,expect } from 'vitest'
import { User } from './index.ts'
describe("zx",() => {
    it("最小数据原则",() =>{
        const user = new User('小明',10,'其他不相干的数据')
        const content = user.splicing()
        expect(content).toBe('用户全称小明')
    })
})
```

  </CodeGroupItem>

</CodeGroup>

可以看到splicing方法只是需要一个name的参数，但是在写测试的时候，还要将`age`传递过去，也就是说在测试某一个功能的时候，有一些函数是不需要用到所有参数的，在测试的时候，也就没有必要给他传递。



简单的优化：

```ts
class User(){
    constructor(name:string,age:number = 10,content:string = '不相干数据') {
        this.name = name
        this.age = age
        this.content = content
    }
    splicing() {
        return `用户全称${this.name}`
    }
}
```



* 第一种方式：给一些不必要的参数定义一些默认值，定义了默认值就可传可不传，不传递就会使用默认值，这样方便了测试，也让代码更具有可读性，也方便单元测试代码的维护，**单元测试可以驱动设计出更好的程序api**

```ts
import { describe,it,expect } from 'vitest'
describe("zx",() => {
    it("最小数据原则",() =>{
        const user = new User('小明')
        const content = user.splicing()
        expect(content).toBe('用户全称小明')
    })
})
```

* 第二种方式：通过使用函数的方式也就是上面提到的**委托**，将一些参数直接在函数内部定义，在准备数据的时候，只需要调用函数传入需要的参数即可。



总结： 

在编写单元测试代码的时候，能足够简单就要简单，尽量让代码变得**可读、便于维护**，说到底测试代码也是**代码**，是需要维护的，如果测试代码在维护起来很麻烦的时候，维护时间大于开发业务代码，写单侧反而更加让人烦恼，所以一定要让单侧**足够的简单、可读性更高**才好维护。



而且可以基于**最小准备数据原则**，在一些情况下可能有多种方式去实现业务逻辑，在写测试的时候，如果准备数据或者是验证的时候比较繁琐麻烦，只要违背了测试的**可读性，可维护性**，就可以抛弃上一种方案，选择可读性可维护性更高的方案。

