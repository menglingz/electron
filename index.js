const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  ipcMain.on('set-title', (event, title) => {
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    win.setTitle(title)
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  ipcMain.handle('ping', () => 'pong')
  createWindow()

 // 在开发环境中启用热更新
//  if (process.env.NODE_ENV === 'development') {
//   // 监听项目下所有文件的变化
//   const watcher = chokidar.watch('.', {
//     ignored: /node_modules|[\/\\]\./,
//     persistent: true
//   });

//   // 当有文件变化时，重新加载应用程序
//   watcher.on('change', () => {
//     app.relaunch();
//     app.exit();
//   });
// }

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('will-finish-launching', () => {
  app.on('open-url', (event, url) => {
    event.preventDefault();
    // 处理 URL
  });
});

app.applicationSupportsSecureRestorableState = function() {
  return true;
};