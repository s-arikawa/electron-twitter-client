const {app, Menu, Tray} = require('electron');

module.exports = class AppTray {
    constructor() {
        this.tray = null;
        this.start();
    }

    start() {
        app.on('ready', () => {
            this.tray = new Tray(`${app.getAppPath()}/app/img/twitter.png`);
            const contextMenu = Menu.buildFromTemplate([
                {
                    label: 'New Tweet',
                    click() {
                        app.emit('showForm');
                    }
                }
            ]);
            this.tray.setContextMenu(contextMenu);
        });
    }
};