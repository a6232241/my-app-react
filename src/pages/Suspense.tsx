import { Suspense, useState, useDeferredValue, useTransition } from "react";
import { Post, Counter } from "../components/ui";
import { Main } from "../components/layout";

const SuspensePage = () => {
  const [isShow, setIsShow] = useState(false);
  const [version, setVersion] = useState(0);
  const deferredVersion = useDeferredValue(version);

  const [postId, setPostId] = useState(1);
  const deferredPostId = useDeferredValue(postId);
  const isStale = deferredPostId !== postId || deferredVersion !== version;

  const [isPending, startTransition] = useTransition();

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

  const handleShowSlowData = () => {
    startTransition(() => {
      setIsShow(!isShow);
    });
  };

  return (
    <Main>
      <h1>SuspensePage</h1>
      <Counter count={version} setCount={setVersion} title="Version" />

      <input
        type="number"
        value={postId}
        onChange={(e) => setPostId(Number(e.target.value))}
      />

      {/* 實驗組: useDeferredValue + use(promise) */}
      {/* 行為 1：透過 deferredVersion 去觸發 use(promise) */}
      {/* 行為 2：透過 postId 去觸發 use(promise) */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {/* 行為 2 結果: 觸發 Suspense 的 fallback */}
        <Suspense fallback={<div>Suspense Loading...</div>}>
          {/* 行為 1 結果: 觸發 isStale 改變 Post 的內部 UI */}
          <Post isStale={isStale} postId={postId} version={deferredVersion} />
        </Suspense>

        {/* 實驗組: useTransition + use(promise) */}
        {/* 行為：透過 startTransition 去切換 isShow */}
        <div>
          <button style={{ display: "block" }} onClick={handleShowSlowData}>
            {isShow ? "Hide slow data" : "Show slow data"}
          </button>
          <Suspense fallback={<div>Suspense LoadingSlow...</div>}>
            {/* 結果：isPending... 會被顯示 */}
            {isPending && <div>Transition Loading...</div>}
            {isShow && <Post postId={10} />}
          </Suspense>
        </div>

        <Suspense fallback={<div>Suspense Loading...</div>}>
          <div>
            <p style={{ color: "red" }}>Check content has been rendered</p>
            <Post postId={100} delay={3000} />
          </div>
        </Suspense>
      </div>
    </Main>
  );
};

export default SuspensePage;
