'use strict';

import superagent from 'superagent';

function getFeeds(callback) {
    superagent
        .get('/feeds')
        .accept('application/json')
        .end((error, data) => {
            let feeds = data.body;
            callback(feeds);
        });
}

function getArticle(articleTitle, callback) {
    superagent
        .get('/article/' + articleTitle)
        .accept('application/json')
        .end((error, data) => {
             let article = data.body;
             callback(article);
        });
}

function addFeed(feedAddress, callback) {
    let dataToSend = JSON.stringify({ feedAddress: feedAddress });

    superagent
        .post('/feed')
        .send(dataToSend)
        .set('Content-Type', 'application/json')
        .accept('application/json')
        .end((error) => {
            if(error) {
                alert(error);
                return;
            }

            callback();
        });
}

let feedsApi = {
    getFeeds: getFeeds,
    getArticle: getArticle,
    addFeed: addFeed
};

export default feedsApi;