let express = require('express');
let bcrypt = require('bcrypt');
let passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
let {User} = require('../models');
let util = require('./utils');
let router = express.Router();

router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/', async (req, res, next) => {
    console.log(req.body);
    try {
        let user = await User.findOne({
            where: {
                email: req.body.email,
            }
        });
        if (user) {
            return res.status(403).send('이미 존재하는 회원 입니다');
        }

        let hashedPassword = await bcrypt.hash(req.body.password, 16);
        await User.create({
            email: req.body.email,
            nickname: req.body.nickname,
            password: hashedPassword,
        });
        res.status(201).send('success');
    } catch (error) {
        console.error(error)
        next(error);
    }
});

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, (email, password, done) => {
    // *done 함수의 첫번째 인자는 error 여부, 두번째 인자는 결과값, 세번째 인자는 실패하였을 경우에 정보입니다.
    User.findOne({
        where: {email}
    }, async (findError, user) => {
        if (findError) {
            return done(findError);
        }

        if (!user) {
            return done(null, false, {reason: '이메일에 해당하는 회원이 존재하지 않습니다.'});
        }

        try {
            // password 가 일치하는지 확인
            let result = await bcrypt.compare(password, user.password);
            if (result) {
                return done(null, user);
            }
            return done(null, false, {reason: '비밀번호가 일치하지 않습니다.'});
        } catch (error) {
            return done(error);
        }
    });
}));

module.exports = router;
