
window.addEventListener('DOMContentLoaded', () => {
  window.api.SendInstructions((value) => {
    console.log(value);
  })
})

// 侦听鼠标右键
window.addEventListener('contextmenu', () => {
  window.api.menuPopMenu()
})