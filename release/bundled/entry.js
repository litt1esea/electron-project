// src/main/app.ts
import { app, BrowserWindow } from "electron";
var log = (...args) => {
  console.log(`[${(/* @__PURE__ */ new Date()).toLocaleString()}]`, ...args);
};
log("electron start");
var mainWindow;
app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  });
  mainWindow.loadURL("http://localhost:1600/");
});
log("a");
//# sourceMappingURL=entry.js.map
