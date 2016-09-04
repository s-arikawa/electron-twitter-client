const {app, Menu, MenuItem} = require('electron');

module.exports = class AppMenu {
    static setup() {
        const tweetMenu = new MenuItem({
            label: 'Tweet',
            submenu: [
                {
                    label: 'New Tweet',
                    click() {
                        app.emit('showForm');
                    }
                }
            ]
        });

        const template = AppMenu.getBasicTemplate();
        const menu = Menu.buildFromTemplate(template);
        menu.append(tweetMenu);
        Menu.setApplicationMenu(menu);
    }

    static getBasicTemplate() {
        const template = [
            {
                label: 'Edit',
                submenu: [
                    {
                        role: 'undo'
                    }
                ]
            },
            {
                label: 'View',
                submenu: [
                    {
                        label: 'Toggle Developer Tools',
                        accelerator: process.platform == 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
                        click(item, focusedWindow) {
                            if(focusedWindow) {
                                focusedWindow.webContents.toggleDevTools();
                            }
                        }
                    }
                ]
            }
        ];

        if(process.platform == 'darwin'){
            template.unshift({
                label: app.getName(),
                submenu: [
                    {
                        role: 'about'
                    },
                    {
                        role: 'quit'
                    }
                ]
            });
        }

        return template;
    }
}