const {app, BrowserWindow, globalShortcut} = require('electron');

/**
 * ツイート投稿用ウィンドウを生成する
 */
module.exports = class FormWindow {
    constructor() {
        this.window = null;
        this.start();
    }

    start() {
        app.on('ready', () => {
            this.createWindow();
            this.registerGlobalShortcut();
        });

        app.on('showForm', () => {
            this.window.show();
        });
        app.on('will-quit', () => {
            globalShortcut.unregisterAll();
        });
    }
    /**
     * form.htmlを表示する
     */
    createWindow() {
        this.window = new BrowserWindow({
            title: 'ツイート',
            center: true,
            resizable: false,
            minimizable: false,
            maxmizable: false,
            width: 300,
            height: 250,
            show: false
        });
        //'close'イベントでhideするだけ
        this.window.on('close', (event) => {
            if(this.window.isVisible()) {
                this.window.hide();
                event.preventDefault();
            }
        });
        this.window.loadURL(
            `file://${__dirname}/../../html/form.html`
        );
    }

    registerGlobalShortcut() {
        const accelerator = 'CommandOrControl+Shift+N';
        if(globalShortcut.isRegistered(accelerator)) {
            return;
        }

        globalShortcut.register(accelerator, () => {
            this.window.show();
        });
    }
};