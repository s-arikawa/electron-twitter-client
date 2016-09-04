const {app, BrowserWindow, ipcMain} = require('electron');

/**
 * タイムラインを表示するウィンドウを生成する
 */
module.exports = class TimelineWindow {
    constructor() {
        this.window = null;
        //mentionCounter変数
        this.newMentionCount = 0;

        this.start();
    }

    start(){
        app.on('ready', () => {
            this.createWindow();
        });

        //newMentionイベントを処理するハンドラを追加
        ipcMain.on('newMention', () => {
            if(this.window.isFocused()) {
                return;
            }
            //フォーカスがない場合にカウントアップする
            this.newMentionCount++;
            this.updateBadge();
        });
    }

    /**
     * main.htmlを表示する
     * main.htmlはrenderer-main.js->main.jsxを使って、タイムラインhtmlを生成する
     */
    createWindow(){
        this.window = new BrowserWindow({
            x:0,
            y:0,
            width:400,
            height: 800
        });
        this.window.on('focus', () => {
            //フォーカスされたらカウントリセット
            this.newMentionCount = 0;
            this.updateBadge();
        });
        this.window.loadURL(
            `file://${__dirname}/../../html/main.html`
        );
    }

    /**
     * Badgeを更新する
     */
    updateBadge() {
        app.setBadgeCount(this.newMentionCount);
        if(process.platform === 'darwin') {
            app.dock.bounce();
        }
    }

};