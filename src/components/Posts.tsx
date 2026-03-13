import { use } from "react";

function Posts({ mockDataPromise }: { mockDataPromise: Promise<any> }) {
  const mockData = use(mockDataPromise);

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {/* if mockData is Object */}
        {typeof mockData === "object" &&
          mockData.map((item: any) => (
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
