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