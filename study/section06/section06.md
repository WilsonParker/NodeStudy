Section6
==

참고 사이트
--

[mochajs.org](https://mochajs.org)   
[shouldjs](https://shouldjs.github.io)   
[shouldjs.github](https://github.com/shouldjs/should.js/)   
[supertest.github](https://github.com/visionmedia/supertest)

installation
--
```shell
$ npm i mocha --save-dev
$ npm i should --save-dev
$ npm i supertest --save-dev
```

Run Test
--
```shell
$ {경로}/node_modules/.bin/mocha {파일이름}.js
```

Example
--
```javascript
// const assert = require('assert');
const should = require('should');

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

describe('utils.js module 의 capitalize 함수는 ', () => {
    it('문자열의 첫번째 문자를 대문자로 변환한다', () => {
        const result = capitalize('hello');
        // assert.equal(result, "Hello");
        result.should.be.equal('Hello');
    });
});
```

API Example
--
```javascript
// section05 의 example.js 를 이용하여 api test 합니다
const app = require('../section05/example');
const api = require('supertest');
const assert = require('assert');

describe('GET /users 는', () => {
    it('...', (done) => {
        api(app)
            .get('/users')
            .end((err, res) => {
                console.log(res.body);
                done();
            })
    })
})

describe('GET /users/1 는', () => {
    it('...', (done) => {
        api(app)
            .get('/users/1')
            .end((err, res) => {
                let data = res.body;
                assert.equal(data.hasOwnProperty("name"), true);
                assert.equal(data.name, "alice");
                done();
            })
    })
})

describe('POST /users 는', () => {
    it('...', (done) => {
        let name = 'john';
        api(app)
            .post('/users?name=' + name)
            .end((err, res) => {
                let data = res.body;
                console.log(data);
                let user = data.find(function (ele) {
                    return ele.name == name;
                });
                assert.equal(user.name, name);
                done();
            })
    })
})
```