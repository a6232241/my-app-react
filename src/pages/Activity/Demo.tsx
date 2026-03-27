import { Activity, useState } from "react";
import { Main } from "../../components/layout";
import { Post } from "../../components/ui";

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
      <p>
        Counter: {count}
      </p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

const DemoPage = () => {
  const [tab, setTab] = useState(1);
  const [show, setShow] = useState(false);

  const onChangeTab = (tab: number) => {
    setTab(tab);
  }

  return (
    <Main>
      <h1>Activity Demo</h1>
      
      <button onClick={() => onChangeTab(1)}>Tab 1</button>
      <button onClick={() => onChangeTab(2)}>Tab 2</button>

      <p>Not Use Activity</p>
      {tab === 1 && <Counter />}
      {tab === 2 && <Counter />}

      <p>Use Activity</p>
      <Activity mode={tab === 1 ? "visible" : "hidden"}>
        <Counter />
      </Activity>
      <Activity mode={tab === 2 ? "visible" : "hidden"}>
        <Counter />
      </Activity>

      <button onClick={() => setShow(!show)}>{show ? "Hide" : "Show"}</button>
      <Activity mode={show ? "visible" : "hidden"}>
        <Post postId={1} />
      </Activity>
    </Main>
  );
};

export default DemoPage;
