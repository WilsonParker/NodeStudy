const express = require('express')
const router = express.Router();
const {check, oneOf} = require('express-validator');
const util = require('./utils');
const controller = require('./users.controller');

// user 를 생성 합니다
util.createUser('alice');
util.createUser('bek');
util.createUser('chris');

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