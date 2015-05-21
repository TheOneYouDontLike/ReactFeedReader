'use strict';

import express from 'express';
import bodyParser from 'body-parser';

var app = express(),
    port = 2222;

// config
app.use(bodyParser.json());

// VIEWS
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, () => {
    console.log('server started at port: ' + port);
});
