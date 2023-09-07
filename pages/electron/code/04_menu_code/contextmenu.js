// 右键软件显示菜单项 在主进程文件内使用

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