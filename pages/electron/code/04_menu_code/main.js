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