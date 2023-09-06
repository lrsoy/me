---
  title: 第二章 代码调试
  display: 第二章 代码调试
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



### 网络请求安全处理

因为 Electron 项目可以执行javascript代码，也可以访问用户电脑的文件系统，所以访问任何不受信任的内容都可能带来安全隐患。

打开调试工具就会看到以下内容：当没有配置安装策略时，Electron会报出警告，你可以在渲染进程的开发者工具中查看到。

![](/electron/01_20230906170408.png)



内容安全策略(CSP) 是应对跨站脚本攻击和数据注入攻击的又一层保护措施。 我们建议任何载入到Electron的站点都要开启。

**定义方式**

访问内容均来自项目资源

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'" />
```

允许访问 ***.其他.com** 源内容

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self' *.trusted.com; script-src '*.其他.com'" />
```

**模板文件**

我们在模板文件中定义安全策略，以告之Electron我们已经对安全策略进行了定义，上面的警告就不会出现了

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'" />
    <title>houdunren</title>
  </head>
  <body>
    <h1>houdunren</h1>
    <script src="renderer.js"></script>
  </body>
</html>

```

![](/electron/02_20230906171409.png)

### 配置主进程调试

在vscode中配置Electron 的 launch.json文件，使用微软提供的配置。

https://github.com/microsoft/vscode-recipes/tree/main/Electron

![](/electron/03_20230906195203.png)

打开一个electron项目，生成一个新的**launch.json**文件，将微软提供的内容沾到launch中。

```json
  {
      "version": "0.2.0",
      "configurations": [
          {
              "type": "node",
              "request": "launch",
              "name": "Electron: Main",
              "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/electron",
              "runtimeArgs": [
                  "--remote-debugging-port=9223",
                  "."
              ],
              "windows": {
                  "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/electron.cmd"
              }
          },
          {
              "name": "Electron: Renderer",
              "type": "chrome",
              "request": "attach",
              "port": 9223,
              "webRoot": "${workspaceFolder}",
              "timeout": 30000
          }
      ],
      "compounds": [
          {
              "name": "Electron: All",
              "configurations": [
                  "Electron: Main",
                  "Electron: Renderer"
              ]
          }
      ]
  }
```

![](/electron/04_20230906195731.png)

设置断点，在侧边栏可以看到相关内容，运行调试查看结果即可。

在运行渲染进程时，需要注意的是，先运行`主进程`，然后才能运行`渲染进程`，或者选择直接运行`all`。

