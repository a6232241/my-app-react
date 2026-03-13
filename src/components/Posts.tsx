import { use, useEffect, useState } from "react";

function Posts({ mockDataPromise }: { mockDataPromise: Promise<any> }) {
  // const [mockData, setMockData] = useState([]);

  // const getMockData = () => {
  //   return fetch("https://jsonplaceholder.typicode.com/posts").then((res) => {
  //     console.log(res);
  //     return res.json();
  //   });
  // };

  const messagePromise = new Promise((resolve, reject) => {
    reject();
  }).catch(() => {
    return "no new message found.";
  });

  const mockData = use(mockDataPromise);

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {mockData.map((item: any) => (
          <li key={item.id}>
            <p>title: {item.title}</p>
            <p>body: {item.body}</p>
          </li>
        ))}

        {/* <p>{mockData}</p> */}
      </ul>
    </div>
  );
}

export default Posts;
