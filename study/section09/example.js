const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const syncDB = require('./sync-db');
const users = require("./users.route");

const port = 3000;

// req.body data 를 사용할 수 있도록 합니다
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// route 를 등록합니다
app.use('/users', users);


// DB 가 연결되면 server 를 실행 합니다
syncDB().then(() => {
    console.log('Sync database');
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}!`);
    });
});

module.exports = app;