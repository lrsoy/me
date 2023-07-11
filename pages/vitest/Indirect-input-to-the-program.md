---
  title: 前端测试框架 Vitest 程序的间接输入(调用)
  display: 程序的间接输入
  image: /image/banner1.jpg
  description: 
  subtitle: 
  date: 2023-07-11
  type: vitest
  author: lrsoy
  toc: true
  duration: ""
---


<DelayTeleport>

[[toc]]
</DelayTeleport>



# 程序的间接输入



## 一、调用其他模块导出的函数

**调用其他模块导出的函数获得数据或通过异步api获得到的数据**，并且参加当前函数进行计算。

例如：

```ts
export const numsA =()=> {
    return 10
}

export const numsB =()=> {
    return new Promise((res,rej) =>{
        setTimeout(() =>{
            return res(10)
        },0)
    })    
} 
```

```ts
import {numsA,numsB} from 'nums.js'
export const sum =()=> {
    return numsA() * 2
}
```



上面的例子可以看到，调用`sum` 里面的`numA`就属于间接输入



### 1.1 vi.mock 

定义：

用于替换真实的逻辑实现，也就是说，调用函数获取数据，间接的获取数据的时候，这个数据很有可能来自**后端提供的接口里面的数据**，因为接口提供的数据是变化的，接口数据变了就会导致测试的结果不通过，就要去手动的去更改**验证的结果**。

使用： 

**vi.mock**第一个参数，供的 `path，文件路径` 替换所有导入的模块为另一个模块，第二个接受的参数是**工程函数**，这个函数可以是异步的，在工厂函数里面给对应的值，然后去完成测试，这样避免**间接接入的数据影响到测试结果**

需要了解的是，vi.mock 是有提升的，也就是说无论这个写在测试文件的那个位置，最终他都会被提升到代码的最前面。

* 多个测试可以共用一个vi.mock

```ts
// function.spec.js
import { it, expect, describe, vi } from 'vitest'
import { sum } from './index'

vi.mock('./function', () => {
  return {
    num1: () => 10
  }
})
describe("间接输入", () => {
  it("vi.mock 第一种方式", () => {
    // 准备数据
    // 调用
    const n = sum()
    // 验证
    expect(n).toBe(20)
  })
})

// function.js
export const num1 = () => {
  return 10
}

export const num2 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve(10)
    }, 0)
  })
}
// index.js
import { num1 } from "./function"

export const sum = () => {
  return num1() * 2
}
```

需要注意的是在使用**vi.mock**的时候，并不会在意过多的逻辑实现，比如说，一个方法里面有一堆逻辑去处理这个数据，在mock的时候，只关心方法返回值是什么、数据格式的等等，在mock的时候就写什么就行了。

* 多个测试不共同使用一个vi.mock

```ts
// function.spec.js
import { it, expect, describe, vi } from 'vitest'
import { sum } from './index'
// 不共用mock需要将要改变的函数导入进来
import { num1 } from './function'
import 
vi.mock('./function')

describe("间接输入", () => {
  it("vi.mock 不公用一个vi.mock", () => {
    // 准备数据: 不共用mock 第一个参数即将被改变的函数名 通过mockReturnValue赋值
    vi.mocked(num1).mockReturnValue(10)
    // 调用
    const n = sum()
    // 验证
    expect(n).toBe(20)
  })
})
```

这样多个测试就可以在实际情况对数据进行更改，不同测试拥有不相同的数据

### 1.2 vi.doMock 

vi.doMock 和 vi.mock在使用方法是相同的，vi.doMock可以让测试与测试之间就不会共用相同的数据，不同之处在于doMock没有提升，并且他只会在下次导入模块的时候才会被调用

```ts
describe("间接输入", () => {
  it.only('vi.doMock', async () => {
    // 准备数据
    vi.doMock('./function', () => {
      return {
        num1: () => 2
      }
    })
	// 下一次模块导入
    const { sum } = await import('./index')
    //调用
    const n = sum()
    // 验证
    expect(n).toBe(4)
  })
})
```

