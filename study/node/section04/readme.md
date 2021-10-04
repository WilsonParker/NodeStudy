Section04
==
백엔드 노드 서버 구축하기
--
시퀄라이즈 sync + nodemon ~ 쿠기/세션과 전체 로그인 흐름

### 참조

### Documentation

[nodemon](https://edu.goorm.io/learn/lecture/557/%ED%95%9C-%EB%88%88%EC%97%90-%EB%81%9D%EB%82%B4%EB%8A%94-node-js/lesson/382959/%ED%99%95%EC%9E%A5%EB%AA%A8%EB%93%88-nodemon)   
[bcrypt](https://www.npmjs.com/package/bcrypt)

### Blog

[sequelize](https://gngsn.tistory.com/71)   
[cors](https://firework-ham.tistory.com/70)   
[passport](https://medium.com/@vdongbin/node-js-passport-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0-33e2eab2389b)   
[session](https://berkbach.com/node-js%EC%99%80-cookie-session%EC%9C%BC%EB%A1%9C-%EC%82%AC%EC%9A%A9%EC%9E%90-%EC%A0%95%EB%B3%B4-%EC%A0%80%EC%9E%A5-part-2-dbe84c2f13e4)   
[zerocho](https://www.zerocho.com/category/NodeJS/post/5e9bf5b18dcb9c001f36b275)

Nodemon
--
> nodemon은 node monitor의 약자로, 노드가 실행하는 파일이 속한 디렉터리를 감시하고 있다가 파일이 수정되면 자동으로 노드 애플리케이션을 재시작하는 확장 모듈입니다.\
> 이 확장 모듈을 이용하면 개발 중인 노드 애플리케이션의 소스 코드를 수정할 때마다 매번 노드 명령어를 통해 새로 시작할 필요가 없으므로 매우 편리합니다.

install

```shell
$ npm i -D nodemon
```

nodemon 을 통해 node 실행

```shell
$ nodemon app

package.json 에 scripts 추가 시
$ npm run dev
```

Sequelize
--

install

```shell
$ npm install --save sequelize sequelize-cli mysql2
```

models/index.js

```javascript
'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

/*
* db.Comment = require('./comment')(sequelize, Sequelize);
* db.HasTag = require('./comment')(sequelize, Sequelize);
* ...
* 위 내용을 생성된 파일에 따라 자동으로 처리 해줍니다
* */
fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
```

Bcrypt (암호화 모듈)
--

install

```shell
$ npm i bcrypt
```

```javascript
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

// To hash a password
let hash = bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
    // Store hash in your password DB.
});

// To check a password:
// if same
bcrypt.compare(myPlaintextPassword, hash, function (err, result) {
    // result == true
});
// if not the same
bcrypt.compare(someOtherPlaintextPassword, hash, function (err, result) {
    // result == false
});
```

Cors
--
> CORS 는 Cross Origin Resource Sharing 의 약자로 도메인 및 포트가 다른 서버로 클라이언트가 요청했을 때 브라우저가 보안상의 이유로 API 를 차단하는 문제입니다.\
> 예로 들면 로컬에서 클라이언트는 3000 포트로 서버는 3030 포트로 서버를 띄웠을때 또는 로컬 서버에서 다른 서버로 호출할 때 발생하게 됩니다.

install

```shell
$ npm i cors
```

```javascript
const cors = require('cors');

app.use(cors({
    // 허옹할 url
    // origin: 'http://localhost:3000',
    origin: '*',
    // Access-Control-Allow-Credentials 설정으로 쿠키가 전송되도록 합니다.
    credentials: true
}));
```

Passport
--
> Node.js 에서 Authenticate 를 적용할 때에, 편하게 사용할 수 있는 미들웨어입니다.\
> 한국말로 해석한 의미를 생각해보면 이해하기 쉽습니다.\
> 여권은 입/출국 심사시에 해당 여권 소지자가 입/출국 자격에 대해 인증하는 역할을 합니다.\
> 이를 서버에 비교해보면, 클라이언트가 서버에 요청할 자격이 있는지 인증할 때에 passport 미들웨어를 사용합니다.
>
> passport.initialize() 메서드는 서버의 요청(req 객체)에 passport 폴더의 index.js에 작성한 설정들을 입력합니다.\
> passport를 미들웨어로 사용하겠다는 선언의 의미로 생각하시면 됩니다.\
>
> passport.session() 메서드는 req.session에 passport의 정보들을 저장합니다.\
> req.session은 express-session을 통해 생성되므로, express-session 미들웨어보다 뒤에 표기해야 합니다.

install

```shell
$ npm i passport passport-local
```

app.js

```javascript
const passport = require('passport');

app.use(passport.initialize());
app.use(passport.session());
```

passport/index.js

```javascript
const passport = require('passport');
const bcrypt = require('bcrypt');
const {Strategy: LocalStrategy} = require('passport-local');
const {User} = require('../models');

module.exports = () => {
    // Strategy 성공 시 회원 id 를 저장 합니다
    passport.serializeUser((user, done) => {
        done(null, user.id)
    });

    /*
    * login 이후에 route 실행되기 전에 매번 실행되는 middleware
    * id 로 부터 회원 정보를 select 합니다.
    * req.user 로 회원 정보를 가져올 수 있습니다.
    * 
    * req.logout();
    * req.session.destory();
    * 로 logout 합니다
    * */
    passport.deserializeUser(async (id, done) => {
        try {
            let user = await User.findOne({
                where: {id}
            });
            done(null, user);
        } catch (error) {
            done(error);
        }
    });

    // LocalStrategy는 Local Database의 username과 password 를 이용해서 쿠키와 세션을 통해 사용자 인증을 수행하는 방법입니다
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    }, async (email, password, done) => {
        // *done 함수의 첫번째 인자는 error 여부, 두번째 인자는 결과값, 세번째 인자는 실패하였을 경우에 정보입니다.
        try {
            // email 에 해당하는 회원을 database 를 통해 select
            let user = await User.findOne({
                where: {email}
            });
            if (!user) {
                return done(null, false, {reason: '이메일에 해당하는 회원이 존재하지 않습니다.'});
            }

            // password 가 일치하는지 확인
            let result = await bcrypt.compare(password, user.password);
            if (result) {
                return done(null, user);
            }
            return done(null, false, {reason: '비밀번호가 일치하지 않습니다.'});
        } catch (error) {
            return done(error);
        }
    }));
};
```

routers/user.js

```javascript
const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const router = express.Router();

// middleware 확장
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (error, user, info) => {
        // server error
        if (error) {
            return next(error);
        }

        // client error
        if (info) {
            return res.status(401).send(info.reason);
        }

        // passport login 실행
        return req.login(user, async (loginError) => {
            // passport login error
            if (loginError) {
                return next(loginError);
            }
            return res.status(200).json(user);
        });
    })(req, res, next);
});
```

.env 환경 변수
--

install

```shell
$ npm i dotenv
```

.env

```dotenv
SECRET=secret-key
```

Session & Cookie
--
> 세션은 쿠키보다 더 안전하고 많은 데이터를 저장하는 저장 방식 입니다.\
> 쿠키의 경우 데이터를 사용자의 컴퓨터에 저장하기 때문에 비밀번호 같은 민감한 부분이라도 예외없이 그대로 드러납니다.\
> 하지만 세션은 데이터를 서버에 저장하기 때문에 쿠키보다 안전하다고 볼 수 있습니다.

install

```shell
$ npm i express-session
$ npm i cookie-parser
```

app.js

```javascript
const dotenv = require('dotenv');
const session = require('express-session');
const cookieParser = require('cookie-parser');

// .env 파일을 read 합니다
dotenv.config();

let secret = process.env.SECRET;

// secret 을 이용하여 Cookie를 암호화 합니다
app.use(cookieParser(secret));
app.use(session({
    // 해당 값을 이용하여 session 을 암호화 해줍니다
    secret: secret,
    // session 을 항상 저장할지 여부 (false 권장)
    resave: false,
    // 초기화 되지 않은 채 store 에 저장되는 session
    saveUninitialized: false,
    /*
    * 데이터가 저장되는 형식
    * ex) Memory Store, File Store, Mongo Store
    * */
    // store: new FileStore()
}));
```

routers/user.js

```javascript
router.post('/logout', (req, res, next) => {
    req.logout();
    req.session.destroy();
    res.send('logout success');
});
```