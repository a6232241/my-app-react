import { useState } from "react";
import { Main } from "../../components/layout";

const InputPage = () => {
  const [text, setText] = useState('');

  return (
    <Main>
      <h1>Activity Input</h1>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      <p>{text}</p>
    </Main>
  );
}

export default InputPage;
