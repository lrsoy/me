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

`调用其他模块导出的函数获得数据` 或`通过异步api获得到的数据`，并且参加当前函数进行计算。

例如：

<CodeGroup>

  <CodeGroupItem title="index.ts" active>

```ts
import {numsA,numsB} from 'config.ts'
export const sum =()=> {
    return numsA() * 2
}
```

  </CodeGroupItem>

  <CodeGroupItem title="config.ts" >

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

  </CodeGroupItem>

</CodeGroup>

上面的例子可以看到，调用`sum` 里面的`numA`就属于间接输入



### 1.1 vi.mock 

定义：

* 用于替换真实的逻辑实现，也就是说，调用函数获取数据，间接的获取数据的时候，这个数据很有可能来自**后端提供的接口里面的数据**，因为接口提供的数据是变化的，接口数据变了就会导致测试的结果不通过，就要去手动的去更改**验证的结果**，也有可能这个数据来自本都存储。

使用： 

* **vi.mock**第一个参数，供的 `path，文件路径` 替换所有导入的模块为另一个模块，第二个接受的参数是**工程函数**，这个函数可以是异步的，在工厂函数里面给对应的值，然后去完成测试，这样避免**间接接入的数据影响到测试结果**

需要了解的是，vi.mock 是有提升的，也就是说无论这个写在测试文件的那个位置，最终他都会被提升到代码的最前面。

* 多个测试可以共用一个vi.mock

<CodeGroup>

  <CodeGroupItem title="index.spec.ts" active>

```ts
import { it, expect, vi } from 'vitest'
import { addition, multiplication } from './index'

vi.mock('./config', () => {
  return {
    increment: () => 3
  }
})
it('共同使用一个mock 加法', () => {
  // 准备数据
  // 调用
  const n = addition()
  // 验证
  expect(n).toBe(4)
})

it('共同使用一个mock 减法', () => {
  // 准备数据
  // 调用
  const n = multiplication()
  // 验证
  expect(n).toBe(6)
})
```

  </CodeGroupItem>

 <CodeGroupItem  title="index.ts">

```ts
import { increment } from './config'

// 加法
export const addition = () => {
  return increment() + 1
}


// 乘法
export const multiplication = () => {
  return increment() * 2
}
```

 </CodeGroupItem>

<CodeGroupItem  title="config.ts">

```ts
export const increment = (): number => 2 
```

 </CodeGroupItem>

</CodeGroup>



![](/vitest/share-vi-mock.png)



需要注意的是在使用**vi.mock**的时候，并不会在意过多的逻辑实现，比如说，一个方法里面有一堆逻辑去处理这个数据，在mock的时候，只关心方法返回值是什么、数据格式的等等，在mock的时候就写什么就行了。

* 多个测试不共同使用一个vi.mock

```ts
// function.spec.js
import { it, expect, describe, vi } from 'vitest'
import { addition } from './index'
// 不共用mock需要将要改变的函数导入进来
import { increment } from './config'
vi.mock('./config')
describe("间接输入", () => {
  it("vi.mock 不公用一个vi.mock", () => {
    // 准备数据: 不共用mock 第一个参数即将被改变的函数名 通过mockReturnValue赋值
    vi.mocked(increment).mockReturnValue(10)
    // 调用
    const n = addition()
    // 验证
    expect(n).toBe(11)
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
    vi.doMock('./config', () => {
      return {
        increment: () => 2
      }
    })
	// 下一次模块导入
    const { addition } = await import('./index')
    //调用
    const n = addition()
    // 验证
    expect(n).toBe(3)
  })
})
```

注：在编写测试的时候，doMock在js里面会出现问题，就是无法提前调用import，mock不能进行替换，所以可以先尝试在ts里面去编写



解决：

当`vi.doMock`在js里面使用的时候会出现无法提前调用导入的问题，通过`issues`得到了答案

![](/vitest/20230802164016.png)



Vitest 自动删除 TypeScript 文件中未使用的导入，因此您的示例在 ts 文件中可以正常工作。

模块被缓存，因此下次导入会返回已评估的结果。 vi.doMock 会清除指定模块的缓存，但不会清除导入它的模块的缓存，您需要自己调用` vi.resetModules `来清除缓存：

<CodeGroup>

  <CodeGroupItem title="increment.spec.js" active>

```js
import { it, expect, describe, vi, beforeEach } from 'vitest';
import { ride } from './index';

describe('间接输入', () => {
  beforeEach(() => {
    // 清除缓存
    vi.resetModules();
  });
  it('vi.doMock', async () => {
    // 准备数据
    vi.doMock('./increment.js', () => ({ increment: () => 100 }));
    const { ride } = await import('./index');
    //调用
    const n = ride();
    // 验证
    expect(n).toBe(200);
  });
});

```

 </CodeGroupItem>

<CodeGroupItem title="increment.js" >

```ts
export const increment = () => {
  return 10
}
```

 </CodeGroupItem>

<CodeGroupItem title="index.js" >

```ts
import { increment } from "./increment"

export const ride = () => {
  return increment() * 2
}
```

 </CodeGroupItem>

</CodeGroup>





## 二、第三方库、对象、class、常量

### 2.1 第三方库（例：axios）

在真实开发过程中，**axios **算是使用最频繁的一个第三方库了，还有一些例如**lodash、dayjs**等等，这些都是第三方的工具库，以axios为例，演示如何测试第三方工具库，其他工具库在具体使用时根据具体情况进行测试。

<CodeGroup>

  <CodeGroupItem title="thirdpartylibrary.ts" active>

```ts
import axios from 'axios'
export const questSentences = async () => {
  const res = await axios({
    method: 'get',
    url: 'https://api.apiopen.top/api/sentences'
  })
  if (res.data.code === 200) {
    return true
  }
  return false
}
```

 </CodeGroupItem>

<CodeGroupItem title="thirdpartylibrary.spec.ts" >

```ts
import { describe, it, expect, vi } from 'vitest'
import { questSentences } from '../src/thirdpartylibrary'
import axios from 'axios'

// 第三方模块测试：如果对axios进行了二次封装，在vi.mock的时候就需要将二次封装的函数导入进来

vi.mock('axios')
describe('第三方库测试', () => {

  it('测试请求图片接口 axios', async () => {
    // 准备数据
    vi.mocked(axios).mockResolvedValue({ data: { code: 200 } })
    // 调用
    const r = await questSentences()
    // 验证
    expect(r).toBeTruthy()
  })

})
```

 </CodeGroupItem>

</CodeGroup>

![](/vitest/Indirect-input-third-party-api-axios.png)

在实际开发中可能针对一些网络请求的工具库进行二次封装`axios` 在测试的时候如下

<CodeGroup>

  <CodeGroupItem title="request.ts" active>

```ts
export default class Axios {
    constructor(){...}
    _interceptors(){...}
    request(){...}
    resetUrl(){...}
    get(){....}
    post(){....}
}
export const instance = new Axios
```

   </CodeGroupItem>

   <CodeGroupItem title="*.spec.ts" active>

```ts
import { describe, it, expect, vi } from 'vitest'
import { instance } from './request'

// 此时这个位置 vi.mock的时候，就需要传入的是二次封装的函数
vi.mock('instance')
describe('第三方库测试', () => {
  it('测试请求图片接口 axios', async () => {
    // 准备数据
    vi.mocked(instance).mockResolvedValue() // 普通调用
    vi.mocked(instance.get).mockResolvedValue() // .get
    vi.mocked(instance.post).mockResolvedValue() // .post
    // 调用
    // 验证
  })
})
```

   </CodeGroupItem>

</CodeGroup>

### 2.2 对象

测对象，一般测试从两方面进行测试，对象的属性以及对象的方法，当一个函数在使用某一个对象里面的**属性或方法**，如何通过`vitest`进行测试，例：

<CodeGroup>

  <CodeGroupItem title="obj.ts" active>

```ts
export const obj = {
  name: '小明',
  status: false,
  ageLogFun() {
    return this.status
  }
}
export const objKeyTest = () => {
  if (obj.status === true) {
    return 18
  }
  return '错误信息'
}
export const objFuncTest = () => {
  return obj.ageLogFun() ? 'yes' : 'no'
}
```

   </CodeGroupItem>

  <CodeGroupItem title="obj.spec.ts" >

```ts
import { describe, it, vi, expect } from 'vitest'
import { objKeyTest, obj, objFuncTest } from '../src/obj'
// 测试在方法里面用获取对象里面值的时候，如果测试对象的属性以及方法
describe("对象", () => {
  // 测试对象属性
  it("对象属性的测试", () => {
    // 准备数据： 针对对象属性直接对对象的值进行更改
    obj.status = true
    // 调用
    const r = objKeyTest()
    // 验证
    expect(r).toBe(18)
  })
  // 测试对象上面的方法
  it("对象方法的测试", () => {
    // 准备数据: 和测试对象属性相同的方式，对 对象的方法进行赋值即可
    obj.ageLogFun = () => {
      return false
    }
    // 调用
    const r = objFuncTest()
    // 验证
    expect(r).toBe('no')
  })
})
```

   </CodeGroupItem>

</CodeGroup>

测试对象属性以及对象方法时，直接对其进行更改即可，没什么需要注意的地方，注意的是在更改时直接赋值结果，不考虑逻辑实现。

### 2.3 class

在测试class的时候，需要测试的是**类的属性以及类的方法**，需要注意的是，当类里面方法涉及到参数时，需要在new class的时候传递参数，需要遵从**最小数据原则**，去优化传参问题

<CodeGroup>

  <CodeGroupItem title="class.ts" active>

```ts
import { User } from './config'
export const testClassAttribute = () => {
  const user = new User()

  return user.age * 10
}
export const testClassFunc = () => {
  const user = new User()

  return user.getAge() * 10
}
```

</CodeGroupItem>

 <CodeGroupItem title="config.ts" >

```ts
export class User {
  age: number = 18
  name: string = '小明'
  getAge() {
    return this.age
  }
}
```

</CodeGroupItem>

<CodeGroupItem title="class.spec.ts" >

```ts
import { describe, it, expect, vi } from 'vitest'
import { User } from '~/config'
import { testClassAttribute, testClassFunc } from '~/class'

// 测试类属性
vi.mock('~/config', () => {
  return {
    User: class User {
      age: number = 10
    }
  }
})

// 测试类方法 01
vi.mock('~/config', () => {
  return {
    User: class User {
      getAge() {
        return 2
      }
    }
  }
})

describe('class 类', () => {
  it.skip("class 类属性", async () => {
    // 准备数据
    // 调用
    const r = testClassAttribute()
    // 验证
    expect(r).toBe(100)
  })
  it.skip("class 方法 01", () => {
    // 准备数据
    // 调用
    const r = testClassFunc()
    // 验证
    expect(r).toBe(20)
  })
  it("class 方法 02", () => {
    // 准备数据：通过原型链 prototype 去更改数据
    User.prototype.getAge = () => 3
    // 调用
    const r = testClassFunc()
    // 验证
    expect(r).toBe(30)
  })
})
```



</CodeGroupItem>

</CodeGroup>



在测试class的时候避免要测试的数据和使用数据的方法存放在一个文件里，由于vi.mock的底层问题，如果放在一起，会导致测试结果是不通过的，所以在测试的时候需要分开存放，为什么要这样(待补充......)

错误示范

<CodeGroup>

  <CodeGroupItem title="user.ts" active>

```ts
// user.ts ： 当testClassAttribute 要使用的数据和他存在一个文件内
export class User {
  age: number = 18
  name: string = '小明'
}

export const testClassAttribute = () => {
  const user = new User()
  return user.age * 10
}
```

</CodeGroupItem>

<CodeGroupItem title="user.spec.ts" >

```ts
import { describe, it, expect, vi } from 'vitest'
import { testClassAttribute } from '~/user'

// 准备数据
vi.mock("~/class", async (importOriginal) => {
  const config = await importOriginal()
  return {
    ...config as any,
    User: class User {
      age: number = 10
    }
  }
})

describe('class 类', () => {
  it.skip('失败： 测试class 属性', () => {
    const r = testClassAttribute()
    expect(r).toBe(100)
  })
})
```

</CodeGroupItem>

</CodeGroup>

测试结果

![](/public/vitest/914038464f7f7c6173ae38db64e2872.png)

### 2.4 常量

<CodeGroup>

  <CodeGroupItem title="variable.spec.ts" active>

```ts
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { variableTest } from '~/variable'

// 准备数据
vi.mock("~/config", async (importOriginal) => {
  const config = await importOriginal()
  /* 
    问题：
      值得注意的是，如果这里直接返回的是name，那么如果在variable.ts文件里面我在调用另一个常量
      就会导致测试结果是失败的，原因是在vi.mock的时候，他返回了name,并没有将其他值返回出去，
      所以在测试的时候结果是错误的，因为vi.mock没有将其他值一并返回
    解答：
      01.
        vi.mock的第回调函数接受一个 importOriginal 参数，这个参数的返回值如下:
        [Object: null prototype] [Module] {
          User: [Getter],
          name: [Getter],
          age: [Getter]
        }
        是一个对象，所以可以通过importOriginal获取到，然后通过展开语法直接合并到返回对象里即可，
      02.
        通过 vi.importActual 获取
        const config = await vi.importActual('~/config')
        这样也是可以获取的，但是这样就会给我们自己增加工作量，当文件位置发生改变或者是文件名变更，需要
        一个一个的更改，所以不推荐使用

  */
  return {
    ...config as any,
    name: 'vitest'
  }
})
describe('常量', () => {

  it("常量测试", () => {

    // 调用
    const r = variableTest()
    // 验证
    expect(r).toBe('vitest是一个测试框架')

  })

})
```

</CodeGroupItem>

  <CodeGroupItem title="variable.ts" >

```ts
import { age, name } from './config'

export const variableTest = () => {
  return name + '是一个测试框架'
}

```

</CodeGroupItem>

  <CodeGroupItem title="config.ts" >

```ts
export const name = 'test'
export const age = 18
```

</CodeGroupItem>

</CodeGroup>



在测试常量的时候需要值得注意的两个点

一般情况下，这些常量会被放在一个文件内进行管理，当在测试某一个常量的时候，通常会在测试准备数据阶段将这个数据通过**vi.mock**进行替换，注意此时我们只测试一个常量，此时我在实现逻辑的时候，我需要了另一个常量，这时我们的测试是不通过的，原因就是在mock的时候，我只对上一个数据做了mock，mock在替换数据的时候是只保留写的常量，其他常量是没有被返回的，所以导致测试失败

<CodeGroup>

  <CodeGroupItem title="variable.spec.ts" active>

```ts
vi.mock("~/config", async (importOriginal) => {
    return {
        name: 'vitest'
    }
})
describe('常量', () => {
  it("常量测试", () => {
    const r = variableTest()
    expect(r).toBe('vitest是一个测试框架')
  })
})
```

</CodeGroupItem>

  <CodeGroupItem title="variable.ts" >

```ts
export const variableTest = () => {
  console.log(age) // 会报错
  return name + '是一个测试框架'
}
```

</CodeGroupItem>

  <CodeGroupItem title="config.ts" >

```ts
export const name = 'test'
export const age = 18
```

</CodeGroupItem>

</CodeGroup>

![](/public/vitest/c9d1a30235569f6dcad2e89f5886979.png)

```ts
// 解决：
vi.mock("~/config", async (importOriginal) => {
  01 vi.mock的第回调函数接受一个 importOriginal 参数，这个参数的返回值如下
  const config = await importOriginal()
  
  02 通过 vi.importActual 获取
  const config = await vi.importActual('~/config')
  return {
    // 将获取到的 config 合并到里面
    ...config as any,
    name: 'vitest'
  }
})
```

![](/public/vitest/b2cb868457de7a741bd98a501f2a660.png)



## 三、环境变量、全局global、间接输入层

### 3.1 环境变量

环境变量，在开发过程中，我们会在项目里面创建`.env` 文件或者是其他的文件，在里面配置环境变量，最常见的就是项目的`数据请求地址`，我们需要在不同环境，创建不同的环境变量，配置不同环境的请求地址，比如测试环境、开发环境、生产环境等。

* nodejs环境变量

<CodeGroup>

  <CodeGroupItem title="env.ts" active>

```ts
export const testNodeEnv = () => {
  return Number(process.env.USER_AGE) * 2
}
```

</CodeGroupItem>

  <CodeGroupItem title="env.spec.ts" >

```ts
import { describe, expect, it, vi, afterEach } from 'vitest'
import { testNodeEnv } from './env'
/**
 * 第一种方式：直接对nodejs的环境变量直接进行赋值，然后进行测试
 * 缺点: 直接对环境变量进行赋值，在其他测试ks里面在次测试这个变量，值就是上一次更改的值没有重新初始化
 */
it.skip("测试nodejs环境变量 01 方式一", () => {
  // 准备数据： 通过直接赋值的方式，对指定的环境变量进行赋值
  process.env.USER_AGE = "2"
  // 调用
  const r = testNodeEnv()
  // 验证
  expect(r).toBe(4)
})

/**
 * 第二种方式: 通过vitest提供的api ,vi.stubEnv，配合vi.unstubAllEnvs()一起使用
 */
afterEach(() => {
  // 拆卸: 配合 将换将变量恢复
  vi.unstubAllEnvs()
  console.log(process.env.USER_AGE);
})
it('测试nodejs环境变量 02 方式二', () => {
  // 准备数据: 通过使用vitest提供的api
  vi.stubEnv('USER_AGE', "2")
  // 调用
  const r = testNodeEnv()
  // 验证
  expect(r).toBe(4)
  // 拆卸: 配合 将换将变量恢复
  // vi.unstubAllEnvs()
})
```

</CodeGroupItem>

</CodeGroup>

测试nodejs环境变量的第二种方式是经常使用到的，并且他是可以将环境变量恢复到原有值的

![](/public/vitest/616909c1a6e7be318f54e8e99b1a156.png)



* vite&webpack

<CodeGroup>

  <CodeGroupItem title="vite.ts" active>

```ts
export const testViteEnv = () => {
  return Number(import.meta.env.VITE_USER_AGE) * 2
}
```

</CodeGroupItem>

  <CodeGroupItem title="vite.spec.ts" >

```ts
import { describe, it, vi, expect, afterEach } from 'vitest'
import { testViteEnv } from './vite'


afterEach(() => {
  vi.unstubAllEnvs()
  console.log(import.meta.env.VITE_USER_AGE);
})
it("测试import.meta.env", () => {

  // 准备数据
  vi.stubEnv('VITE_USER_AGE', '4')

  // 调用
  const r = testViteEnv()

  // 验证
  expect(r).toBe(8)

})
```

</CodeGroupItem>

</CodeGroup>

需要注意的就是，在不同项目中配置环境变量，命名也是有所不同的，但是获取环境变量的方式一般是：

Vue CLI 和 Vue 2/3 项目：

- 在Vue CLI 3及以上版本中，可以通过Webpack的**process.env**对象来获取环境变量。例如，可以使用**process.env.VUE_APP_API_URL**来获取名为**VUE_APP_API_URL**的环境变量的值。

Create React App (CRA) 和 React 项目：

- 在Create React App中，默认使用Webpack和Babel进行构建。可以通过**process.env**对象来获取环境变量。例如，可以使用**process.env.REACT_APP_API_URL**来获取名为**REACT_APP_API_URL**的环境变量的值。

Vite 项目：

- 在Vite中，可以通过**import.meta.env**来访问环境变量。例如，可以使用**import.meta.env.VITE_API_URL**来获取名为**VITE_API_URL**的环境变量的值。

需要注意的是，以上方式仅适用于在代码中直接访问环境变量。在构建过程中，这些环境变量会根据所定义的环境变量文件（如`.env`、`.env.development`、`.env.production`等）进行注入。

在构建过程中，Webpack或Vite会读取对应的环境变量文件，并将其中定义的变量注入到应用程序中，以便在代码中使用。不同的构建工具和配置可能有所不同，但通常会遵循相应的约定和配置规则。

总结：

- Vue CLI和Vue 2/3项目可以通过Webpack的**process.env**对象获取环境变量。
- Create React App (CRA)和React项目可以通过Webpack的**process.env**对象获取环境变量。
- Vite项目可以通过**import.meta.env**来访问环境变量。
- 构建过程中，Webpack或Vite会根据环境变量文件将变量注入到应用程序中，以便在代码中使用。

### 3.2 全局global

全局变量，例如挂载到window上的都属于全局属性，在任何地方代码里都是可以，当测试的时候可以通过vitest提供的api去测试

<CodeGroup>

  <CodeGroupItem title="global.ts" active>

```ts
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

通过使用**vi.stubGlobal**对全局属性进行修改，然后修改后可以通过**unstubAllGlobals**恢复原有的值

### 3.3 间接输入层

间接层处理技巧就是将难测的代码抽离出去，通过`函数`或者`对象`的方式进行包裹，然后通过`vi.mock`或者是其他的方式来代替这块难测的逻辑。

## 四、依赖注入

依赖注入（Dependency Injection，DI）是一种设计模式和软件开发技术，用于解耦组件之间的依赖关系。它的核心思想是将依赖的创建和管理责任从被依赖的对象（被注入对象）转移到外部的依赖注入容器（或者称为注入器）中。

在依赖注入中，组件不再直接创建或获取它所依赖的对象，而是通过外部的注入器将依赖对象注入到组件中。这样可以实现组件的解耦，提高代码的灵活性、可测试性和可维护性。

简单的来说**无论是通过类还是函数，依赖注入的核心思想是将依赖项封装起来并通过参数传递给需要解耦的函数或组件**

## 五、依赖倒置原则(DIP)

依赖倒置原则（Dependence Inversion Principle）是程序要依赖于抽象接口，不要依赖于具体实现。

依赖倒置原则：

* 高层次的模块不应该依赖低层次模块，二者都应该依赖起抽象接口
* 抽象接口不应该依赖于具体实现，而具体实现应该依赖抽象接口

在遇到需要解耦的情况，可以考虑使用**依赖倒置原则**，通过类来实现抽象接口，来减少高层模块对低层模块的直接依赖，以下是指导原则

* 确定高层模块和低层模块：首先要明确哪些是低层模块，以便于更好的使用**依赖倒置原则**
* 定义抽象接口**interface**
* 使用**class(类)**实现**接口(interface)**：在高层模块中通过类来实现抽象接口，这样高层模块就可以依赖于抽象接口而不是具体的底层实现
* 使用**依赖注入**传递**依赖**

例1：

```ts
import { readFileSync } from 'fs'

export function readAndProcessFile(filePath: string) {
  const content: string = readFileSync(filePath, { encoding: 'utf-8' })
  return content + "=> test unit"
}
```

上面是一段通过使用nodejs里面的fs模块获取文件内容，从这段代码中看，**fs**和**readFileSync**属于依赖项，而**readAndProcessFile**属于高层模块，readAndProcessFile强依赖fs模块，**利用依赖注入与依赖倒置原则来解耦**

```ts
import { readFileSync } from 'fs'
// 抽象接口
export interface Fileint {
  readFile(filePath: string): string;
}
// 类去实现抽象接口
export class FileReader implements Fileint {
  readFile(filePath: string): string {
    return readFileSync(filePath, { encoding: 'utf-8' });
  }
}
// 高层模块
export function readAndProcessFile(filePath: string, fileReader: Fileint) {
  const content: string = fileReader.readFile(filePath)
  return content + "=> test unit"
}


const files = new FileReader()
// 依赖注入，将低层模块通过参数方式传入高层模块
readAndProcessFile('./test', files)
```



### 5.1 使用mock与中间层的方式解决程序间接输入

* 使用中间层的方式，由于函数处理的逻辑是依赖于间接输入的，也就是**fs模块**，将这部分的代码抽离出去，通过mock的方式进行测试

<CodeGroup>

  <CodeGroupItem title="file.ts" active>

```ts
import { interlayer } from './config'

// 不解决耦合问题
export function readAndProcessFilePt(filePath: string) {
  const content: string = interlayer(filePath)
  return content + "=> test unit"
}
```

</CodeGroupItem>

  <CodeGroupItem title="config.ts" >

```ts
import { readFileSync } from 'fs'
export const interlayer = (filePath: string) => {
  return readFileSync(filePath, { encoding: 'utf-8' })
}
```

</CodeGroupItem>

  <CodeGroupItem title="file.spec.ts" >

```ts
import { describe, it, vi, expect } from 'vitest'
import { readAndProcessFilePt } from './file'
vi.mock('./config', () => {
  return {
    interlayer: () => {
      return '测试'
    }
  }
})
it("依赖注入, 不解决耦合", () => {
  // 调用
  const r = readAndProcessFilePt('./test')
  // 验证
  expect(r).toBe('测试=> test unit')

})
```

</CodeGroupItem>

</CodeGroup>

* 不使用中间层

<CodeGroup>

  <CodeGroupItem title="file.ts" active>

```ts
import { readFileSync } from 'fs'
// 不使用中间层 直接通过mock进行测试
export function readAndProcessFileMock(filePath: string) {
  const content: string = readFileSync(filePath, { encoding: 'utf-8' })
  return content + "=> test unit"
}
```

</CodeGroupItem>

  <CodeGroupItem title=" file.spec.ts" >

```ts
import { describe, it, vi, expect } from 'vitest'
import { readAndProcessFileMock } from './file'
import * as fs from 'fs'

vi.mock('fs', () => {
  return {
    readFileSync: vi.fn(() => 'fs')
  }
})
it.only('依赖注入，直接使用mock进行测试', () => {

  // 准备数据
  // 调用
  const r = readAndProcessFileMock('./test')

  // 验证
  expect(r).toBe('fs=> test unit')
})
```

</CodeGroupItem>

</CodeGroup>

### 5.2 依赖倒置原则解决程序间接输入(function)

<CodeGroup>

  <CodeGroupItem title="file.ts" active>

```ts
import { Fileint } from './type'
// 解决耦合 加入接口限制
export function readAndProcessFileCabInterface(filePath: string, cab: Fileint) {
   const content: string = cab.read(filePath)
   return content + "=> test unit"
}
```

</CodeGroupItem>

<CodeGroupItem title="index.ts" >

```ts
import { readAndProcessFileCab, readAndProcessFileCabInterface } from './file'
import { readFileSync } from 'fs'
import { Fileint } from './type'
import path from 'path'

export class FileReaderInterface implements Fileint {
  read(filePath: string) {
    return readFileSync(filePath, { encoding: 'utf-8' })
  }
}
const fri = new FileReaderInterface()
readAndProcessFileCabInterface(filePath, fri)
```

</CodeGroupItem>

<CodeGroupItem title="type.ts" >

```ts
export interface Fileint {
   read(filePath: string): string;
}
```

</CodeGroupItem>

<CodeGroupItem title="file.spec.ts" >

```ts
import { describe, it, vi, expect } from 'vitest'
import { readAndProcessFileCabInterface } from './file'
import { Fileint } from './type'
it('依赖注入，依赖倒置原则', () => {
   // 准备数据
   class FileReader implements Fileint {
     read(filePath: string) {
       return 'fri'
     }
   }
   // 调用
   const r = readAndProcessFileCabInterface('./test', new FileReader())
   // 验证
   expect(r).toBe('fri=> test unit')
})
```



</CodeGroupItem>

</CodeGroup>



### 5.3 class如何去使用依赖倒置原则

在测试class的时候，有三种方式可以对它进行测试分别是：

* 构造函数
* 属性
* 方法

#### 5.3.1 通过构造函数的方式

通过构造器将这个依赖以参数的形式传进来

<CodeGroup>

  <CodeGroupItem title="classFile.spec.ts" active>

```ts
import { vi, expect, it } from 'vitest'
import { ReadAndProcessFile } from './classFile'
import { Fileint } from './type'

it('通过构造函数', () => {
  // 准备数据
  class FileRender implements Fileint {
    read(filePath: string): string {
      return 'cs'
    }
  }
  // 调用
  const file = new ReadAndProcessFile(new FileRender())

  // 验证
  expect(file.run('./test')).toBe('cs=> test unit')

})
```

</CodeGroupItem>

  <CodeGroupItem title="classFile.ts" >

```ts
import { readFileSync } from 'fs'
import { Fileint } from './type'
// 通过构造器将这个依赖传进来
export class ReadAndProcessFile {
  private _fileRender: Fileint
  constructor(fileRender: Fileint) {
    this._fileRender = fileRender
  }
  run(filePath: string) {
    const content: string = this._fileRender.read(filePath)
    return content + "=> test unit"
  }
}
```

</CodeGroupItem>

  <CodeGroupItem title="type.ts" >

```ts
export interface Fileint {
  read(filePath: string): string;
}
```

</CodeGroupItem>

</CodeGroup>

![](/vitest/Dependency-injection-class-constructor.png)

#### 5.3.2 通过属性的方式

通过给class设置`set`方法的形式

<CodeGroup>

  <CodeGroupItem title="classFile.spec.ts" active>

```ts
import { vi, expect, it } from 'vitest'
import {  ReadAndProcessFileAttribute } from './classFile'
import { Fileint } from './type'

it.only("通过属性的方式", () => {
  // 准备数据
  class FileRender implements Fileint {
    read(filePath: string): string {
      return 'cv'
    }
  }

  // 调用
  const file = new ReadAndProcessFileAttribute()
  // 属性直接赋值
  file.fileRender = new FileRender()
  // 验证

  expect(file.run('./test')).toBe('cv=> test unit')
})
```

</CodeGroupItem>

<CodeGroupItem title="classFile.ts" >

```ts
export class ReadAndProcessFileAttribute {
  private _fileRender: any
  run(filePath: string) {
    const content: string = this._fileRender.read(filePath)
    return content + "=> test unit"
  }
  set fileRender(fileRender: Fileint) {
    this._fileRender = fileRender
  }
}
```

</CodeGroupItem>

<CodeGroupItem title="type.ts" >

```ts
export interface Fileint {
  read(filePath: string): string;
}
```

</CodeGroupItem>

</CodeGroup>

![](/vitest/Dependency-injection-class-attribute.png)

#### 5.3.3 通过方法的方式

通过方法的方式和设置属性的方式类似

<CodeGroup>

  <CodeGroupItem title="classFile.spec.ts" active>

```ts
import { vi, expect, it } from 'vitest'
import { ReadAndProcessFileFun } from './classFile'
import { Fileint } from './type'
it.only('通过方法的方式', () => {
  // 准备数据
  class FileRender implements Fileint {
    read(filePath: string): string {
      return 'cb'
    }
  }

  // 调用
  const file = new ReadAndProcessFileFun()
  // 调用方法 
  file.setFileRender(new FileRender())
  // 验证
  expect(file.run('./test')).toBe('cb=> test unit')

})
```

</CodeGroupItem>

<CodeGroupItem title="classFile.ts" >

```ts
export class ReadAndProcessFileFun {
  private _fileRender: any
  run(filePath: string) {
    const content: string = this._fileRender.read(filePath)
    return content + "=> test unit"
  }

  setFileRender(fileRender: Fileint) {
    this._fileRender = fileRender
  }
}
```

</CodeGroupItem>

<CodeGroupItem title="type.ts" >

```ts
export interface Fileint {
  read(filePath: string): string;
}
```

</CodeGroupItem>

</CodeGroup>

![](/vitest/Dependency-injection-class-function.png)