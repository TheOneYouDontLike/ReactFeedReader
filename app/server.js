'use strict';

import express from 'express';
import bodyParser from 'body-parser';
import _ from 'lodash';
import feedReader from './feedReader.js';
import fs from 'fs';

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

let feeds = ['http://aimforsimplicity.com/feed.atom', 'http://blog.jonathanchannon.com/feed.xml'];

// api
app.get('/feeds', (req, res) => {
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

app.get('/article/:articleTitle', (req, res) => {
    feedReader.read(feeds, (error, articles) => {
        writeToFile(articles);
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

app.post('/feed', (req, res) => {
    console.log(req.body);
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
