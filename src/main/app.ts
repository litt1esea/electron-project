import { app, BrowserWindow, ipcMain } from "electron"
import path from 'path'

const log = (...args: any[]) => {
  console.log(`[${(new Date).toLocaleString()}]`, ...args)
}

log("electron start", process.env.WEB_PORT)

let mainWindow;
const url = `http://localhost:${process.env.WEB_PORT}/`
app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(process.cwd(), 'src/preload/index.js'),
    }
  });
  mainWindow.loadURL(url)
  log(`electron load ${url}`)



  ///////////////////////////////////

  ipcMain.handle('system:exit', () => {
    app.quit()
  })


})
