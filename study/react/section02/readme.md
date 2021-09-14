Section02
==

### 참조

[ko.reactjs.org](https://ko.reactjs.org/docs/hooks-intro.html)

Hook
==

Hook 을 이용하여 기존 Class 바탕의 코드를 작성할 필요 없이 상태 값과 여러 React 의 기능을 사용할 수 있습니다.

```javascript
import React, {useState} from 'react';

function Example() {
    // "count"라는 새로운 상태 값을 정의합니다.
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div>
    );
}
```

특징
--

- **선택적 사용** 기존의 코드를 다시 작성할 필요 없이 일부의 컴포넌트들 안에서 Hook을 사용할 수 있습니다.
- **100% 이전 버전과의 호환성** Hook은 호환성을 깨뜨리는 변화가 없습니다.

Custom
--

