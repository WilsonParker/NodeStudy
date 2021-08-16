Section5
==

참고 사이트
--

#### HTTP 요청 메소드

[developer.mozilla.org](https://developer.mozilla.org/ko/docs/Web/HTTP/Methods)    
[medium.com](https://medium.com/@lyhlg0201/http-method-d561b77df7)

#### RESTful API

[gmlwjd9405.github.io](https://gmlwjd9405.github.io/2018/09/21/rest-and-restful.html)

#### HTTP 상태코드

[developer.mozilla.org](https://developer.mozilla.org/ko/docs/Web/HTTP/Status)   
[whatap.io](https://www.whatap.io/ko/blog/40/)

HTTP 요청 메소드
--

- GET

> 특정 리소스의 표시를 요청합니다.\는
> 오직 데이터를 받기만 합니다\
> RESTful 에서는 READ 를 할 떄 사용됩니다.\
> ex) GET /users\
> GET /users/{id}

- POST

> 특정 리소스에 엔티티를 제출할 때 쓰입니다.\
> RESTful 에서는 CREATE 를 할 때 사용됩니다.\
> ex) POST /users

- PUT

> 목적 리소스 모든 현재 표시를 요청 payload 로 바꿉니다
> RESTful 에서는 UPDATE 를 할 때 사용됩니다\
> ex) PUT /users/{id}

- DELETE

> 특정 리소스를 삭제 합니다.\
> RESTful 에서는 DELETE 를 할 때 사용됩니다\
> ex) DELETE /users/{id}

HTTP 상태코드
--

- 1XX Information responses

> 서버가 요청을 받았으며, 서버에 연결된 클라이언트는 작업을 계속 진행하라는 의미 입니다.

- 2XX Successful responses
    - 200 OK
  > 요청이 성공적으로 되었습니다.\
  > 정보는 요청에 따른 응답으로 변환됩니다.
    - 201 Created
  > 요청이 성공적이었으며 그 결과로 새로운 리소스가 생성되었습니다.\
  > 이 응답은 일반적으로 POST 요청 또는 일부 PUT 요청 이후에 따라 옵니다.
    - 204 No Content
  > 요청에 대해서 보내줄 수 있는 콘텐츠가 없지만, 헤더는 의미있을 수 있습니다.\
  > 사용자 - 에이전트는 리소스가 캐시된 헤더를 새로운 것으로 업데이트 할 수 있습니다.
- 4XX Client error responses
    - 400 Bad Request
  > 이 응답은 잘못된 문법으로 인하여 서버가 요청을 이해할 수 없음을 의미합니다.
    - 401 Unauthorized
  > 비록 HTTP 표준에서는 "미승인(unauthorized)"를 명확히 하고 있지만, 의미상 이 응답은 "비인증(unauthenticated)"을 의미 합니다.\
  > 클라이언트는 요청한 응답을 받기 위해서는 반드시 스스로를 인증해야 합니다.
    - *403 Forbidden
  > 클라이언트는 콘텐츠에 접근할 권리를 가지고 있지 않습니다.\
  > 예를 들어 그들은 미승인이어서 서버는 거절을 위한 적절한 응답을 보냅니다.\
  > 401과 다른 점은 서버가 클라이언트가 누구인지 알고 있습니다.
    - 404 Not Found
  > 서버는 요청받은 리소스를 찾을 수 없습니다.\
  > 이것은 API에서 종점은 적절하지만 리소스 자체는 존재하지 않음을 의미할 수도 있습니다.
    - *405 Method Not Allowd
  > 요청한 메소드는 서버에서 알고 있지만, 제거되었고 사용할 수 없습니다.\
  > 예를 들어, 어떤 API에서 리소스를 삭제하는 것을 금지할 수 있습니다.
    - 409 Conflict
  > 이 응답은 요청이 현재 서버의 상태와 충돌될 때 보냅니다.
- 5XX Server error responses
    - 500 Internal Server Error
  > 서버가 처리 방법을 모르는 상황이 발생했습니다.
    - *502 Bad GateWay
  > 이 오류 응답은 서버가 요청을 처리하는데 필요한 응답을 얻기 위해 게이트웨이로 작업하는 동안 잘못된 응답을 수신했음을 의미합니다.
    - *504 Gateway Timeout
  > 이 오류 응답은 서버가 게이트웨이 역활을 하고 있으며 적시에 응답을 받을 수 없을 때 주어집니다.

Example
--
```javascript
const express = require('express');
const app = express();

const port = 3000;
const users = [];
let id = 1;

function createUser(name) {
  users.push({
    id: id++,
    name: name,
  });
}

function findUser(id) {
  return users.find(function (ele) {
    return ele.id == id;
  });
}

createUser('alice');
createUser('bek');
createUser('chris');

app.get('/users', function (req, res) {
  res.json(users); // [{"id":1,"name":"alice"},{"id":2,"name":"bek"},{"id":3,"name":"chris"}]
});

app.get('/users/:id', function (req, res) {
  // :id 에 해당하는 user 를 찾습니다
  let user = findUser(req.params.id)
  res.json(user); // {"id":3,"name":"chris"}
});

/*
* POST
* data : name=john
* */
app.post('/users', function (req, res) {
  createUser(req.query.name);
  res.json(users); // [{"id": 1, "name": "alice"}, {"id": 2, "name": "bek"}, {"id": 3, "name": "chris"}, {"id": 4, "name": "john"}]
});

/*
* PUT
* data : name=mari
* */
app.put('/users/:id', function (req, res) {
  // :id 에 해당하는 user 를 찾습니다
  let user = findUser(req.params.id)
  user.name = req.query.name;
  res.json(user); // {"id": 3, "name": "mari"}
});

app.delete('/users/:id', function (req, res) {
  // :id 에 해당하는 user 의 index를 찾습니다
  let index = users.findIndex(function (ele) {
    return ele.id == req.params.id;
  });
  // index 에 해당하는 user 를 제거합니다
  users.splice(index, 1);
  res.json(users); // [{"id": 1, "name": "alice"}, {"id": 2, "name": "bek"}]
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});

module.exports = app;
```