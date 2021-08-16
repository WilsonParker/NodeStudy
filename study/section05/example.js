const express = require('express');
const app = express();

const port = 3000;
const users = [];
let id = 1;

function createUser(name) {
    users.push({
        id: id++,
        name: name,
    });
}

function findUser(id) {
    return users.find(function (ele) {
        return ele.id == id;
    });
}

createUser('alice');
createUser('bek');
createUser('chris');

app.get('/users', function (req, res) {
    res.json(users); // [{"id":1,"name":"alice"},{"id":2,"name":"bek"},{"id":3,"name":"chris"}]
});

app.get('/users/:id', function (req, res) {
    // :id 에 해당하는 user 를 찾습니다
    let user = findUser(req.params.id)
    res.json(user); // {"id":3,"name":"chris"}
});

/*
* POST
* data : name=john
* */
app.post('/users', function (req, res) {
    createUser(req.query.name);
    res.json(users); // [{"id": 1, "name": "alice"}, {"id": 2, "name": "bek"}, {"id": 3, "name": "chris"}, {"id": 4, "name": "john"}]
});

/*
* PUT
* data : name=mari
* */
app.put('/users/:id', function (req, res) {
    // :id 에 해당하는 user 를 찾습니다
    let user = findUser(req.params.id)
    user.name = req.query.name;
    res.json(user); // {"id": 3, "name": "mari"}
});

app.delete('/users/:id', function (req, res) {
    // :id 에 해당하는 user 의 index를 찾습니다
    let index = users.findIndex(function (ele) {
        return ele.id == req.params.id;
    });
    // index 에 해당하는 user 를 제거합니다
    users.splice(index, 1);
    res.json(users); // [{"id": 1, "name": "alice"}, {"id": 2, "name": "bek"}]
});

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});

module.exports = app;