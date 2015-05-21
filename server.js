'use strict';

var express              = require('express'),
    bodyParser           = require('body-parser');

var app = express(),
    port = 2222;

// config
app.use(bodyParser.json());

// VIEWS
app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, function() {
    console.log('server started at port: ' + port);
});
