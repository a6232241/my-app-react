import { Suspense, useEffect, useState } from "react";
import "./App.css";
import Posts from "./components/Posts";

function App() {
  const [tab, setTab] = useState("about");

  const mockDataPromise = fetch(
    "https://jsonplaceholder.typicode.com/posts",
  ).then((res) => {
    console.log(res);
    return res.json();
  });

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <button onClick={() => setTab("about")}>About</button>
        <button onClick={() => setTab("posts")}>Posts</button>
        {tab === "about" && <h1>About</h1>}
        {tab === "posts" && <Posts mockDataPromise={mockDataPromise} />}
      </Suspense>
    </>
  );
}

export default App;
