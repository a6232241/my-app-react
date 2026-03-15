import { useDeferredValue, useState } from "react";

const UseDeferredValuePage = () => {
  const [text, setText] = useState("");
  const deferredText = useDeferredValue(text);

  return (
    <div>
      <h1>UseDeferredValuePage</h1>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <p>Text: {text}</p>
      <p>Deferred Text: {deferredText}</p>
    </div>
  );
};

export default UseDeferredValuePage;
