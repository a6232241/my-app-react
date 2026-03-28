import { useState, useRef, useCallback, Suspense } from "react";
import { fetchData } from "../../utils/data";
import { Post } from "../../components/ui";

const List = () => {
  const [items, setItems] = useState<
    { id: string; promise: Promise<unknown> }[]
  >([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [postId, setPostId] = useState(1);

  const loadMore = useCallback(() => {
    const data = {
      id: crypto.randomUUID(),
      promise: fetchData(
        { pathname: `/posts/${postId}` },
        1,
        1000,
        false,
        false,
      ),
    };
    setItems((prev) => [...prev, data]);
    setPostId((prev) => prev + 1);
  }, [postId]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 5) {
      loadMore();
    }
  };

  return (
    <>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        style={{
          width: "500px",
          height: "80px",
          overflowY: "scroll",
          border: "1px solid #ccc",
          padding: "10px",
        }}
      >
        {items.map((item) => (
          <Suspense key={item.id} fallback={<div>Loading...</div>}>
            {/* 真實情況 fetch(item.promise) 每次應該會獲取多個資料，所以這裡其實應該叫 PostPage 比較合適 */}
            <Post postPromise={item.promise} />
            <hr />
          </Suspense>
        ))}

        {items.length === 0 && <button onClick={loadMore}>點擊開始載入</button>}
      </div>
    </>
  );
};

export default List;
