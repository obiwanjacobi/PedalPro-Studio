import * as Electron from "electron";
import * as Path from "path";
import * as Url from "url";
import { Environment } from "./Environment";

export class ProgramLocations {
    public readonly application: string;
    public readonly documents: string;
    public readonly downloads: string;
    public readonly temp: string;

    public constructor(electronApp: Electron.App) {
        const basePath = Path.join(electronApp.getPath("documents"), "PedalPro Studio");
        this.documents = Path.join(basePath, "storage");
        this.downloads = Path.join(basePath, "community");

        this.temp = electronApp.getPath("temp");
        this.application = Environment.isProduction ? "./app.asar/" : "./";
    }
}

export class Program {
    public static locations: ProgramLocations;

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

        Program.locations = new ProgramLocations(Program.electronApp);
    }

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