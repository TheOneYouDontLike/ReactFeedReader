'use strict';

import express from 'express';
import bodyParser from 'body-parser';
import _ from 'lodash';
import feedReader from './app/feedReader.js';

var app = express(),
    port = 2222;

// config
app.use(bodyParser.json());

// api
app.get('/feeds', (req, res) => {
    feedReader.read((error, articles) => {
        let responseData = _.map(articles, function(article) {
            return {
                title: article.title
            };
        });

        res.send(responseData);
    });
});

app.get('/article/:articleTitle', (req, res) => {
    feedReader.read((error, articles) => {
        let articleToDisplay = _(articles)
            .filter((article) => {
                return article.title.indexOf(req.params.articleTitle)  > -1;
            })
            .map((article) => {
                return {
                    content: article.description
                };
            })
            .first();

        res.send(articleToDisplay);
    });
});

// VIEWS
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, () => {
    console.log('server started at port: ' + port);
});
