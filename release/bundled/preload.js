// src/preload/index.ts
var { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld("electronApi", {
  exit: () => ipcRenderer.invoke("system:exit")
});
//# sourceMappingURL=preload.js.map
