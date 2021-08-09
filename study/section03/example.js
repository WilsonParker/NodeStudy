// Middleware & Route 몌제

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

// dev : Concise output colored by response status for development use
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

/*
* @Result
*
* Example app listening on port 3000
* middlewareFun1
* middlewareFun2
* middlewareErr : error occurred
* GET / 304 1.164 ms - -
* */