import { useDeferredValue, useState } from "react";
import { Main } from "../components/layout";

const UseDeferredValuePage = () => {
  const [text, setText] = useState("");
  const deferredText = useDeferredValue(text);

  return (
    <Main>
      <h1>UseDeferredValuePage</h1>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <p>Text: {text}</p>
      <p>Deferred Text: {deferredText}</p>
    </Main>
  );
};

export default UseDeferredValuePage;
