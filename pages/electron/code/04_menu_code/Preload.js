const { ipcRenderer, contextBridge } = require("electron");


contextBridge.exposeInMainWorld('api', {
  SendInstructions: (cab) => {
    ipcRenderer.on('sendInstructions', (event, value) => cab(value))
  },
  menuPopMenu: () => {
    ipcRenderer.send('menuPopMenu')
  }
})
