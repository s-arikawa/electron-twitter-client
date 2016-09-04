const {app} = require('electron');
const TimelineWindow = require('./timeline-window');
const FormWindow = require('./form-window');
const AppMenu = require('./app-menu');
const AppTray = require('./app-tray');

class Main {
    constructor() {
        this.timelineWindow = new TimelineWindow();
        this.formWindow = new FormWindow();
        this.AppTray = new AppTray();
        this.start();
    }
    start(){
        app.on('ready', () => {
            AppMenu.setup();
        });
    }
}

const main = new Main();