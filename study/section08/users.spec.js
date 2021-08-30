const api = require('supertest');
const assert = require('assert');
const should = require('should');
const app = require('./example');

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
            .post('/users')
            .send({
                name : name
            })
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