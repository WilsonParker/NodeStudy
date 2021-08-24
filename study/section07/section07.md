Section07
==

참고 사이트
--
[npmjs/body-parser](https://www.npmjs.com/package/body-parser)   
[express-validator](https://express-validator.github.io/docs/index.html)

### Validation

> 정의 : 어떤 데이터의 값이 유효한지 확인하는 것을 의미 합니다\
> express-validator 를 이용하여 api 가 동작 하기 전에 올바른 데이터가 전달되었는지 확인 합니다

### Installation

```shell
$ npm i body-parser
$ npm i --save express-validator
```

### utils.js

> validation 및 api 동작에 필요한 function 들을 정리 해놓았습니다

```javascript
const {body, validationResult, param, check, oneOf} = require('express-validator');
const users = [];
let id = 1;

// user 를 생성합니다
function createUser(name) {
    users.push({
        id: id++,
        name: name,
    });
}

// id 에 해당하는 user 를 찾고 return 합니다
function findUser(id) {
    return users.find(function (ele) {
        return ele.id == id;
    });
}

// validation check 를 하여 error 처리 또는 callback 을 실행 합니다
function handle(req, res, callback) {
    try {
        // validation 에 문제가 생실 경우 error 를 발생합니다
        validationResult(req).throw();
        callback(req, res);
    } catch (err) {
        // validation 이 올바르지 않을 경우 첫 번 째 error message 출력
        res.status(400).json(err.errors[0].msg);
    }
}

// uri path 에 :id 를 사용할 경우 해당 id 가 users 에 존재하는지 검사 합니다
const userValidation = check('id').custom((value, {req}) => {
    // id에 해당하는 회원이 존재하는지 확인
    let user = findUser(value);

    // user 가 존재하지 않을 경우 error 를 발생 합니다
    if (!user) {
        throw new Error('not found user');
    }

    // 찾은 user 를 request 에 전송 합니다.
    req.user = user;
    return true;
});

module.exports = {
    users,
    createUser,
    findUser,
    userValidation,
    handle
};
```

### example.js

```javascript
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
```