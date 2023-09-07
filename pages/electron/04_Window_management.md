---
  title: 第四章 窗口管理
  display: 第四章 窗口管理
  image: /image/banner1.jpg
  description: 
  subtitle: 
  date: 2023-09-07
  type: electron
  author: lrsoy
  toc: true
  duration: ''
---
<DelayTeleport>

[[toc]]
</DelayTeleport>



### 常用方法

| 方法                           | 说明                 |
| ------------------------------ | -------------------- |
| win.loadFile()                 | 加载文件             |
| win.loadURL()                  | 加载链接             |
| win.webContents.openDevTools() | 打开开发者工具       |
| win.setContentBounds()         | 控制窗口尺寸与位置   |
| win.center()                   | 将窗口移动到屏幕中心 |

### 常用属性

| 属性            | 说明                                                         |
| --------------- | ------------------------------------------------------------ |
| title           | 标题，也可以修改html模板的title标签，模板的title标签优先级高 |
| icon            | window系统窗口图标                                           |
| frame           | 是否显示边框                                                 |
| transparent     | 窗口是否透明                                                 |
| x               | x坐标                                                        |
| y               | y坐标                                                        |
| width           | 宽度                                                         |
| height          | 高度                                                         |
| movable         | 是否可以移动窗口                                             |
| minHeight       | 最小高度，不能缩放小于此高度                                 |
| minWidth        | 最大高度，不能缩放小于此高度                                 |
| resizable       | 是否允许缩放窗口                                             |
| alwaysOnTop     | 窗口是否置顶                                                 |
| autoHideMenuBar | 是否自动隐藏窗口菜单栏。 一旦设置，菜单栏将只在用户单击 `Alt` 键时显示 |
| fullscreen      | 是否全屏幕                                                   |

### Shell & screen

没学习.......

### 菜单管理

#### 取消默认的菜单

```js
// 主进程 main.js
const { BrowserWindow, app, Menu } = require('electron')
Menu.setApplicationMenu(null)
```

#### 设置菜单

我们需要用到 [Menu (opens new window)](https://www.electronjs.org/zh/docs/latest/api/menu-item)模块、[MenuItem (opens new window)](https://www.electronjs.org/zh/docs/latest/api/menu-item#new-menuitemoptions)菜单项与 [`accelerator` (opens new window)](https://www.electronjs.org/zh/docs/latest/api/accelerator)快捷键知识。



主进程`main.js`

```js
const { BrowserWindow, app } = require('electron')
const path = require('path')
const { createMenu } = require('./menu')
require('./contextmenu')

const createWin = () => {
  const win = new BrowserWindow({
    width: 600,
    height: 300,
    alwaysOnTop: true,
    x: 100,
    y: 750,
    webPreferences: {
      preload: path.resolve(__dirname, 'Preload.js')
    },
  })

  win.webContents.openDevTools()
  win.loadFile(path.join(__dirname, 'index.html'))
  return win

}
app.whenReady().then(() => {
  const win = createWin()
  createMenu(win)
})

// 针对不同操作系统，处理窗口是否要退出
app.on('window-all-closed', () => {
  // 如果不是苹果系统就要关闭窗口
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  // 当前打开窗口个数并且是苹果系统
  if (BrowserWindow.getAllWindows().length === 0 && process.platform === 'darwin') {
    createWin()
  }
})
```

菜单文件`menu.js`

```js
// 菜单文件
const { app, Menu, shell } = require('electron')

const createMenu = (win) => {
  // 判断当前操作系统是什么
  const isMac = process.platform === 'darwin'

  const template = [
    // 当操作系统是mac的时候，此选项会在菜单栏的第一项，打包后才能看到。并且需要进行判断什么系统
    ...(isMac
      ? [{
        label: app.name,
        submenu: []
      }]
      : []),
    {
      label: 'label',
      submenu: [
        {
          label: '访问网站',
          // 定义快捷键
          accelerator: 'CommandOrControl+shift+a',
          click: () => {
            // 当前菜单，点击跳转到外部链接
            shell.openExternal('http://127.0.0.1:4000/')
          }
        },
        // 配置次选项，对当前菜单内容进行分组，是个分割线
        { type: 'separator' },
        {
          label: '分组'
        },
        /** 使用已经定义好的菜单项
         * 更多 role选项
         * https://www.electronjs.org/zh/docs/latest/api/menu-item#roles
         */
        {
          role: 'minimize'
        },
      ]
    },
    {
      label: '向渲染器发送事件',
      click: () => {
        // 找到窗口并且向 预加载脚本发送事件
        win.webContents.send('sendInstructions', '指令')
      }
    }
  ]

  // 清掉原来的菜单
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

module.exports = {
  createMenu
}
```

通过点击菜单，向渲染器发送事件并且传递参数

预加载脚本`Preload.js`

```js
window.addEventListener('DOMContentLoaded', () => {
  window.api.SendInstructions((value) => {
    console.log(value);
  })
})
```

渲染器进程`render.js`

```js
window.addEventListener('DOMContentLoaded', () => {
  window.api.SendInstructions((value) => {
    console.log(value);
  })
})
```

![](/electron/08_20230907183857.png)



#### 右键菜单

electron 可以定义快捷右键菜单，需要预加载脚本与主进程结合使用

main.js 主进程定义ipc事件，当preload.js 触发事件时显示右键菜单

```js
// main.js
const { ipcMain, app, Menu, BrowserWindow } = require("electron");
ipcMain.on('menuPopMenu', (event) => {
  const template = [
    {
      label: '右键菜单',
      click: () => app.quit()
    }
  ]
  const menu = Menu.buildFromTemplate(template)
  // 找到当前被右键的窗口，然后弹出菜单
  menu.popup(BrowserWindow.fromWebContents(event.sender))
})
```

preload.js 预加载脚本定义，用于触发右键事件，然后通过IPC调用主进程显示右键菜单

```js
window.addEventListener('contextmenu', (e) => {
  e.preventDefault()
  ipcRenderer.send('show-context-menu')
})
```

![](/electron/09_20230907184311.png)



