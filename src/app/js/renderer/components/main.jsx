const React = require('react');
const T = require('../services/twitter');
const {ipcRenderer} = require('electron');

/**
 * ツイートを生成するクラス
 * @param {tweet} tweet
 * @param {key} tweet.id
 */
class Tweet extends React.Component {
    /**
     * React.render
     */
    render() {
        //bool Retweet
        const isRetweet = this.props.tweet.hasOwnProperty('retweeted_stats');
        //リツイートだったらリツイート側の情報を取得する
        const status = isRetweet ? this.props.tweet.retweeted_status : this.props.tweet;
        const media = status.entities.media || [];
        //一つ目のphotoを保持
        const firstImage = media.find((item) => {
            return item.type == 'photo';
        });

        //一つのツイートを表すタグを作成する
        return (
            <li className='list-group-item'>
                <img src={status.user.profile_image_url_https}
                    className='img-round media-object pull-left'
                    width='32' height='32' />
                <div className='media-body'>
                    <strong className="user-name">
                        {status.user.name}
                    </strong>
                    <span className="user-screen_name">
                        @{status.user.screen_name}
                    </span>
                    <p className="text">{status.text}</p>
                    {firstImage ? 
                        <img src={firstImage.media_url_https} 
                            className='img-rounded media-object media-img' />
                        : null }
                    {isRetweet ?
                        <span className="icon icon-retweet">
                            Retweeted by {this.props.tweet.user.name}
                        </span>
                        : null }
                </div>
            </li>
        );
    }
}

/**
 * タイムラインを生成するクラス
 * @param {tweets} ツイートリスト
 */
class Timeline extends React.Component {
    /**
     * React.render
     */
    render() {
        //Tweetクラスを保持しているtweetsから複数生成
        const tweets = this.props.tweets.map((tweet) => {
            //Tweetクラスにtweetプロパティを追加してTweetクラスで使えるようにしている
            return <Tweet tweet={tweet} key={tweet.id}/>;
        });
        //Tweetリストをulで囲んでタイムラインとして返す
        return (
            <ul className='list-group'>
                {tweets}
            </ul>
        );
    }
}

/**
 * タイムラインウィンドウを生成するクラス
 */
module.exports = class MainContent extends React.Component {
    /**
     * コンストラクタ
     */
    constructor(props) {
        super(props);
        //ツイートをReactのstateプロパティで保持する.
        //メンションを検知する為にuserを保持する.
        //stateの中身が変更されたらReactは再レンダリングする.
        this.state = {user: null, tweets: []};
    }
    /**
     * React.render
     */
    render() {
        //stateに保持しているツイートをTimelineクラスのプロパティtweetsに設定する
        return (
            <div className='window'>
                <div id='window-content' className='windows-content'>
                    <Timeline tweets={this.state.tweets}/>
                </div>
            </div>
        );
    }
    /**
     * React.componentDidMount
     * コンポーネントがレンダリングされたタイミングでReactが自動で呼び出すメソッド
     * # つまりrenderメソッドのあとに呼び出される？
     */
    componentDidMount() {
        T.get('account/verify_credentials')
            .catch(error => {
                console.log(error);
            })
            .then((result) => {
                if(result.data.errors) {
                    console.log(result.data.errors);
                    return;
                }
                this.setState({user: result.data});
            });

        //Twitterライブラリを使ってツイート情報を取得
        T.get('statuses/home_timeline')
            .catch(error => {
                console.log(error);
            })
            .then((result) => {
                //取得したツイート情報をReact.Stateにtweetsとしてセット
                this.setState({tweets: result.data});
                this.connectStream();
            });
    }
    /**
     * 新しいツイートがあったら取得する
     */
    connectStream() {
        //Twitter Stream API
        const stream = T.stream('user');
        stream.on('error', (error) => {
            throw error;
        });
        //新しいtweetがあったらReact.Stateに追加する
        stream.on('tweet', (tweet) => {
            const tweets = this.state.tweets;
            //新しいtweetの後ろに既に保持しているtweetをconcatするので順序がここで決まる
            const newTweets = [tweet].concat(tweets);

            //console.log("新しいツイート : "+tweet.text);
            //メンションを検知
            this.notifyIfMention(tweet);

            this.setState({tweets: newTweets});
        });
    }

    /**
     * メンションがある場合、html notification apiを使って通知する.
     */
    notifyIfMention(tweet) {
        //bool mention
        const isMention = tweet.entities.user_mentions.findIndex((user) => {
            return user.id === this.state.user.id;
        }) >= 0;
        if(!isMention) {
            return;
        }

        new Notification('メンションがあります。', {
            body: tweet.text,
            icon: tweet.user.profile_image_url_https
        });
        //badge
        ipcRenderer.send('newMention');
    }
}