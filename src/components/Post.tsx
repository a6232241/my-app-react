import { use } from "react";
import { fetchData } from "../utils/data";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface PostData {
  title?: string;
  body?: string;
}

interface PostProps {
  isStale?: boolean;
  postId?: number;
  version?: number;
  delay?: number;
}

const Post = ({ isStale, postId, version, delay = 0 }: PostProps) => {
  // 無限渲染
  // 1. 當呼叫 use 時，如果 promise 處於 pending，React 會中斷渲染
  // 2. promise resolve 後，React 會重新渲染
  // 3. 重新渲染後，use 再次被呼叫，回到 step 1
  // const post = use(
  //   fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`).then(
  //     (res) => res.json(),
  //   ),
  // ) as PostData | string | null;

  // 解決方法：
  // 方法1. 透過父層傳遞 promise，由父層快取著 promise 的結果
  // const post = use(postPromise) as PostData | string | null;
  // 方法2. 使用外部快取，由外部快取著 promise 的結果
  const data = use(
    fetchData(
      `https://jsonplaceholder.typicode.com/posts/${postId}`,
      version,
      delay,
    ),
  ) as PostData | string | null;
  // 方法3. 使用 Data Fetch 函數庫，例如：TanStack Query、SWR
  // const { data, isLoading, error } = useQuery({
  //   queryKey: ["post", postId],
  //   queryFn: () =>
  //     fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`).then(
  //       (res) => res.json(),
  //     ),
  // });

  if (data === null) {
    return <div>Loading...</div>;
  }

  if (data instanceof Error) {
    return <div>Error: {data.message}</div>;
  }

  if (typeof data === "string") {
    return <div>{data}</div>;
  }

  return (
    <div style={{ opacity: isStale ? 0.5 : 1 }}>
      <p>title: {data.title}</p>
      <p>body: {data.body}</p>
    </div>
  );
};

export default Post;
