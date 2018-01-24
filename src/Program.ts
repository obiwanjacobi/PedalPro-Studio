import * as Electron from "electron";
import * as Path from "path";
import * as Url from "url";
import Environment from "./Environment";

export default class Program {
    private static electronApp: Electron.App;
    private static mainWindow: Electron.BrowserWindow | null;
    private static wndOptions: Electron.BrowserWindowConstructorOptions;

    public static run(mainWindowOptions: Electron.BrowserWindowConstructorOptions) {
        Program.electronApp = Electron.app;
        Program.mainWindow = null;
        Program.wndOptions = mainWindowOptions;
        
        Program.electronApp.on("window-all-closed", Program.quit);
        Program.electronApp.on("ready", Program.createWindow);
        Program.electronApp.on("activate", Program.createWindow);

        // Linux 3d acceleration causes black screen for Electron-based apps, so turn it off
        // see https://github.com/electron/electron/issues/4380 and
        // https://github.com/electron/electron/issues/5297
        if (Environment.isLinux) {
            Program.electronApp.disableHardwareAcceleration();
        }
    }

    // TODO: wrap application window in class
    private static createWindow() {
        if (Program.mainWindow === null) {
            Program.mainWindow = new Electron.BrowserWindow(Program.wndOptions);
            Program.mainWindow.on("closed", Program.onClosed);

            // https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event

            const path: string = Path.resolve(__dirname, "..", "src", "index.html");
            Program.mainWindow.loadURL(Url.format({
                pathname: path,
                protocol: "file:",
                slashes: true
            }));

            if (Environment.isProduction) {
                // remove menu completely
                Program.mainWindow.setMenu(null);
            }
        }

        // import Environment from "./Environment";
        if (!Environment.isProduction) {
            const { default: installExtension, REACT_DEVELOPER_TOOLS } = require("electron-devtools-installer");
            
            installExtension(REACT_DEVELOPER_TOOLS)
                .then((name) => {
                    console.log(`Added Extension:  ${name}`);
                })
                .catch((err) => {
                    console.log('An error occurred: ', err);
                });
            }

    }

    private static quit() {
        if (!Environment.isMac) {
            Program.electronApp.quit();
        }
    }

    private static onClosed() {
        Program.mainWindow = null;
    }
}