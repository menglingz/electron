const { app, BrowserWindow, ipcMain, dialog, Menu } = require('electron')
const path = require('path')

const createWindow = () => {
  const win = new BrowserWindow({
    // width: 800,
    // height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  const menu = Menu.buildFromTemplate([
    {
      label: app.name,
      submenu: [
        {
          click: () => win.webContents.send('update-counter', 1),
          label: 'Increment'
        },
        {
          click: () => win.webContents.send('update-counter', -1),
          label: 'Decrement'
        }
      ]
    }

  ])

  Menu.setApplicationMenu(menu)

  ipcMain.on('set-title', (event, title) => {
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    win.setTitle(title)
  })

  ipcMain.on('synchronous-message', (event, arg) => {
    console.log(arg) // 在 Node 控制台中打印“ping”
    event.returnValue = 'pong'
  })

  ipcMain.on('counter-value', (_event, value) => {
    console.log(value)
  })

  win.loadFile('index.html')
  win.webContents.openDevTools()
}

app.whenReady().then(() => {
  // 双向通信-监听器
  ipcMain.handle('dialog:openFile', async () => {
    const {canceled, filePaths} = await dialog.showOpenDialog();
    console.log(filePaths);
    if (!canceled) {
      return filePaths[0]
    }
  })

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