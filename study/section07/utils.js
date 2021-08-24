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