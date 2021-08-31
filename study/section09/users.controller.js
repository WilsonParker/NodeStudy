const models = require('./models');

const index = (req, res, next) => {
    models.Users.findAll()
        .then(users => {
            res.json(users); // [{"id":1,"name":"alice"},{"id":2,"name":"bek"},{"id":3,"name":"chris"}]
        });
}

const show = (req, res, next) => {
    models.Users.findByPk(req.params.id)
        .then(user => {
            res.json(user); // {"id":1,"name":"alice"}
        });
}

const store = (req, res, next) => {
    models.Users.create({
        name: req.body.name
    }).then(user => {
        res.json(user); // {"id": 4, "name": "john"}
    });
}

const update = (req, res, next) => {
    models.Users.findByPk(req.params.id)
        .then(user => {
            user.name = req.body.name;
            user.save()
                .then(() => {
                    res.json(user); // {"id": 3, "name": "mari"}
                }).catch(err => {
                res.status(500).end();
            });
        });
}

const destroy = (req, res, next) => {
    models.Users.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        index(req, res); // [{"id": 2, "name": "bek"}, {"id": 3, "name": "chris"}, {"id": 4, "name": "john"}]
    });
}

module.exports = {
    index, show, store, update, destroy
}