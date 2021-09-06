const express = require('express')
const bodyParser = require('body-parser')
const {check, oneOf} = require('express-validator');
const util = require('./utils');
const app = express();

const port = 3000;

// user 를 생성 합니다
util.createUser('alice');
util.createUser('bek');
util.createUser('chris');

// req.body data 를 사용할 수 있도록 합니다
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});

app.get('/users', (req, res) => {
    res.json(util.users); // [{"id":1,"name":"alice"},{"id":2,"name":"bek"},{"id":3,"name":"chris"}]
});

app.get('/users/:id',
    util.userValidation,
    (req, res, next) => {
        util.handle(req, res, (req, res) => {
            res.json(req.user); // {"id":3,"name":"chris"}
        })
    });

/*
* POST
* data : name=john
* */
app.post('/users',
    oneOf([
        check('name').notEmpty(),
    ]),
    (req, res, next) => {
        util.handle(req, res, () => {
            util.createUser(req.body.name);
            res.json(util.users); // [{"id": 1, "name": "alice"}, {"id": 2, "name": "bek"}, {"id": 3, "name": "chris"}, {"id": 4, "name": "john"}]
        })
    });

/*
* PUT
* data : name=mari
* */
app.put('/users/:id',
    util.userValidation,
    (req, res, next) => {
        util.handle(req, res, () => {
            // request 에 저장된 user 의 이름을 변경 합니다
            req.user.name = req.body.name;
            res.json(req.user); // {"id": 3, "name": "mari"}
        })
    });

app.delete('/users/:id',
    util.userValidation,
    (req, res, next) => {
        util.handle(req, res, () => {
            // :id 에 해당하는 user 의 index를 찾습니다
            let index = util.users.findIndex(function (ele) {
                return ele.id == req.user.id;
            });
            // index 에 해당하는 user 를 제거합니다
            util.users.splice(index, 1);
            res.json(util.users); // [{"id": 1, "name": "alice"}, {"id": 2, "name": "bek"}]
        })
    });

module.exports = app;