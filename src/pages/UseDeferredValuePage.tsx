import { Suspense, useDeferredValue, useState } from "react";
import { Main } from "../components/layout";
import { Counter, Post } from "../components/ui";

const UseDeferredValuePage = () => {
  const [text, setText] = useState<number>(0);
  const deferredText = useDeferredValue(text);
  const isStale = text !== deferredText;

  return (
    <Main>
      <h1>UseDeferredValuePage</h1>
      <Counter count={text} setCount={setText} />
      <p>text: {text}</p>
      <p>deferredText: {deferredText}</p>
      <Suspense fallback={<div>Loading...</div>}>
        <Post postId={text} isStale={isStale} delay={1000} />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <Post postId={deferredText} isStale={isStale} />
      </Suspense>
    </Main>
  );
};

export default UseDeferredValuePage;
