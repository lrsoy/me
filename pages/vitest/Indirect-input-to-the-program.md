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

用于替换真实的逻辑实现，也就是说，调用函数获取数据，间接的获取数据的时候，这个数据很有可能来自**后端提供的接口里面的数据**，因为接口提供的数据是变化的，接口数据变了就会导致测试的结果不通过，就要去手动的去更改**验证的结果**，也有可能这个数据来自本都存储。

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

注：在编写测试的时候，doMock在js里面会出现问题，就是无法提前调用import，mock不能进行替换，所以可以贤尝试在ts里面去编写



## 二、第三方库、对象、class、常量

### 2.1 第三方库（例：axios）

在真实开发过程中，**axios **算是使用最频繁的一个第三方库了，还有一些例如**lodash、dayjs**等等，这些都是第三方的工具库，以axios为例，演示如何测试第三方工具库，其他工具库在具体使用时根据具体情况进行测试。

```ts
// thirdpartylibrary.ts
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

```ts
// thirdpartylibrary.spec.ts
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

在实际开发中可能针对一些网络请求的工具库进行二次封装`axios` 在测试的时候如下

```ts
// 例：request.ts
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

```ts
// *.spec.ts
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

### 2.2 对象

测对象，一般测试从两方面进行测试，对象的属性以及对象的方法，当一个函数在使用某一个对象里面的**属性或方法**如何通过`vitest`进行测试，例：

```ts
// obj.ts
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

```ts
// obj.spec.ts
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

测试对象属性以及对象方法时，直接对其进行更改即可，没什么需要注意的地方，注意的是在更改时直接赋值结果，不考虑逻辑实现。

### 2.3 class

在测试class的时候，需要测试的是**类的属性以及类的方法**，需要注意的是，当类里面方法涉及到参数时，需要在new class的时候传递参数，需要遵从**最小数据原则**，去优化传参问题

```ts
// class.ts
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

```ts
// config.ts
export class User {
  age: number = 18
  name: string = '小明'
  getAge() {
    return this.age
  }
}
```

```ts
// class.spec.ts
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

在测试class的时候避免要测试的数据和使用数据的方法存放在一个文件里，由于vi.mock的底层问题，如果放在一起，会导致测试结果是不通过的，所以在测试的时候需要分开存放，为什么要这样(待补充......)

错误示范

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

```ts
// user.spec.ts
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

测试结果

![](/public/vitest/914038464f7f7c6173ae38db64e2872.png)

### 2.4 常量

```ts
// variable.ts
import { age, name } from './config'

export const variableTest = () => {
  return name + '是一个测试框架'
}

```

```ts
// config.ts
export const name = 'test'
export const age = 18
```

```ts
// variable.spec.ts
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

在测试常量的时候需要值得注意的两个点

一般情况下，这些常量会被放在一个文件内进行管理，当在测试某一个常量的时候，通常会在测试准备数据阶段将这个数据通过**vi.mock**进行替换，注意此时我们只测试一个常量，此时我在实现逻辑的时候，我需要了另一个常量，这时我们的测试是不通过的，原因就是在mock的时候，我只对上一个数据做了mock，mock在替换数据的时候是只保留写的常量，其他常量是没有被返回的，所以导致测试失败

```ts
// 问题：
- config.ts
export const name = 'test'
export const age = 18

- variable.ts
export const variableTest = () => {
  console.log(age) // 会报错
  return name + '是一个测试框架'
}

- variable.spec.ts
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

```ts
// env.ts
export const testNodeEnv = () => {
  return Number(process.env.USER_AGE) * 2
}
```

```ts
// env.spec.ts
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

测试nodejs环境变量的第二种方式是经常使用到的，并且他是可以将环境变量恢复到原有值的

![](/public/vitest/616909c1a6e7be318f54e8e99b1a156.png)



* vite&webpack

```ts
// vite.ts
export const testViteEnv = () => {
  return Number(import.meta.env.VITE_USER_AGE) * 2
}
```

```ts
// vite.spec.ts
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

```ts
// global.ts
export const testGlobalApi = () => {
  return innerHeight * 2
}
```

```ts
// global.spec.ts
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

通过使用**vi.stubGlobal**对全局属性进行修改，然后修改后可以通过**unstubAllGlobals**恢复原有的值

### 3.3 间接输入层

..... 待补充，没理解



## 四、依赖注入





