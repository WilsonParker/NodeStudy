Section4
==

참고 사이트
--

[Package.json](https://edu.goorm.io/learn/lecture/557/%ED%95%9C-%EB%88%88%EC%97%90-%EB%81%9D%EB%82%B4%EB%8A%94-node-js/lesson/174371/package-json)

Package.json
--

> 기본적으로 CommonJS 의 명세를 충실히 따르고 있으며 JSON 형식의 파일 입니다\
> 사용하는 확장 모듈에 대한 의존성 관리가 가능하기 때문에 편리합니다.

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

### scripts

> npm {key} 로 실행할 수 있습니다\
> ex)

```shell
$ npm test
```

### dependencies

> 프로젝트 설명으로, 문자열로 기술합니다.\
> npm search 로 검색된 리스트에 표시되기 때문에 사람들이 패키지를 찾아내고 이해하는데 도움이 됩니다\
> npm install, npm update 등 을 통해 설치 및 버전 관리가 가능합니다.
