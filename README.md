## React-테스트 코드 인강따라하기

## doc 를 보고 따라하자 옵션 사용법이 다 나와있고 redux apollo 같은 것도 테스팅 예문이 다 있다.

## 참고 doc :[testing-library](https://testing-library.com/) , [cra- test](https://create-react-app.dev/)

## 중점 : 코드를 테스트 하는 것이 아니라 유저 입장에서 기능을 테스트 한다!!!!

- 유저 입장에서 act 한다음 결과를 테스트 한다.
- implementation 을 spyon 등을 통해서 할 수 있으나 테스트 커버리지에 포함되진 않는다.
- 때문에 테스트 할 수 없는 코드도 있다(코드 테스트가 아니므로)

```
//implementation 은 테스트 할 수도 있으나 커버리지에 포함되진 않는다.
spyon(localStorage.prototype,"setItem");
```

### jest-dom(리엑트에서 사용하는 dom test 기반의 솔루션)

[link testing-library](https://www.npmjs.com/package/@testing-library/jest-dom)
[link cra](https://create-react-app.dev/)

## 초기세팅

### 테스트 문구 확인(설정해놓은 문구) : --verbose

- package 확인!!

### 반복해서 wrapper 될 경우 커스텀 랜더를 만들 수 있다

- [doc](https://testing-library.com/docs/react-native-testing-library/setup/#custom-render)

### coverage

```
npm test -- --coverage

파일이 안나올 경우 --watchAll=false
```

### configuration

- [doc](https://create-react-app.dev/docs/running-tests)
- 테스트 할 파일 범위 지정을 glob pattern 으로 배열로 지정한다.

```
  "jest": {
    "collectCoverageFrom": [
      "**/*.{tsx,ts}",
      "!**/src/index.tsx",
      "!**/src/**/react-app-env.d.ts",
      "!**/src/**/reportWebVitals.ts"
    ]
  }
  

```

### eslint 설정

- 테스트에 도움을 줄 lint 설정 플러그인 2종세트!
- eslint-plugin-testing-library
- eslint-plugin-jest-dom

```
//.eslintrc.json

{
"plugins": ["testing-library", "jest-dom"],
"extends": [
  "react-app",
  "react-app/jest",
  "plugin:testing-library/recommended",
  "plugin:testing-library/react",
  "plugin:jest-dom/recommended"
]
}


//.vscode 폴더 > setting.json.   vscode 단독 옵션 적용

{
  "eslint.options":{
    configFile:".eslintrc.json"
  }
  
}
```

- package eslint config 는 지워줌
- 추가되는 플러그 인은 2개(testing-library,jest-dom)
  - 플러그인 배열에 넣고 extends 에 추가 해주면 끝

## 매쳐를 주로 사용하고 직접 접근하는 보조 메서드는 자제해라?

```
const { container,debug, rerender } = render(<Types orderType='product' />);
//안에 있는 메서드 사용하면 eslint 에서 경고나 에러를 띄운다.
//정해져 있는 매쳐 를 사용하라고 경고 한다(하지만 매쳐가 없는경우 그냥 쓸수 밖에 없다 이런경우)
container.firstChild  <--일일히 접근해서 확인 할 수도 있지만 꼭 이렇게 써야 할 경우는 어쩔수 없을 것 같다.
```

## waitFor

- Warning : An update to UI inside a test was not wrapped in act(...)
- 위 경고는 있지도 않는 테스트가 update 되었다는 뜻이다. 즉 기다리란뜻이다.
- 라이브러리 쓸때 이런 일이 생길수 있다 useform 등등(state 와 연관있는) 기다리면된다...
- 기다려야 하는 것 특히 서버에서 가져와서 넣는 경우 같은 경우는 wait 를 써야 한다
- 아래는 헬멧이 동기로 바로 안바꿔줘서 waitFor 를 쓴 경우다.

```
//helmetasync 쓸때

render(<HelmetProvider><UI/></HelmetProvider>)

await waitFor(()=>{
  expect(document.title).toBe("NotFound");
})
```

## query

[찾는 메서드 우선순위](https://testing-library.com/docs/queries/about/#priority)

- 요소 찾는 기능을 함

## fireEvent, userFire

- fireEvent : 간단하게 클릭등의 이벤트를 가상으로 부여
- userEvent : 실제 유저가 사용하는 것 처럼 타입이나 속성에 따라 포커스 등의 속성이 덧씌워지며 분기도 잘 되어 있음(추천)

## getBy queryBy findBy

- getBy : 해당 요소를 바로 갖고온다, 없으면 에러
- queryBy : 해당 요소를 바로 갖고온다, 없으면 null //null 인지 확인하는 테스트를 할 수 있다.
- findBy : 해당 요소를 기다렸다가 갖고온다(spa) promise 를 반환한다. 없으면 reject

## msw(Mock Service Worker)

- 가짜서버
- 아래처럼 가짜 응답을 하고
- 테스트에 자동 적용 하려면 setupTests에 beforAll afterAll 같은걸 넣어주면 된다.
- 오류 테스트 하려면 .reset(rest.get... ) 이런식으로 셋 한 다음에 작업하면된다.

```
//handler.ts
import { rest } from "msw";

export const handlers = [
  rest.get("http://localhost:4000/products", (_, res, ctx) => {
    return res(
      ctx.json([
        {
          name: "America",
          imagePath: "/images/america.jpeg",
        },
        {
          name: "England",
          imagePath: "/images/england.jpeg",
        },
      ])
    );
  }),
  rest.get("http://localhost:4000/options", (_, res, ctx) => {
    return res(ctx.json([{ name: "Insurance" }, { name: "Dinner" }]));
  }),
];

//server.ts
import { setupServer } from "msw/node";
import { handlers } from "./handler";
export const server = setupServer(...handlers);

//setupServer.ts
import "@testing-library/jest-dom";
import { server } from "./mocks/server";

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

//error test
 server.resetHandlers(
      rest.get("http://localhost:4000/products", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );
```

## react router dom 테스트 할때

- Using MemoryRouter or a custom history is recommended in order to be able to reset the router between tests.

```
test("it expands when the button is clicked", () => {
  render(
    <MemoryRouter>
      <Sidebar />
    </MemoryRouter>
  );
  click(theButton);
  expect(theThingToBeOpen);
});
```

- 이것은 모킹해주는 기능이 없으므로 수동으로 해야 한다 커버리지는 올라가지 않는다.

```
//obj 가 useHistory 의 push 기능을 모킹 하는 예문
jest.mock("react-router-dom,()=>{
  return {
    useHistory:()=>{
      push:jest.fn(),
    }
  }
})
```

- 위 방법은 library 가 다 망가지고 필요한 함수만 모킹하고 나머지는 정상 작동 시키고 싶다면 아래와 같이 할 수도 있다.
- 모킹 한거 밖으로 빼서 사용하려면 접두사로 mock 붙여줘야 한다

```
const mockPush  =jest.fn();

jest.mock("react-router-dom",()=>{
  const realModule = jest.requireActual("react-router-dom");
  return {
    ...realModule,
    {
      useHistory:()=>{
        push:pushImplication
      }
    }
  }
})

expect(mockPush).toBeCalledWith("/")

//원상복구!!!
afterAll(()=>{
  jest.clearAllMocks();
})

```
