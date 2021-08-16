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