import { useRef, useState } from "react";
import { Main } from "../components/layout";
import { flushSync } from "react-dom";

const Item = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{ height: 100, background: "green", flexShrink: 0 }}>
      {children}
    </div>
  );
};

const FlushSyncPage = () => {
  const [list, setList] = useState<string[]>([]);
  const listRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    // Previously, we need useEffect to scroll to the bottom after calling setList
    // setList((prev) => [...prev, `new item ${prev.length + 1}`]);

    // Now, we can use flushSync to make sure the DOM is updated before scrolling
    flushSync(() => {
      setList((prev) => [...prev, `new item ${prev.length + 1}`]);
    });

    listRef.current?.scrollTo(0, listRef.current.scrollHeight);
  };

  return (
    <Main>
      <h1>FlushSync Page</h1>
      <button onClick={handleClick}>Add Item</button>
      <div
        ref={listRef}
        style={{
          width: 200,
          height: 300,
          border: "1px solid #000",
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {list.map((item) => (
          <Item key={item}>{item}</Item>
        ))}

        <p>end</p>
      </div>
    </Main>
  );
};

export default FlushSyncPage;
