const {app} = require('electron').remote;
const fs = require('fs');

module.exports = class Draft {
    static getPath() {
        return `${app.getPath('userData')}/draft.txt`;
    }

    static read() {
        return new Promise((onFulfilled, onRejected) => {
            const filePath = Draft.getPath();
            console.log("read draft " + filePath);
            fs.readFile(filePath, 'utf8', (e, text) => {
                if(e) {
                    onRejected(e);
                    return;
                }
                onFulfilled(text);
            });
        });
    }

    static write(text) {
        return new Promise((onFulfilled, onRejected) => {
            const filePath = Draft.getPath();
            console.log("write draft "+filePath);
            fs.writeFile(filePath, text, 'utf8', (e) => {
                if(e) {
                    onRejected(e);
                    return;
                }
                onFulfilled(text);
            });
        });
    }
};