const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const users = require('./users.route');

const port = 3000;

// req.body data 를 사용할 수 있도록 합니다
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/users', users);

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});

module.exports = app;