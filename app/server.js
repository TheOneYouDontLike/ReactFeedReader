'use strict';

import express from 'express';
import bodyParser from 'body-parser';
import _ from 'lodash';
import feedReader from './feedReader.js';
import fs from 'fs';
import JsonPersistence from './jsonPersistence'

function writeToFile(file) {
    fs.writeFile('debug.json', JSON.stringify(file), (error) => {
        console.log(error);
        console.log('written to file');
    });
}

let app = express(),
    port = 2222;

// config
app.use(bodyParser.json());

let persistence = new JsonPersistence('feeds.json');

/* for debugging only */
persistence.init((error) => {
    persistence.addRange(['http://aimforsimplicity.com/feed.atom', 'http://blog.jonathanchannon.com/feed.xml'], (error) => {
        if (error) {
            console.log(error);
            return;
        }
    });
});

// api
app.get('/feeds', (req, res) => {
    let feeds = persistence.getAll((error, feeds) => {
        feedReader.read(feeds, (error, articles) => {
            let responseData = _.map(articles, function(article) {
                return {
                    title: article.title,
                    summary: article.summary
                };
            });

            res.send(responseData);
        });
    });
});

app.get('/article/:articleTitle', (req, res) => {
    let feeds = persistence.getAll((error, feeds) => {
        feedReader.read(feeds, (error, articles) => {
            let articleToDisplay = _(articles)
                .filter((article) => {
                    return article.title.indexOf(req.params.articleTitle)  > -1;
                })
                .map((article) => {
                    return {
                        content: article.description,
                        title: article.title,
                        date: article.date,
                        author: article.author,
                        link: article.link
                    };
                })
                .first();

            res.send(articleToDisplay);
        });
    });
});

app.post('/feed', (req, res) => {
    persistence.add(req.body.feedAddress, () => {
        console.log('new feed added');
    });

    res.end();
});

// VIEWS
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, () => {
    console.log('server started at port: ' + port);
});
