import { use } from "react";

interface PostItem {
  id: number;
  title: string;
  body: string;
}

function Posts({
  postsPromise,
}: {
  postsPromise: Promise<PostItem[] | string>;
}) {
  const mockData = use(postsPromise);

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {/* if mockData is Object */}
        {Array.isArray(mockData) &&
          mockData.map((item: PostItem) => (
            <li key={item.id}>
              <p>title: {item.title}</p>
              <p>body: {item.body}</p>
            </li>
          ))}

        {/* if mockData is String */}
        {typeof mockData === "string" && <p>{mockData}</p>}
      </ul>
    </div>
  );
}

export default Posts;
