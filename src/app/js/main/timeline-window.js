const {app, BrowserWindow} = require('electron');

module.exports = class TimelineWindow {
    constructor() {
        this.window = null;
        this.start();
    }

    start(){
        app.on('ready', () => {
            this.createWindow();
        });
    }

    createWindow(){
        this.window = new BrowserWindow({
            x:0,
            y:0,
            width:400,
            height: 800
        });
        this.window.loadURL(
            `file://${__dirname}/../../html/main.html`
        );
    }
};