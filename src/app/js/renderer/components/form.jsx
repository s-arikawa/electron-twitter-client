const React = require('react');
const T = require('../services/twitter');
const {dialog} = require('electron').remote;
const Draft = require('../services/draft');
const Screenshot = require('../services/screenshot');

module.exports = class FormContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: '', nativeImage: null};
    }

    componentDidMount() {
        Draft.read()
            .catch(error => {
                console.log(error);
            })
            .then((text) => {
                this.setState({text: text});
            });
    }

    render() {
        return (
            <div className='window'>
                <header className='toolbar toolbar-footer'>
                    <div className='toolbar-actions'>
                        <button className='btn btn-default pull-right'
                            onClick={this.handleCaptureButtonClick.bind(this)}>
                            <span className='icon icon-monitor'></span>
                        </button>
                    </div>
                </header>
                <div className='window-content'>
                    <div>
                        <textarea style={{width: 300, height: 250}}
                            onChange={this.handleTextChange.bind(this)}
                            onBlur={this.handleTextBlur.bind(this)}
                            value={this.state.text} />
                    </div>
                </div>
                <footer className='toolbar toolbar-footer'>
                    <div className='toolbar-actions'>
                        {this.state.nativeImage !== null ?
                            <img src={this.state.nativeImage.toDataURL()}
                                className='img-rounded media-object pull-left'
                                width='32' height='32'/> : null }

                        <button className='btn btn-primary pull-right'
                            onClick={this.handleSendButtonClick.bind(this)}>
                            ツイート
                        </button>
                    </div>
                </footer>
            </div>
        );
    }

    /**
     * textareaに入力するたびにテキストをstateに保持
     */
    handleTextChange(e) {
        this.setState({text: e.target.value});
    }
    /**
     * textareaからフォーカスが外れたらDraftにテキストを保存
     */
    handleTextBlur() {
        Draft.write(this.state.text)
            .catch(error => {
                console.log(error);
            });
    }

    /**
     * ツイートボタンのアクション
     * Tweet APIのpostをして、textareaをクリアする
     */
    handleSendButtonClick() {
        dialog.showMessageBox({
            type: 'question',
            title: '確認',
            message: 'ツイートしてもよろしいですか？',
            buttons: ['はい', 'いいえ'],
            defaultId: 0,
            cancelId: 1
        }, (index) => {
            if(index === 1) {
                //'いいえ'の場合
                return;
            }

            new Promise((onFulfilled, onRejected) => {
                if(this.state.nativeImage === null) {
                    onFulfilled();
                    return;
                }

                return T.post('media/upload', {
                    media_data: this.state.nativeImage.toPng().toString('base64')
                })
                .catch(error => {
                    console.log(error);
                })
                .then(result => {
                    onFulfilled(result.data.media_id_string);
                });
            }).then(mediaId => {
                let params = {status: this.state.text.trim()};
                if(mediaId) {
                    params.media_ids = [mediaId];
                }

                T.post('statuses/update', params)
                    .catch(error => {
                        console.log(error);
                    })
                    .then(result => {
                        this.setState({text: '', nativeImage: null});
                        ipcRenderer.send('finishTweet');
                    });
            });
        });
    }

    handleCaptureButtonClick() {
        Screenshot.capture()
            .catch(error => {
                console.log(error);
            })
            .then(nativeImage => {
                console.log(nativeImage);
                this.setState({nativeImage: nativeImage});
            });
    }
}