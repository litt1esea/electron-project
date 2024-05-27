process.env.APP_VERSION = '1.0.0';process.env.ENV_NOW = 'dev';process.env.WEB_PORT = '1600';process.env.RES_DIR = 'D:\workspace\electron-project\resource\release';
// src/main/app.ts
import { app, BrowserWindow, ipcMain, Menu } from "electron";
import path from "path";
import { fileURLToPath } from "url";
var getDirName = () => {
  if (process.env.ENV_NOW == "dev") {
    const __filename = fileURLToPath(import.meta.url);
    const dirname = path.dirname(__filename);
    return dirname;
  } else {
    return __dirname;
  }
};
var log = (...args) => {
  console.log(`[${(/* @__PURE__ */ new Date()).toLocaleString()}]`, ...args);
};
log("electron start", process.env.ENV_NOW);
var url;
if (process.env.ENV_NOW == "dev") {
  url = `http://localhost:${process.env.WEB_PORT}/`;
} else if (process.env.ENV_NOW == "prod") {
  url = `file://${path.join(getDirName(), "index.html")}`;
}
var mainWindow;
app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(getDirName(), "preload.js")
    }
  });
  mainWindow.loadURL(url);
  mainWindow.webContents.openDevTools();
  log(`electron load ${url}`);
  ipcMain.handle("system:exit", () => {
    app.quit();
  });
  let menu = Menu.buildFromTemplate([
    {
      label: "\u6587\u4EF6",
      submenu: [
        {
          label: "\u6253\u5F00\u6587\u4EF6",
          click() {
            console.log("open folder");
          }
        },
        {
          label: "\u5173\u95ED\u6587\u4EF6\u5939"
        },
        {
          type: "separator"
        },
        {
          label: "\u6700\u5C0F\u5316",
          role: "minimize"
        },
        {
          label: "\u5173\u4E8E",
          role: "about"
        }
      ]
    },
    {
      label: "\u7F16\u8F91",
      toolTip: "\u5E38\u89C4\u7F16\u8F91",
      submenu: [
        {
          label: "\u590D\u5236",
          role: "copy"
        },
        {
          label: "\u526A\u5207",
          role: "cut"
        },
        {
          label: "\u7C98\u8D34",
          role: "paste"
        }
      ]
    },
    {
      label: "\u9009\u9879",
      submenu: [
        {
          label: "\u9009\u98791",
          type: "checkbox",
          checked: true
        },
        {
          label: "\u9009\u98792",
          type: "checkbox"
        },
        {
          label: "\u9009\u98793",
          type: "checkbox"
        },
        {
          type: "separator"
        },
        {
          label: "\u9009\u98791",
          type: "radio"
        },
        {
          label: "\u9009\u98792",
          type: "radio"
        },
        {
          label: "\u5B50\u83DC\u5355",
          type: "submenu",
          role: "windowMenu"
        },
        {
          label: "\u5176\u4ED6",
          type: "submenu",
          submenu: [
            // { label: '子菜单1', icon: './img/sys_cpu.png', accelerator: 'ctrl + o', click() { console.log(1); } },
            { label: "\u5B50\u83DC\u53552" }
          ]
        }
      ]
    }
  ]);
  Menu.setApplicationMenu(menu);
});
//# sourceMappingURL=entry.js.map
