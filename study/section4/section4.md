Section4
==

참고 사이트
--

[Package.json](https://edu.goorm.io/learn/lecture/557/%ED%95%9C-%EB%88%88%EC%97%90-%EB%81%9D%EB%82%B4%EB%8A%94-node-js/lesson/174371/package-json)

Package.json
--

- scripts

> npm {key} 로 실행할 수 있습니다\
> ex)

```shell
$ npm test
```

```json
{
  "name": "myapp",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "node ./bin/www",
    "test": "echo test"
  },
  "dependencies": {
    "debug": "~2.6.9",
    "express": "~4.16.1",
    "http-errors": "~1.6.3",
    "morgan": "~1.9.1",
    "pug": "2.0.0-beta11"
  },
  "main": "app.js",
  "devDependencies": {},
  "author": "",
  "license": "ISC",
  "description": ""
}

```
