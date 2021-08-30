const util = require('./utils');

const index = (req, res, next) => {
    res.json(util.users); // [{"id":1,"name":"alice"},{"id":2,"name":"bek"},{"id":3,"name":"chris"}]
}

const show = (req, res, next) => {
    res.json(req.user); // {"id":3,"name":"chris"}
}

const store = (req, res, next) => {
    util.createUser(req.body.name);
    res.json(util.users); // [{"id": 1, "name": "alice"}, {"id": 2, "name": "bek"}, {"id": 3, "name": "chris"}, {"id": 4, "name": "john"}]
}

const update = (req, res, next) => {
    // request 에 저장된 user 의 이름을 변경 합니다
    req.user.name = req.body.name;
    res.json(req.user); // {"id": 3, "name": "mari"}
}

const destroy = (req, res, next) => {
    // :id 에 해당하는 user 의 index를 찾습니다
    let index = util.users.findIndex(function (ele) {
        return ele.id == req.user.id;
    });
    // index 에 해당하는 user 를 제거합니다
    util.users.splice(index, 1);
    res.json(util.users); // [{"id": 1, "name": "alice"}, {"id": 2, "name": "bek"}]
}

module.exports = {
    index, show, store, update, destroy
}