# @face/wallet

## Description

이 프로젝트는 `@face/sdk` 를 사용하여 로그인 과정과 트랜잭션 전송 과정을 작성하여 보여주는 데모 페이지입니다.

## How To Use

- ***Install Dependencies***: 

  ```sh 
  npm install
  ``` 
  
  위의 명령어를 통해 프로젝트 실행에 필요한 디펜던시를 설치합니다.

  이 프로젝트는 [lerna](https://lerna.js.org/) 를 통해 구성된 모노레포입니다. `@face/sdk` 와 관련한 에러가 발생한다면 아래 명령어를 통해 다른 레포들을 다시 bootstrap 해주세요.

  ```sh
  npx lerna bootstrap
  ```

- ***Run Dev Server***
  ```sh
    npm run dev
  ```

  위의 명령어를 통해 프로젝트의 Dev 버전의 서버를 실행합니다.

- ***Build***
  ```sh 
  npm build
  ```

  위의 명령어를 통해 프로젝트를 빌드합니다.

  빌드된 프로젝트의 결과물은 `.next` 디렉토리에서 확인할 수 있습니다.

- ***Run The Client(Nextjs) Prod Server***

  프로젝트의 Production 버전 서버를 실행하려면, 우선 ***Build*** 가 먼저 실행되어야 합니다.

  위의 과정을 통해 빌드가 되었다면, 아래 명령어를 통해 서버를 실행합니다.
  ```sh
  npm run start
  ```

- ***Run the Storybook***

  이 프로젝트는 Storybook 을 사용하여 개발되어 있습니다. 만약 Storybook 을 실행하고 싶다면 아래 코드를 통해 실행 할 수 있습니다.
  ```sh
    npm run storybook
  ```

  Storybook 을 빌드하여 사용하고 싶다면, 아래 코드를 통해 빌드합니다.

  ```sh
    npm run build-storybook
  ```

- ***Testing***

  이 프로젝트는 [Jest](https://jestjs.io/), [Testing Library](https://testing-library.com/) 를 통해 테스트가 작성되어 있습니다.

  테스트를 실행하고 싶다면, 아래 코드를 통해 실행합니다.

  ```sh
  npm run test
  ```

  만약, 테스트틑 테스트를 실행 할 때에, `--watchAll` 옵션을 포함하고 싶다면, 아래 코드를 통해 실행합니다.

  ```sh
  npm run test:watch
  ```

  만약, 이 테스트가 커버하는 `coverage` 를 확인하고 싶다면, 아래 코드를 통해 실행합니다.

  ```sh
  npm run test:cov
  ```

