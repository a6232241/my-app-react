import { use } from "react";
import { fetchData } from "../utils/data";

interface PostData {
  title?: string;
  body?: string;
}

interface PostProps {
  isStale?: boolean;
  postId?: number;
}

const Post = ({ isStale, postId }: PostProps) => {
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
  const post = use(
    fetchData(`https://jsonplaceholder.typicode.com/posts/${postId}`),
  ) as PostData | string | null;
  // 方法3. 使用 Data Fetch 函數庫

  if (post === null) {
    return <div>Loading...</div>;
  }

  if (post instanceof Error) {
    return <div>Error: {post.message}</div>;
  }

  if (typeof post === "string") {
    return <div>{post}</div>;
  }

  return (
    <div style={{ opacity: isStale ? 0.5 : 1 }}>
      <p>title: {post.title}</p>
      <p>body: {post.body}</p>
    </div>
  );
};

export default Post;
