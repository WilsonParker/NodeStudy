Section1
==

[Morgan]: https://www.npmjs.com/package/morgan

[ExpressJS]: https://expressjs.com/ko/

참고 사이트
--

[ExpressJS][ExpressJS] \
[NpmJS](https://www.npmjs.com/) \
[Morgan][Morgan]

ExpressJS 기초
--

- 어플리케이션 (Application)
  > 일반적으로, 특정한 목적의 연산을 수행하도록 설계된 하나 이상의 프로그램 입니다.\
  > Express 의 Context 에서는, Node.js 플랫폼에서 실행되며 Express API 를 사용하는 프로그램을 말합니다.\
  > 또한 App Object 를 지칭할 수 도 있습니다.

- 미들웨어 (Middleware)
  > 미들웨어 함수는 요청 오브젝트(req), 응답 오브젝트(res), 그리고 애플리케이션의 요청-응답 주기 중 그 다음의 미들웨어 함수에 대한 엑세스 권한을 갖는 함수 입니다\
  > 그 다음의 미들웨어 함수는 일반적으로 next 라는 이름으로 변수로 표시 됩니다

    1. 모든 코드를 실행
    2. 요청 및 응답 오브젝트에 대한 변경을 실행
    3. 요청-응답 주기를 종료
    4. 스택 내의 그 다음 미들웨어를 호출


- 라우팅 (Routing)
  > 자원을 식별하는 URL의 일부 입니다.\
  > 예를 들면, http://foo.com/products/id 에서 "/products/id" 가 라우트 입니다

- 요청 객체 (Request)
  > HTTP 요청 입니다.\
  > 클라이언트는 HTTP 요청 메시지를 서버에 제출하며, 서버는 응답을 리턴 합니다.\
  > 요청은 여러 요청 메소드 중 하나를 사용해야 합니다\
  > ex) GET, POST 등

- 응답 객체 (Response)
  > HTTP 응답 입니다.\
  > 서버는 HTTP 응답 메시지를 클라이언트에 리턴 합니다.\
  > 응답에는 요청에 대한 완료 상태 정보가 포함되어 있으며 응답 메시지 본문에는 요청된 컨텐츠가 포함되어 있을 수도 있습니다.

Express & Morgan 설치
--

### 참고

> [ExpressJS][ExpressJS] \
> [Morgan][Morgan] : HTTP request logger middleware for node.js

```shell
$ npm install express --svae
$ npm install morgan
```

Middleware 예제
--

```javascript
// middleware 몌제

// express 모듈 로드
const express = require('express');
// 외부 라이브러리 morgan middleware 로드
const morgan = require('morgan');
const app = express();

const PORT = 3000;

// middleware 함수 생성
function middlewareFun1(req, res, next) {
    console.log('middlewareFun1');
    // next 함수를 사용해야 다음 middleware 를 호출 합니다
    // next 함수를 실행하지 않으면 다음 미들웨어를 호출하지 않습니다
    next();
}

// middleware 함수 생성
function middlewareFun2(req, res, next) {
    console.log('middlewareFun2');
    // next 함수에 error 을 전달 하여 error middleware (middlewareErr) 가 호출되도록 합니다
    next(new Error('error occurred'));
}

function middlewareErr(err, req, res, next) {
    console.log('middlewareErr : ' + err.message);
    next();
}

// middleware 적용
// 등록 순서대로 실행 됩니다
app.use(middlewareFun1);
app.use(middlewareFun2);

// 외부 라이브러리 morgan 에 dev 옵션 추가
// tiny : The minimal output.
// :method :url :status :res[content-length] - :response-time ms
// ex) GET / 304 - - 2.698 ms
app.use(morgan('tiny'));
// middlewareFun2 에서 error 가 발생하여 실행되지 않고 middlewareErr 로 건너 뜁니다

// error middleware 적용
app.use(middlewareErr);

// dev : :method :url :status :response-time ms - :res[content-length]
// :method :url :status :response-time ms - :res[content-length]
// ex) GET / 304 1.164 ms - -
app.use(morgan('dev'));

app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}`);
});

// GET 방식으로 route / 설정
app.get('/', function (req, res) {
    // Hello World! 를 응답 합니다
    res.send('Hello World!');
});
```

### 실행

```shell
$ node 경로/파일이름.js
```

### 결과

> Example app listening on port 3000\
> middlewareFun1\
> middlewareFun2\
> middlewareErr : error occurred\
> GET / 304 1.164 ms - -