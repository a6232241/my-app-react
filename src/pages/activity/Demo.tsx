import {
  Activity,
  startTransition,
  Suspense,
  useMemo,
  useState,
  useTransition,
} from "react";
import { Main } from "../../components/layout";
import { Post } from "../../components/ui";
import { fetchData } from "../../utils/data";

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
      <p>Counter: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

const DemoPage = () => {
  const [tab, setTab] = useState(1);
  const [show, setShow] = useState(false);

  const [isPending, startTransition] = useTransition();

  const onChangeTab = (tab: number) => {
    // startTransition(() => {
    setTab(tab);
    // });
  };

  const post1Promise = useMemo(
    () => fetchData({ pathname: `/posts/${1}` }, 1, 0, false, false),
    [],
  );

  const post2Promise = useMemo(
    () => fetchData({ pathname: `/posts/${2}` }, 1, 0, false, false),
    [],
  );

  const post3Promise = useMemo(
    () => fetchData({ pathname: `/posts/${3}` }, 1, 0, false, false),
    [],
  );

  const post4Promise = useMemo(
    () => fetchData({ pathname: `/posts/${4}` }, 1, 0, false, false),
    [],
  );

  return (
    <Main>
      <h1>Activity Demo</h1>
      {/* {isPending && <div>onChangeTab Loading...</div>} */}

      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={() => onChangeTab(1)}
          style={{ opacity: tab === 1 ? 1 : 0.5 }}
        >
          Tab 1
        </button>
        <button
          onClick={() => onChangeTab(2)}
          style={{ opacity: tab === 2 ? 1 : 0.5 }}
        >
          Tab 2
        </button>
      </div>

      <h2>Not Use Activity</h2>
      {tab === 1 && (
        <>
          <Counter />
          <Suspense fallback={<div>Loading...</div>}>
            <Post postPromise={post1Promise} />
          </Suspense>
        </>
      )}
      {tab === 2 && (
        <>
          <Counter />
          <Suspense fallback={<div>Loading...</div>}>
            <Post postPromise={post2Promise} />
          </Suspense>
        </>
      )}

      <h2>Use Activity</h2>
      <Activity mode={tab === 1 ? "visible" : "hidden"}>
        <Counter />
        <Suspense fallback={<div>Loading...</div>}>
          <Post postPromise={post3Promise} />
        </Suspense>
      </Activity>
      <Activity mode={tab === 2 ? "visible" : "hidden"}>
        <Counter />
        <Suspense fallback={<div>Loading...</div>}>
          <Post postPromise={post4Promise} />
        </Suspense>
      </Activity>

      {/* <button onClick={() => setShow(!show)}>{show ? "Hide" : "Show"}</button>
      <Activity mode={show ? "visible" : "hidden"}>
        <Post postId={1} />
      </Activity> */}
    </Main>
  );
};

export default DemoPage;
