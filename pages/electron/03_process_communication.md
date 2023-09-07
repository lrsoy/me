---
  title: 第三章 进程通信
  display: 第三章 进程通信
  image: /image/banner1.jpg
  description: 
  subtitle: 
  date: 2023-09-06
  type: electron
  author: lrsoy
  toc: true
  duration: ''
---
<DelayTeleport>

[[toc]]
</DelayTeleport>

### 多进程模型

Electron 将使用两种类型的进程：[主进程 (opens new window)](https://www.electronjs.org/zh/docs/latest/tutorial/process-model#the-main-process)和 [渲染器进程 (opens new window)](https://www.electronjs.org/zh/docs/latest/tutorial/process-model#the-renderer-process)。

![](/electron/chrome-processes-0506d3984ec81aa39985a95e7a29fbb8.png)

不同进程承载着不同的任务，本章讨论的进程通信（IPC）就是解决不同进程间任务传递的方式。

- 比如渲染进程通过主进程调用原生Node.js API，比如文件操作
- 主进程通过原生菜单改变渲染进程页面内容
- IPC通信使用 [`ipcMain` (opens new window)](https://www.electronjs.org/zh/docs/latest/api/ipc-main)和 [`ipcRenderer` (opens new window)](https://www.electronjs.org/zh/docs/latest/api/ipc-renderer)两个模块传递消息

#### 主进程

每个 Electron 应用都有一个单一的主进程，作为应用程序的入口点。 主进程在 Node.js 环境中运行，这意味着它具有使用 Node.js API 的能力。

主进程的主要目的是使用 [`BrowserWindow` (opens new window)](https://www.electronjs.org/zh/docs/latest/api/browser-window)模块创建和管理应用程序窗口。

#### 渲染进程器

每个 Electron 应用都会为使用 `BrowserWindow` 打开的窗口生成一个单独的渲染器进程。

默认情况下渲染进程与主进程使用 preload.js预加载做为通信桥梁

### 预加载脚本

预加载（preload）脚本的作用就是隔离开`主进程`与`渲染进程器`的直接接触，它是一个桥梁，用于主进程脚本与渲染脚本的连接。

它优先于网页内容**优先**加载代码，这些脚本虽然运行在渲染器的环境中，却能访问**有限**的Node.js、Electron高级权限。

因为Electron项目与其他桌面应用是有区别的，他具有浏览器的特性，所以开放主进程的node.js给渲染进程，是有安全隐患的。默认electron是不会开放高级权限给渲染进程，而是要求开发者自行决定渲染进程可以使用哪些主进程任务，这块功能就要在预加载脚本中完成。

#### 基础内容

预加载脚本运行在具有 HTML DOM API和Node.js、Electron的有限功能访问权限的环境中。

他是渲染进程与主进程之间通信的桥梁。

**使用场景**

* 使用有限的node.js、Electron高级API
* 主进程与渲染进程进行IPC通信。例如渲染进程让主进程帮助在本地保存文件

#### 如何创建并使用预加载脚本

在主进程文件里面`main.js`中，在BrowserWindow中指定预加载脚本文件

```js {12-14}
const { BrowserWindow, app, ipcMain } = require('electron')
const path = require('path')

app.whenReady().then(() => {
  const win = new BrowserWindow({
    width: 600,
    height: 300,
    x: 100,
    y: 700,
    alwaysOnTop: true,
    // 指定预加载脚本
    webPreferences: {
      preload: path.resolve(__dirname, 'Preload.js')
    }
  })
  win.webContents.openDevTools()
  win.loadFile(path.join(__dirname, 'index.html'))
})
```

预加载脚本`Preload.js`

```js
window.addEventListener('DOMContentLoaded', () => {

  const el = document.getElementById('tx')
  el.innerHTML = '预加载脚本的使用'

})
```



![](/electron/05_20230906225635.png)



### 进程通信

#### 渲染进程与主进程

主进程文件`main.js` 监听预加载脚本`发送的事件`： 通过订阅的方式进行通信

```js {23-26}
// ipcMain.on
const { BrowserWindow, app, ipcMain } = require('electron')
const path = require('path')
const createWin = () => {
  const win = new BrowserWindow({
    width: 600,
    height: 300,
    x: 100,
    y: 700,
    alwaysOnTop: true,
    // 指定预加载脚本
    webPreferences: {
      preload: path.resolve(__dirname, 'Preload.js')
    }
  })
  // 打开控制台
  win.webContents.openDevTools()
  win.loadFile(path.join(__dirname, 'index.html'))
}
app.whenReady().then(() => {
    createWin()
    // 主进程事件监听
    ipcMain.on('saveFile', () => {
      // 操作主进程的代码
      console.log('saveFile');
    })
})
```

预加载脚本`Preload.js`

```js {7-12}
const { ipcRenderer, contextBridge } = require("electron");
/**
 * 02_预加载脚本与渲染进程进行通信
 *    在预加载脚本里面，通过桥接方式与渲染进程进行连接
 *    api 是与渲染进程共享的：里面定义什么渲染进程就能拿到什么
 */
contextBridge.exposeInMainWorld('api', { //为渲染进程暴露API
  a: () => {
    // 触发主进程里面的方法
    ipcRenderer.send('saveFile')
  }
})
```

渲染进程器`render.js`

```js
window.api.a()
```

在终端里面查看结果

![](/electron/06_20230906230725.png)



#### 主进程到渲染进程

将消息从主进程发送到渲染器进程时，需要指定是哪一个渲染器接收消息。 消息需要通过 [`WebContents` (opens new window)](https://www.electronjs.org/zh/docs/latest/api/web-contents)实例的send方法发送到渲染器进程。

例子：点击Electron菜单改变渲染进程器中的内容

<CodeGroup>

  <CodeGroupItem title="主进程main.js" active>

```js {22-43}
// 更改Electron菜单并且，给菜单设置点击事件，并且向预加载脚本发送事件

const { BrowserWindow, app, ipcRenderer，Menu } = require('electron')
const path = require('path')
const createWin = () => {
  const win = new BrowserWindow({
    width: 600,
    height: 300,
    x: 100,
    y: 700,
    alwaysOnTop: true,
    // 指定预加载脚本
    webPreferences: {
      preload: path.resolve(__dirname, 'Preload.js')
    }
  })

  // 打开控制台
  win.webContents.openDevTools()
  win.loadFile(path.join(__dirname, 'index.html'))
	
  const menu = [
    {
      label: '菜单',
      submenu: [
        {
          label: '增加',
          click: () => {
            // 找到当前的网页对象  win.webContents
            console.log(win.webContents);

            // 主进程向预加载脚本发送指令
            win.webContents.send('edit', 1)
          }
        }
      ]
    }
  ]
  /** 设置electron 菜单 
   *  buildFromTemplate 生成模板
   *  setApplicationMenu 设置菜单
   */
  Menu.setApplicationMenu(Menu.buildFromTemplate(menu))
}
app.whenReady().then(() => {
  createWin()
})
```

 </CodeGroupItem>

  <CodeGroupItem title="预加载脚本Preload.js" >

```js {1-8}
const { ipcRenderer, contextBridge } = require("electron");
// 向渲染器暴露 ed 对象
contextBridge.exposeInMainWorld('ed', {
  editContent: (cab) => {
    // 监听主进程发送的事件
    ipcRenderer.on('edit', (e, value) => cab(value))
  }
})
```

 </CodeGroupItem>

  <CodeGroupItem title="渲染进程器render.js" >

```js {4-7}
/**
 * 接收主进程---> 预加载脚本 ----> 渲染进程 传递过来的参数，并且设置值
 */
window.ed.editContent((val) => {
  const el = document.getElementById('content')
  el.innerHTML = Number(el.innerText) + val
})
```

</CodeGroupItem>

<CodeGroupItem title="index.html" >

```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'" />
  <title>lrsoy</title>
</head>

<body>
  <div id="content">1</div>
  <!--渲染进程器脚本-->
  <script src="render.js"></script>
</body>

</html>
```

</CodeGroupItem>

</CodeGroup>

#### 双向通信

使用`ipcRenderer.invoke`与`ipcMain.handle`进行双向通信

例子：渲染进程点击按钮，向主进程发送事件，并且通过ElectronAPI 完成文件上传并且将文件地址返回给渲染进程并且赋值给输入框。

<CodeGroup>

  <CodeGroupItem title="主进程main.js" active>

```js {23-26}
const { BrowserWindow, app, ipcMain, dialog } = require('electron')
const path = require('path')

const createWin = () => {
  const win = new BrowserWindow({
    width: 600,
    height: 300,
    x: 100,
    y: 700,
    alwaysOnTop: true,
    // 指定预加载脚本
    webPreferences: {
      preload: path.resolve(__dirname, 'Preload.js')
    }
  })
  // 打开控制台
  win.webContents.openDevTools()
  win.loadFile(path.join(__dirname, 'index.html'))
}

app.whenReady().then(() => {
  createWin()
  ipcMain.handle('upLoad', async (event) => {
    const { filePaths } = await dialog.showOpenDialog({})
    return filePaths[0]
  })
})

```

</CodeGroupItem>

 <CodeGroupItem title="预加载脚本Preload.js" >

```js {1-7}
const { ipcRenderer, contextBridge } = require("electron");
contextBridge.exposeInMainWorld('upLoad', {
  fileOnLoad: async (cab) => {
    const filepath = await ipcRenderer.invoke('upLoad')
    cab(filepath)
  }
})
```

</CodeGroupItem>

  <CodeGroupItem title="渲染进程器render.js" >

```js {1-9}
window.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('upload')
  btn.addEventListener('click', () => {
    window.upLoad.fileOnLoad((filePath) => {
      const ipt = document.querySelector('input')
      ipt.value = filePath
    })
  })
})
```

</CodeGroupItem>

</CodeGroup>



**渲染器进程向主进程传递参数**

例子：通过窗口输入内容，传递给主进程并且将窗口标题更改。

<CodeGroup>

  <CodeGroupItem title="主进程main.js" active>

```js {23-26}
const { BrowserWindow, app, ipcMain, dialog } = require('electron')
const path = require('path')

const createWin = () => {
  const win = new BrowserWindow({
    width: 600,
    height: 300,
    x: 100,
    y: 700,
    alwaysOnTop: true,
    // 指定预加载脚本
    webPreferences: {
      preload: path.resolve(__dirname, 'Preload.js')
    }
  })
  // 打开控制台
  win.webContents.openDevTools()
  win.loadFile(path.join(__dirname, 'index.html'))
}

app.whenReady().then(() => {
  createWin()
  ipcMain.on('editTitle', (event, value) => {
    // 修改窗口信息
    BrowserWindow.fromWebContents(event.sender).title = value
  })
})
```

</CodeGroupItem>

 <CodeGroupItem title="预加载脚本Preload.js" >

```js {1-6}
const { ipcRenderer, contextBridge } = require("electron");
contextBridge.exposeInMainWorld('api', {
  editTitle: (title) => {
    ipcRenderer.send('editTitle', title)
  }
})
```

</CodeGroupItem>

  <CodeGroupItem title="渲染进程器render.js" >

```js {5}
window.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('btn')
  btn.addEventListener('click', () => {
    const title = document.querySelector('input').value
    window.api.editTitle(title)
  })
})
```

</CodeGroupItem>

<CodeGroupItem title="index.html" >

```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'" />
  <title>lrsoy</title>
</head>

<body>
  <input type="text" />
  <button id="btn">更改窗口标题</button>
  <script src="render.js"></script>
</body>

</html>
```

</CodeGroupItem>

</CodeGroup>



![](/electron/07_20230907141406.png)