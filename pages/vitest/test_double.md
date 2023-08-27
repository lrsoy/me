---
  title: 掌握使用 test double 测试替身的核心思想
  display: 掌握使用 test double 测试替身的核心思想
  image: /image/banner1.jpg
  description: 
  subtitle: 
  date: 2023-08-26
  type: vitest
  author: lrsoy
  toc: true
  duration: ""
---

<DelayTeleport>

[[toc]]
</DelayTeleport>

## 掌握使用 test double 测试替身的核心思想

将被测代码与周围隔开

* 加速执行测试
* 使执行测试变得确定
* 模拟特殊情况
* 暴露隐藏信息



加速执行测试

```ts {17,22,47,56,54}
例如：
1. 网络请求：当被测代码涉及到网络请求，网络请求等待返回时间不等。
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
import { describe, it, expect, vi } from 'vitest'
import { questSentences } from '../src/thirdpartylibrary'
import axios from 'axios'
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


2. setTimeout/setInterval
export class SetTimeOut {
  id: string;
  constructor(id: string) {
    this.id = id;
  }
  getSetTimeOut(callback: (data: any) => void, delay: number) {
    setTimeout(() => {
      callback(this.id)
    }, delay);
  }
}
import { vi, it, expect } from 'vitest'
import { SetTimeOut } from './timer'
it('如何测试 setTimeOut', () => {
  vi.useFakeTimers()
  // 准备数据
  const cb = vi.fn()
  // 调用
  const n = new SetTimeOut('1')
  n.getSetTimeOut(cb, 1000)
  1. 方式一
  vi.advanceTimersByTime(1000)
  2. 方式二
  vi.advanceTimersToNextTimer()
  // 验证
  expect(cb).toBeCalledWith('1')
})

```

使执行测试变得确定

```ts {16,17,18,35,38,43}
例如：
1. date：当在某一天需要才会执行这段代码，就要确定那个时间，保证测试是一直通过的
// 随机数的测试: 函数接收一个 长度值 感觉长度值循环随机从字符串中获取一个字符然后赋值给str
export function matchRandomCreateStr(lang: number): string {
  let str = ""
  const character = 'jdlkajlkcxznmfhkjshdfjkaduiasuirejkl'
  for (let index = 0; index < lang; index++) {
    const idx = Math.floor(Math.random() * character.length)
    str += character.charAt(idx)
  }
  return str
}
import { vi, it, expect } from 'vitest'
import { matchRandomCreateStr } from './mathRandom'
it('如何测试随机数', () => {
  vi.spyOn(Math, 'random').mockImplementation(() => {
    return 0.2
  })
  const n = matchRandomCreateStr(2)
  expect(n).toBe('kk')
})

2. 随机数
export function currentDate(): string {
  const date = new Date().getDay()
  if (date === 5) {
    return `今天是星期${date}`
  }
  return `今天是星期${date}`
}
import { vi, it, expect, afterEach, beforeEach } from 'vitest'
import { currentDate } from './dateRan'

beforeEach(() => {
  vi.useFakeTimers()
})
it('如何测试日期 固定值今天周五', () => {
  vi.setSystemTime(new Date(2023, 7, 4))
  const n = currentDate()
  expect(n).toBe('今天是星期5')
})
afterEach(() => {
  vi.useRealTimers()
})
```

模拟特殊情况

```ts
例如：
网络，发起网络请求，电脑不能上网了，这种情况。
可以通过将网络请求返回状态抛出异常等等操作方法
```

暴露隐藏信息

```ts {38,39,40}
例如:
一些方法内部私有的方法，外部无法获取到的值，又不能将其暴露
export class Engine {
  start() {
    this.isStart = true;
  }
  private isStart;
  running() {
    return this.isStart;
  }
}

import { Tires } from "./tires";
import { Engine } from "./engine";
export class Car {
  public engine: Engine;
  private tiresList: Tires[];
  constructor(engine: Engine) {
    this.engine = engine
    this.tiresList = [
      new Tires("1"),
      new Tires("2"),
      new Tires("3"),
      new Tires("4"),
    ];
  }

  start() {
    this.engine.start();
  }
}

import { describe, vi, expect, it } from "vitest";
import { Car } from "./Car";
import { Engine } from "./engine";
describe("car", () => {
  it("should start ", () => {
    const engine = new Engine();
    Engine.prototype.start = vi.fn();
    const car = new Car(engine);
    car.start();

    expect(Engine.prototype.start).toBeCalled();
  });
});
```