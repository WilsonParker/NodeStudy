Section09
==

> Router 로 users.route.js\
> Controller 로 users.controller.js 를 사용하여 코드를 분리합니다\
> Database 를 이용하여 API 를 개발 합니다\
> middleware 에서 id 에 해당하는 User 가 존재하면 request 에 저장하며 (request.user)\
> 그렇지 않으면 error 를 발생시킵니다

Database
--

### sync-db.js

- Database 를 sync 합니다

```javascript
const models = require('./models');

module.exports = () => {
    return models.sequelize.sync({force: true});
}
```

### models.js

- Table 내용이 정의되어 있습니다

```javascript
const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite',
    // logging: false, // DB query 등 logging 여부
});

/*
 * primary key 로 id,
 * createdAt, updatedAt (timestamp) 가 자동으로 생성 됩니다
 */
const Users = sequelize.define('Users' /* table name */, {
    name: {
        type: Sequelize.DataTypes.STRING
    }
});

module.exports = {Sequelize, sequelize, Users}
```

Router
--

### users.route.js

- uri 에 따라 controller 와 연결해줍니다

```javascript
const express = require('express')
const router = express.Router();
const {check, oneOf} = require('express-validator');
const util = require('./utils');
const controller = require('./users.controller');

router.get('/', controller.index);

router.get('/:id',
    util.userValidation,
    util.handle,
    controller.show
);

/*
* POST
* data : name=john
* */
router.post('/',
    oneOf([
        check('name').notEmpty(),
    ]),
    util.handle,
    controller.store
);

/*
* PUT
* data : name=mari
* */
router.put('/:id',
    util.userValidation,
    util.handle,
    controller.update
);

router.delete('/:id',
    util.userValidation,
    util.handle,
    controller.destroy
);

module.exports = router;  
 ```

Controller
--

### users.controller.js
- API 기능이 작성되어 있습니다 

```javascript
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
```

index
--

```javascript
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
```