import { contextBridge, ipcRenderer } from "electron"

contextBridge.exposeInMainWorld("electronApi", {
    exit: () => ipcRenderer.invoke("system:exit")
})