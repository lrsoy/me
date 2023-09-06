---
  title: 第一章 开发环境配置
  display: 第一章 开发环境配置
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

### 初始化项目

初始化项目

```bash
pnpm init
```

安装electron

```bash
pnpm add -D electron
```

配置package.json文件

* dev 运行electron项目命令
* main 主进程脚本
* productName 字段会做为app.name的默认值，优先级高于name

```json
{
  "name": "01-code 第一章",
  "version": "1.0.0",
  "description": "",
  "productName": "lrsoy-camera",
  "main": "main.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "electron ."
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "electron": "^26.1.0"
  }
}
```

### 主进程与渲染进程的区别

创建main.js主进程文件，用于创建窗口并加载模板文件，**主进程是nodejs环境，而渲染进程就等同于浏览器的运行环境。**

```js
const { BrowserWindow, app } = require('electron')
const path = require('path')

app.whenReady().then(() => {

  // 创建一个窗口，指定宽高
  const mainWindow = new BrowserWindow({
    width: 200,
    height: 200,
    // 将窗口置顶，在所有窗口之上
    alwaysOnTop: true,
    // 指定窗口在桌面的 x y位置
    x: 1500,
    y: 100
  })

  // 每次打开窗口都打开 开发者工具
  mainWindow.webContents.toggleDevTools()

  // 在窗口里面可以加载指定网页
  // mainWindow.loadURL('https://nodejs.org/en')

  // 加载静态页面：由于window和苹果文件拼接方式不同需要使用 path
  mainWindow.loadFile(path.resolve(__dirname, 'index.html'))

})
```

### 自动重启

安装nodemon

```bas
npm install -g nodemon
```

配置package.json **scripts**字段

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon --exec electron ."
 },
```

由于nodemon不能监听`html/js`文件，需要配置nodemon.json

```json
{
  "ignore": [
    "node_modules",
    "dist"
  ],
  "colours": true,
  "verbose": true,
  "watch": [
    "*.*"
  ],
  "ext": "html,js"
}
```

### 不同操作系统窗口关闭与唤醒

由于不同用户使用的操作系统不同，习惯不同，例如mac，退掉electron，他会自动退出，这不符合mac用户的操作习惯，所以需要针对这项进行处理

```js {25,27,28,30-32}
const { BrowserWindow, app } = require('electron')
const path = require('path')
const createWindow = () => {
  // 创建一个窗口，指定宽高
  const mainWindow = new BrowserWindow({
    width: 200,
    height: 200,
    // 将窗口置顶，在所有窗口之上
    alwaysOnTop: true,
    // 指定窗口在桌面的 x y位置
    x: 1500,
    y: 100
  })
  // 每次打开窗口都打开 开发者工具
  // mainWindow.webContents.toggleDevTools()
  // 在窗口里面可以加载指定网页
  // mainWindow.loadURL('https://nodejs.org/en')
  // 加载静态页面：由于window和苹果文件拼接方式不同需要使用 path
  mainWindow.loadFile(path.resolve(__dirname, 'index.html'))
}

app.whenReady().then(() => {
  createWindow()
  // 处理不同平台软件关闭时，是否是完全关闭
  app.on('window-all-closed', () => { // 监测窗口是否关闭
    // 不是 mac 的情况下，彻底关闭软件
    if (process.platform !== 'darwin') app.quit()
  })
  // 监听唤醒
  app.on('activate', () => {
    createWindow()
  })
})
```

### 使用样式控制渲染进程

当开发一些桌面端软件的时候，我不希望显示这个软件的`title`，但是关掉title就会导致窗口不能拖拽，需要使用css解决这个问题

```css
/* 点击dom元素的时候，可以拖动窗口 */
html {
  -webkit-app-region: drag;
}

/* 点击文本域的时候，不能拖动窗口 */
textarea {
  -webkit-app-region: no-drag;
}
```

看到-webkit不同担心，在不同操作系统不能使用，因为这个里面本身就是`chrome`浏览器，所以不需要关心这个css能不能使用。

### 使用成熟的脚手架创建vue/react+electron

日常开发可以使用 [electron-vite (opens new window)](https://cn-evite.netlify.app/guide/#%E6%90%AD%E5%BB%BA%E7%AC%AC%E4%B8%80%E4%B8%AA-electron-vite-%E9%A1%B9%E7%9B%AE)或 [electron-vite-vue (opens new window)](https://github.com/electron-vite/electron-vite-vue)、 [electron-react-boilerplate (opens new window)](https://github.com/electron-react-boilerplate/electron-react-boilerplate)等脚手架快速创建项目，脚手架已经为我们完成了基本的配置，并支持使用 Vue与React等技术开发Electron项目。



使用**electron-vite**搭建项目

```bash
pnpm create @quick-start/electron
```

然后进行项目目录安装依赖包

```bash
pnpm install
```

运行项目

```bash
pnpm run dev
```

