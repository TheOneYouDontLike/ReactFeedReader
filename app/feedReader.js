'use strict';

import FeedParser from 'feedparser';
import request from 'request';

var feedReader = {
    read: read
};

function read(feeds, callback) {
    let req = request(feeds[0]);
    let feedparser = new FeedParser();
    let items = [];

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
            items.push(item);
        }
    });

    feedparser.on('end', function() {
        callback(null, items);
    });
}

module.exports = feedReader;