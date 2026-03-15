import { Suspense, useState, useDeferredValue } from "react";
import Post from "../components/Post";
import Counter from "../components/Counter";

const SuspensePage = () => {
  const [isShow, setIsShow] = useState(true);
  const [count, setCount] = useState(0);

  const [postId, setPostId] = useState(1);
  const deferredPostId = useDeferredValue(postId);

  // 當 deferredPostId 改變時，觸發 useMemo，並呼叫 promise
  // 1. 因子組件 use(promise) 尚未 resolve，React 中斷當前渲染。
  // 2. 因為是 Deferred，React 不會顯示 Loading 而是直接丟棄 WIP Fiber。這導致 useMemo 的結果從未被「提交」到正式的 Fiber 樹中。
  // 3. 當 promise resolve 後，React 重試渲染。由於上次渲染未提交，useMemo 在 Fiber 裡找不到對應新 ID 的快取，於是再次執行 promise，因為是新物件，所以會回到 step 1
  // 解決方法：在外部定義快取，透過 promise resolve 的狀態，避免 use(promise) 丟出 pending 的狀態，讓 react 去中斷渲染。
  // 1. 同樣執行上方的流程
  // 2. 但是這次因為 promise 已經 resolve，因此不會中斷渲染
  // const postPromise = useMemo(
  //   () => getPostPromise(deferredPostId),
  //   [deferredPostId],
  // );

  const isStale = deferredPostId !== postId;

  return (
    <div>
      <h1>SuspensePage</h1>
      <Counter count={count} setCount={setCount} />
      <button onClick={() => setIsShow(!isShow)}>Start show mock data</button>

      <input
        type="number"
        value={postId}
        onChange={(e) => setPostId(Number(e.target.value))}
      />
      <Suspense fallback={<div>Loading...</div>}>
        {isShow && <Post isStale={isStale} postId={deferredPostId} />}
        <Suspense fallback={<div>LoadingSlow...</div>}>
          {isShow && <Post postId={2} />}
        </Suspense>
      </Suspense>
    </div>
  );
};

export default SuspensePage;
