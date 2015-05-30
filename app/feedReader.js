'use strict';

import FeedParser from 'feedparser';
import request from 'request';
import _ from 'lodash';

var feedReader = {
    read: read
};

function read(feeds, callback) {
    let feedsToRead = feeds.length;
    let parsedFeeds = [];

    _.forEach(feeds, (feed) => {
        _parseFeed(feed, (articles) => {
            let parsedFeed = {
                address: feed,
                articles: articles
            };

            parsedFeeds.push(parsedFeed);
            feedsToRead -= 1;

            if (feedsToRead === 0) {
                let error = null;
                callback(error, parsedFeeds);
            }
        });
    });
}

function _parseFeed(feed, callback) {
    let req = request(feed);

    let options = {
        feedurl: feed
    };

    let feedparser = new FeedParser(options);
    let articles = [];

    req.on('error', function(error) {
        console.log(error);
    });

    req.on('response', function(res) {
        var stream = this;

        if (res.statusCode !== 200) {
            return this.emit('error', new Error('Bad status code'));
        }

        stream.pipe(feedparser);
    });

    feedparser.on('error', function(error) {
        console.log(error);
    });

    feedparser.on('readable', function() {
        // This is where the action is!
        let stream = this;
        let meta = this.meta; // **NOTE** the "meta" is always available in the context of the feedparser instance
        let item = {};

        while (item = stream.read()) {
            articles.push(item);
        }
    });

    feedparser.on('end', function() {
        callback(articles);
    });
}


module.exports = feedReader;