import * as Electron from "electron";
import * as Path from "path";
import * as Url from "url";

export default class Program {
    private static mainWindow: Electron.BrowserWindow | null;
    private static electronApp: Electron.App;   // not our Application!
    private static wndOptions: Electron.BrowserWindowConstructorOptions;

    public static run(mainWindowOptions: Electron.BrowserWindowConstructorOptions) {
        Program.mainWindow = null;
        Program.wndOptions = mainWindowOptions;
        Program.electronApp = Electron.app;
        Program.electronApp.on("window-all-closed", Program.quit);
        Program.electronApp.on("ready", Program.createWindow);
        //Program.electronApp.on("activate", Program.createWindow);
    }

    // TODO: wrap application window in class
    private static createWindow() {
        if (Program.mainWindow === null) {
            Program.mainWindow = new Electron.BrowserWindow(Program.wndOptions);
            Program.mainWindow.on("closed", Program.onClosed);

            // https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event

            var path: string = Path.resolve(__dirname, "..", "src", "index.html");
            Program.mainWindow.loadURL(Url.format({
                pathname: path,
                protocol: "file:",
                slashes: true
            }));
        }
    }

    private static quit() {
        if (process.platform !== "darwin") {    // darwin=>mac
            Program.electronApp.quit();
        }
    }

    private static onClosed() {
        Program.mainWindow = null;
    }
}