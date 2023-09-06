---
  title: 测试替身的类型 dummy stub spy mock fake
  display: 测试替身的类型 dummy stub spy mock fake
  image: /image/banner1.jpg
  description: 
  subtitle: 
  date: 2023-08-27
  type: vitest
  author: lrsoy
  toc: true
  duration: ""
---

<DelayTeleport>

[[toc]]
</DelayTeleport>



## dummy 哑元对象 

`占位符` 解决类型类型报错问题

例如：当一个函数有多个参数，在运行时只用到其中某一个了，没全用，在写测试的时候这个参数你也要传递给他，不传递ts就会有类型提示的问题，为了解决这种`类型错误`的问题，可以使用`dummy哑元对象`

其实就是以`dummy`命名开始的

例如：

```ts {11}
export interface Message {
  subject: string;
  body: string;
}

export interface Recipient {
  email: string;
  name: string;
}

export const sendEmail = (message: Message, rec: Recipient) => {
  console.log(message.body);
  console.log(message.subject);
}
```

```ts {10}
import { it, expect, vi } from 'vitest'
import { sendEmail, Recipient, Message } from './testStand'

it('dummy 哑元素 占位符 解决类型错误问题', () => {

  const message: Message = {
    subject: '测试',
    body: '测试',
  }
  const dummyRecipient = {} as Recipient
  const n = sendEmail(message, dummyRecipient)

})
```



## stub 测试桩

隔离依赖，更简单控制：专门用来处理程序间接输入的。

```ts
export const increment = (): number => 2 
```

```ts
import { increment } from './config'
export const addition = () => {
  increment输入程序的依赖：间接输入
  return increment() + 1
}
```

```ts
import { it, expect, vi } from 'vitest'
import { addition, multiplication } from './index'
vi.mock('./config', () => {
  return {
    increment: () => 3
  }
})
it('stub', () => {
  const n = addition()
  expect(n).toBe(4)
})

```

## spy 测试间谍



## mock 模拟对象



## fake 伪造对象

