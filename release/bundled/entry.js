process.env.APP_VERSION = '1.0.0';process.env.ENV_NOW = 'dev';process.env.WEB_PORT = '1600';process.env.RES_DIR = 'D:\workspace\electron-project\resource\release';
// src/main/app.ts
import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
var log = (...args) => {
  console.log(`[${(/* @__PURE__ */ new Date()).toLocaleString()}]`, ...args);
};
log("electron start", process.env.WEB_PORT);
var mainWindow;
var url = `http://localhost:${process.env.WEB_PORT}/`;
app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(process.cwd(), "src/preload/index.js")
    }
  });
  mainWindow.loadURL(url);
  log(`electron load ${url}`);
  setTimeout(() => {
    var output = [];
    var count = 0;
    while (true) {
      output.push({});
      count++;
      if (count % 6e3 == 0) {
        log(process.memoryUsage());
      }
    }
  }, 8e3);
  ipcMain.handle("system:exit", () => {
    app.quit();
  });
});
//# sourceMappingURL=entry.js.map
