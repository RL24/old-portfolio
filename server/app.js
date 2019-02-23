const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const { __routes } = require('./src/route');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, './dist')));

__routes.forEach((route) => {
    if (route.controller)
        app[route.type](`/api${route.route}`, route.controller);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './dist/index.html'));
});

console.log('Running server on port 3000');
app.listen(3000);