export class Environment {
    public static get isMac(): boolean {
        return process.platform === "darwin";     // darwin=>mac
    }
    public static get isLinux(): boolean {
        return process.platform === "linux";
    }
    public static get isProduction(): boolean {
        return process.env.NODE_ENV === "production";
    }
}