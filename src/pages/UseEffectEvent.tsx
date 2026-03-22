import { Main } from "../components/layout";
import { useEffect, useEffectEvent, useState } from "react";
import { Counter } from "../components/ui";

const useInterval = (callback: () => void, delay: number) => {
  const watchCallback = useEffectEvent(callback);

  useEffect(() => {
    if (delay === null) return;
    const id = setInterval(() => {
      watchCallback();
    }, delay);
    return () => clearInterval(id);
  }, [delay]);
};

const UseEffectEventPage = () => {
  const [count, setCount] = useState<number>(0);

  useInterval(() => {
    console.log("count", count);
  }, 1000);

  return (
    <Main>
      <h1>UseEffectEventPage</h1>
      <Counter count={count} setCount={setCount} />
    </Main>
  );
};

export default UseEffectEventPage;
