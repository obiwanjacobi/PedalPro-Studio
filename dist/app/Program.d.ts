import * as Electron from "electron";
export default class Program {
    private static electronApp;
    private static mainWindow;
    private static wndOptions;
    static run(mainWindowOptions: Electron.BrowserWindowConstructorOptions): void;
    private static createWindow();
    private static quit();
    private static onClosed();
}
