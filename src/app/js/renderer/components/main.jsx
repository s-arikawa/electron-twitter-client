const React = require('react');
const T = require('../services/twitter');

class Tweet extends React.Component {
    render() {
        const isRetweet = this.props.tweet.hasOwnProperty('retweeted_stats');
        const status = isRetweet ? this.props.tweet.retweeted_status : this.props.tweet;
        const media = status.entities.media || [];
        const firstImage = media.find((item) => {
            return item.type == 'photo';
        });

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
                        {status.user.screen}
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

class Timeline extends React.Component {
    render() {
        const tweets = this.props.tweets.map((tweet) => {
            return <Tweet tweet={tweet} key={tweet.id}/>;
        });

        return (
            <ul className='list-group'>
                {tweets}
            </ul>
        );
    }
}

module.exports = class MainContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {tweets: []};
    }

    render() {
        return (
            <div className='window'>
                <div id='window-content' className='windows-content'>
                    <Timeline tweets={this.state.tweets}/>
                </div>
            </div>
        );
    }

    componentDidMount() {
        T.get('statuses/home_timeline')
            .catch(error => {
                console.log(error);
            })
            .then((result) => {
                this.setState({tweets: result.data});
                this.connectStream();
            });
    }

    connectStream() {
        const stream = T.stream('user');

        stream.on('error', (error) => {
            throw error;
        });

        stream.on('tweet', (tweet) => {
            const tweets = this.state.tweets;
            const newTweets = [tweet].concat(tweets);
            this.setState({tweets: newTweets});
        });
    }
}