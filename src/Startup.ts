/**
 * This is the entry point for the Main-process of Electron.
 */
import Program from "./Program";
Program.run({useContentSize: true, center: true});

import Server from "./Server";
Server.run();