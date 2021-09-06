const models = require('./models');
const util = require('./utils');

const index = (req, res, next) => {
    models.Users.findAll({}).then(users => {
        res.json(users);
    })
}

const show = (req, res, next) => {
    models.Users.findOne({
        where: {
            id: req.params.id
        }
    }).then(user => {
        res.json(user); // {"id":3,"name":"chris"}
    })
}

const store = (req, res, next) => {
    models.Users.create({
        name: req.body.name
    }).then(user => {
        res.json(user);
        // {"id": 4, "name": "john"}
    });
}

const update = (req, res, next) => {
    // request 에 저장된 user 의 이름을 변경 합니다
    models.Users.findOne({
        where: {
            id: req.params.id
        }
    }).then(user => {
        user.name = req.body.name;
        user.save()
            .then(() => {
                res.json(user);
                // {"id": 3, "name": "mari"}
            }).catch(err => {
            res.status(500).end();
        })
    })
}

const destroy = (req, res, next) => {
    models.Users.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        index(req, res);
        // [{"id": 2, "name": "bek"}, {"id": 3, "name": "chris"}, {"id": 4, "name": "john"}]
    })
}

module.exports = {
    index, show, store, update, destroy
}