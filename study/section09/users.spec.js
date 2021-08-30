const api = require('supertest');
const assert = require('assert');
const should = require('should');
const app = require('./example');
const syncDB = require('./sync-db');
const models = require('./models');

describe('GET /users 는', () => {
    before(() => syncDB());
    before(() => {
        models.Users.bulkCreate([
            {name: 'alice'},
            {name: 'bek'},
            {name: 'chris'},
        ])
    });

    it('select all users', (done) => {
        api(app)
            .get('/users')
            .end((err, res) => {
                console.log(res.body);
                done();
            })
    })
})

describe('GET /users/1 는', () => {
    it('show user 1', (done) => {
        api(app)
            .get('/users/1')
            .end((err, res) => {
                let data = res.body;
                console.log(data);
                assert.equal(data.hasOwnProperty("name"), true);
                assert.equal(data.name, "alice");
                done();
            })
    })
})

describe('POST /users 는', () => {
    it('store user name is john', (done) => {
        let name = 'john';
        api(app)
            .post('/users')
            .send({
                name: name
            })
            .end((err, res) => {
                let data = res.body;
                console.log(data);
                assert.equal(data.name, name);
                done();
            })
    })
})

describe('Update /users 는', () => {
    it('update user name mari where id is 3', (done) => {
        let name = 'mari';
        api(app)
            .put('/users/3')
            .send({
                name: name
            })
            .end((err, res) => {
                let data = res.body;
                console.log(data);
                assert.equal(data.name, name);
                done();
            })
    })
})

describe('DELETE /users 는', () => {
    it('delete user id is 1', (done) => {
        api(app)
            .delete('/users/1')
            .end((err, res) => {
                let data = res.body;
                console.log(data);
                let user = data.find(function (ele) {
                    return ele.id == 1;
                });
                assert.equal(user, undefined);
                done();
            })
    })
})