// uri path 에 :id 를 사용할 경우 해당 id 가 users 에 존재하는지 검사 합니다
const {check} = require("express-validator");
const {User} = require("../models");
const userValidation = check('id').custom(async (value, {req}) => {
    // id에 해당하는 회원이 존재하는지 확인
    let user = await User.findOne({
        where: {
            email: req.body.email,
        }
    });

    // user 가 존재하지 않을 경우 error 를 발생 합니다
    if (!user) {
        throw new Error('not found user');
    }

    // 찾은 user 를 request 에 전송 합니다.
    req.user = user;
    return true;
});

module.exports = {
    userValidation,
};