import { useId } from "react";
import { Main } from "../components/layout";

const UseIdPage = () => {
  const passwordHintId = useId();

  return (
    <Main>
      <h1>UseIdPage</h1>
      <label>
        Password: <input type="password" aria-describedby={passwordHintId} />
      </label>
      <p id={passwordHintId}>至少 8 個字元</p>
    </Main>
  );
};

export default UseIdPage;
