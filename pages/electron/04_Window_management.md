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