const  { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld("electronApi", {
    exit: () => ipcRenderer.invoke("system:exit")
})