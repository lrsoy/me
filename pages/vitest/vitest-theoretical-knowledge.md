---
  title: 前端测试框架 Vitest 基础理论知识（认识）
  display: 前端测试框架 Vitest 基础理论知识（认识）
  image: /image/banner1.jpg
  description: 
  subtitle: 
  date: 2023-07-05
  type: vitest
  author: lrsoy
  toc: true
  duration: 30min
---

<DelayTeleport>

[[toc]]
</DelayTeleport>



## 一、编写第一个单元测试

### 1.1 手动测试与自动化测试之间的关系

测试是自动化的一种体现，而自动化就是将手动测试的**过程**用**代码**实现一遍

手动测试的过程

1. 准备数据
2. 调用要测试的功能（函数）
3. 验证 功能的输出
4. 拆卸

### 1.2 安装Vitest

**Vitest** 是一个由**Vite**提供支持的极速单元测试框架，虽然它是由Vite支持的单元测试框架，但是在使用的时候并不是说一定要创建`Vite项目`,如果是webpack 项目或者是其他的项目，都可以使用，和测试没关系，在vitest内部自己就调用，也不需要依赖项目的环境

<CodeGroup>

  <CodeGroupItem title="install pnpm" active>

```bash
# 安装 Vitest
pnpm add -D vitest
```

  </CodeGroupItem>

  <CodeGroupItem title="file name">

```bash
# 例 - 功能名/要测试文件名 + spec + js/ts
todo.spec.ts
```

  </CodeGroupItem>

</CodeGroup>

### 1.3 第一个单测例子

* 例子

```ts
import { test } from 'vitest'

test("第一个测试例子",() =>{ // 要执行的测试代码
    // 1. 准备数据，有些情况下是不需要第一步的
    
    // 2. 调用函数（要测试的功能）
    
    // 3. 验证 输出的内容是否是预期的结果
    
    // 4. 拆卸 在一些情况下需要使用
})
```

* 运行单元测试，自己就会去寻找匹配的文件，然后运行

```bash
# 直接运行全部测试
npx vitest

# 指定文件运行测试
npx vitest run doc.spec.ts
```

## 二、常用的单测API

### 2.1 test / it

从功能上来说，他们都是相同的，都是用来创建一个测试ks，不同在于测试风格

* **it** 来自于 `BDD`，BDD意思的是`行为驱动开发`，他来自于`TDD`，在TDD之上的延伸和扩展而来，BDD要求开发人员，按照 `it should xxx xxx` 来描述测试行为


* **test**来自于`Jest`，Jest 认为 test 可读性更高

<CodeGroup>

  <CodeGroupItem title="IT" active>

```ts
it('should',() => {})
```

  </CodeGroupItem>

 <CodeGroupItem title="TEST">

```ts
test('should',() => {})
```

</CodeGroupItem>

</CodeGroup>

### 2.2 describe 

创建一个测试套件，就是里面包含多个测试ks，可以将**相同行为**的测试放到一起，方便维护，除此之外他还可以控制一组测试什么时候执行，要不要执行

```ts
describe('描述',() => {
   it('描述',() => {}) 
   it('描述',() => {}) 
   it('描述',() => {}) 
})
```

[Vitest官网describe](https://cn.vitest.dev/api/#describe) 查看更多的使用技巧



### 2.3 expect

[Vitest官网 expect](https://cn.vitest.dev/api/#expect) 断言，例如，这里会断言 `input` 的值是否等于 `2` ，如果它们不相等，断言则会抛出错误，并且测试失败

* toBe  相当于 === 判断 idx 是否全等于 2 , 使用场景一般用于值类型的对比

```ts
const idx = 2
it('toBe',() => {
    expect(idx).toBe(2)
})
```

* toEqual  用于两个对象之间的比较

```ts
it('toEqual',() => {
    const user = { name: '测试' }
    expect(user).toEqual({
        name: '测试'
    })
})
```

* toBeTruthy 用于检测某一个值返回是不是**真**，值等于什么不关心

```ts
it('toBeTruthy',() => {
    expect(1).toBeTruthy()
    expect(true).toBeTruthy()
    expect('123').toBeTruthy()
})
```

* toBeFalsy 用于检测某一个值返回的是不是**假**，值什么不关心

```ts
it('toBeTruthy',() => {
    expect(null).toBeTruthy()
    expect(false).toBeTruthy()
    expect(undefine).toBeTruthy()
})
```

* toContain 用于检测**数组**里面是否包含某一个值，或者是**字符串**里面是否包含某一个值

```ts
it('toContain',() => {
    const arr = [0]
    expect(arr).toContain(0)
   	expect('str').toContain('s')
})
```

* toThrow 检测函数会不会抛出错误

```ts
it('toThrow', () => {

  function getName(name: any): string {
    if (typeof name !== 'string') {
      throw new Error('name 类型错误')
    }
    return 'hhh'
  }

  expect(() => {
    getName(111)
  }).toThrow()

})
```

### 2.4 Setup and Teardown

```ts
import { beforeEach,beforeAll,afterEach,afterAll } from 'vitest'

1. 他们执行的顺序
beforeEach：在一个测试开始之前执行（和每一个测试kas 相关的，简单点就是和每一个 it 相关的）
beforeAll: 在所有测试之前执行，在一开始的时候，只执行一次
afterEach：在一个 it 或者是 test 执行完毕执行
afterAll：在所有 it 或者是 所有的test 执行完毕执行，只执行一次
// 例子：
beforeAll(() =>{
    console.log('在所有 it / test 之前进行执行')
    // 特殊性，可以直接return一个函数，此函数就代表了afterAll,与正常书写执行顺序是相同的
    return () =>{ //afterAll
       console.log('afterAll')
    }
})
beforeEach(() =>{
    console.log('在每一个it / test 之前进行调用')
    // 特殊性，可以直接return一个函数，此函数就代表了afterEach,与正常书写执行顺序是相同的
    return () =>{ //afterEach
       console.log('afterEach')
    }
})
test("",() =>{
    console.log('1')
})
afterEach(() =>{
    console.log('在每一个it / test 结束后进行调用')
})
afterAll(() =>{
    console.log('在所有 it / test 之后进行执行')
})
```

### 2.5 过滤

* 使用命令行通过文件进行过滤，要执行那些测试文件，例如：通过`pnpm vitest xxx`只执行这个测试文件，这种通过命令行指定文件执行测试的行为，用于当有很多测试文件，但是不想全部执行，可以通过指定测试文件来过滤

```shell
pnpm vitest test.spec 
```

* 另一种方式就是通过vitest 里面的一些`.skip` 或者是`.only` 这些方式来指定那些测试ks需要执行或者是直接跳过，例如

```ts
it.skip('skip',() => {}) // 跳过当前测试ks

it.only('only',() => {}) // 只执行当前测试ks

```

并且这些.skip .only 不仅仅可以在it上面使用，也可以在`describe`进行使用，具体参考Vitest 官网

