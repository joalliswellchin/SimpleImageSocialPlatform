const express = require('express');

const router = require('./storypost/router');

require('dotenv').config();

const app = express();
const host = process.env.HOST;
const port = process.env.PORT;

// add all controllers
app.use('/storypost', router);

// access for healthcheck
app.get('/', function (req, res) {
    res.send('Hello World! Health check is good :)');
});

app.listen(port, function () {
    console.log("Example app listening at http://" + host + ":" + port);
});