const {app, BrowserWindow} = require('electron'),
    ascii="\n\n\n    .oooooo.                        ooooooooo.   ooooooooooooo ooooooooo.   \n    d8P'  `Y8b                       `888   `Y88. 8'   888   `8 `888   `Y88. \n   888          oooo d8b oooo    ooo  888   .d88'      888       888   .d88' \n   888          `888\"\"8P  `88.  .8'   888ooo88P'       888       888ooo88P'  \n   888           888       `88..8'    888              888       888`88b.    \n   `88b    ooo   888        `888'     888              888       888  `88b.  \n    `Y8bood8P'  d888b        .8'     o888o            o888o     o888o  o888o \n                         .o..P'                                              \n                         `Y8P'                                               \n\n            Logs : \n    ";
function createWindow() {
    let window = new BrowserWindow({
        titleBarStyle: "defaut",
        title: ">_CryPTR",
        frame: true,
        width: 1000,
        height: 625,
        icon: __dirname + "/icon.ico",
        show: true,
        resizable: false,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        }
    });
    window.loadFile("src/connect.html");
    window.on('closed', () => {
        window = null
    })
    console.clear(),console.log(ascii)
}
app.on('ready', createWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        return app.quit();
    }
});
app.on('activate', () => {
    if (win === null) { return createWindow() };
});