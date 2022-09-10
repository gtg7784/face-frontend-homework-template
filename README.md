# DApp example

과제를 하기 위한 샘플 프로젝트입니다.

nodejs 16 버전에서 동작을 확인했습니다.

## 패키지 설치 및 빌드

다음 명령어를 실행하여 샘플 DApp을 빌드합니다.

```
npm install
npx lerna bootstrap
npx lerna run build
```

## 샘플 디앱 실행

다음 명령어를 실행하여 샘플 디앱을 실행합니다.
http://localhost:3000 에서 샘플 DApp을 확인할 수 있습니다.
"Send Tx" 버튼을 누르면 자기 자신에게 0.1 eth를 보내는 DApp입니다.

```
cd packages/sampledapp
npm run dev
```

## @face/wallet 실행

다음 명령어를 통해 `@face/wallet` 을 실행합니다.
```sh
cd packages/wallet
npm run dev
```


http://localhost:3000 에서 `@face/wallet` 을 확인할 수 있습니다.
`회원가입` 버튼을 누르면 회원가입 창이 뜨고
`트랜잭션 전송` 버튼을 누르면 트랜잭션 전송이 이뤄집니다.

더 자세한 내용이 궁금하다면, [@face/wallet/README.md](./packages/wallet/README.md) 를 참고해주세요.
