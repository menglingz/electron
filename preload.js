const {contextBridge, ipcRenderer} = require('electron')

/**
 * 在预加载脚本中，可以通过在全局window中暴露任意API来增强渲染器
 * 但是不能直接附加任何变动到window之上，因为语境隔离的存在
 * 语境隔离（Context Isolation）意味着预加载脚本与渲染器的主要运行环境是隔离开来的，以避免泄漏任何具特权的 API 到您的网页内容代码中
 * 这个时候需要使用contextBridge
 */
contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke('ping'),
  setTitle: (title) => ipcRenderer.send('set-title', title), // 单向通信
  openFile: () => ipcRenderer.invoke('dialog:openFile'), // 双向通信 创建一个通道
  sendSync: ipcRenderer.sendSync('synchronous-message', 'ping'),
  handlerCounter: (cb) => ipcRenderer.on('update-counter', cb)
  // 除函数之外，我们也可以暴露变量

})