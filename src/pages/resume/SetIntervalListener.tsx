import { useEffect, useState, useRef } from "react";

const useInterval = (callback: () => void, delay: number) => {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

export default function SetIntervalListenerPage() {
  const [count, setCount] = useState(0);

  useInterval(() => {
    console.log("count", count);
  }, 1000);

  return (
    <div className="App">
      <span>{count}</span>
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </div>
  );
}
