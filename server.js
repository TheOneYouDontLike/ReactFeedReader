'use strict';

import express from 'express';
import bodyParser from 'body-parser';
import feedReader from './app/feedReader.js';

var app = express(),
    port = 2222;

// config
app.use(bodyParser.json());

// api

app.get('/feeds', (req, res) => {
    feedReader.read((error, data) => {
        let responseData = JSON.stringify(data);
        res.write(responseData);
        res.end();
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
