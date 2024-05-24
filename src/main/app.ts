import { app, BrowserWindow } from "electron"
const log = (...args: string[]) => {
    console.log(`[${(new Date).toLocaleString()}]`, ...args)
}

log("electron start")

let mainWindow;
app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });
  mainWindow.loadURL("http://localhost:1600/");
});


log('a')
