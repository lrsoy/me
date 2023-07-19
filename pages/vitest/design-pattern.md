---
  title: 常见的解耦技术和模式
  display: 常见的解耦技术和模式
  image: /image/banner1.jpg
  description: 
  subtitle: 
  date: 2023-07-17
  type: vitest
  author: lrsoy
  toc: true
  duration: ""
---


<DelayTeleport>

[[toc]]
</DelayTeleport>


## 五、常见的解耦技术和模式

常见的解耦方式有多种，以下列举了一些常用的解耦技术和模式：

1. 依赖注入（Dependency Injection）：通过将依赖的对象或服务注入到组件中，而不是在组件内部直接创建或获取依赖，实现组件与依赖之间的解耦。依赖注入可以通过构造函数注入、属性注入或方法注入等方式实现。
2. 适配器模式（Adapter Pattern）：通过封装一个适配器来转换一个接口或类的方法，以适应另一个接口或类的调用方式，从而解耦两者之间的依赖关系。
3. 观察者模式（Observer Pattern）：定义了一种一对多的依赖关系，使得当一个对象的状态发生变化时，所有依赖于它的对象都会得到通知。通过解耦观察者和被观察者之间的直接依赖关系，实现对象之间的松耦合。
4. 发布-订阅模式（Publish-Subscribe Pattern）：通过使用一个调度中心（也称为事件总线）来实现发布者（发布事件）和订阅者（订阅事件）之间的解耦。发布者不需要直接了解订阅者，只需要发布事件，而订阅者通过订阅感兴趣的事件来接收通知。
5. 中介者模式（Mediator Pattern）：通过引入一个中介者对象，将组件之间的通信转化为通过中介者进行的间接通信，从而解耦组件之间的直接依赖关系。
6. 接口隔离原则（Interface Segregation Principle）：将接口分离为多个较小的接口，以适应不同的客户端需求。这样可以避免客户端依赖于不需要的接口，从而实现解耦。
7. 依赖倒置原则（Dependency Inversion Principle）：高层模块不应该依赖于低层模块，而是应该依赖于抽象。通过依赖于抽象而不是具体实现，实现模块之间的解耦。

这些是常见的解耦方式和设计原则，它们可以在不同的场景中用于减少组件之间的耦合度，提高代码的可维护性、可测试性和可扩展性。具体选择哪种方式取决于具体的应用场景和需求

### 5.1  依赖注入

依赖注入的思想：依赖注入通过将依赖对象或服务注入到组件中，而不是在组件内部直接创建或获取依赖，实现组件与依赖之间的解耦，简单的来说，**无论是通过类还是函数，依赖注入的核心思想是将依赖项封装起来并通过参数传递给需要解耦的函数或组件**

示例代码：

```ts
import { readFileSync } from 'fs'
export class FileFs {
    getFilePath(path) {
        return readFileSync(path,{ encoding: 'utf-8' })
    }
}
```

```ts
import { FileFs } from './FileFs'

// 将需要解耦的依赖以参数的形式传入
export const readAndPath(filePath,cab) {
    const content = cab.getFilePath(path)
    return `${content}- test unit`
}
// 调用
const ua = readAndPath('./test',new FileFs())
```



### 5.2 适配器模式

适配器模式：适配器模式通过封装一个适配器来转换一个接口或类的方法，以适应另一个接口或类的调用方式，从而解耦两者之间的依赖关系，**适配器模式可以应用于许多场景，只要涉及到不同接口之间的兼容性问题，或者需要进行接口转换、数据格式转换等情况，适配器模式都可以起到很好的作用，适配器的主要目的是将不兼容的接口转换为兼容的接口**。



示例代码：

```ts
// 跨平台API兼容
// iOS DeviceInfo API
class iOSDeviceInfo {
  getDeviceId() {
    // 获取 iOS 设备 ID 的具体实现
  }

  getDeviceName() {
    // 获取 iOS 设备名称的具体实现
  }
}

// Android DeviceInfo API
class AndroidDeviceInfo {
  getDeviceId() {
    // 获取 Android 设备 ID 的具体实现
  }

  getDeviceName() {
    // 获取 Android 设备名称的具体实现
  }
}

// 适配器
class DeviceInfoAdapter {
  constructor(deviceInfo) {
    this.deviceInfo = deviceInfo;
  }

  getUniqueId() {
    return this.deviceInfo.getDeviceId();
  }

  getName() {
    return this.deviceInfo.getDeviceName();
  }
}

// 使用适配器
const iOSDevice = new iOSDeviceInfo();
const androidDevice = new AndroidDeviceInfo();

const iOSAdapter = new DeviceInfoAdapter(iOSDevice);
const androidAdapter = new DeviceInfoAdapter(androidDevice);

console.log(iOSAdapter.getUniqueId()); // 获取 iOS 设备 ID
console.log(androidAdapter.getName()); // 获取 Android 设备名称

```

说白了就是将不同平台的代码实现，然后在将他们集成到一个类里面，然后在调用的时候可以统一进行调用。



### 5.3 观察者模式



### 5.4 发布-订阅模式



### 5.5 中介者模式



### 5.6 接口隔离原则



### 5.7 依赖倒置原则



