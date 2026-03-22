import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

const useInterval = (callback: () => void, delay: number) => {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay !== null) {
      const id = setInterval(() => savedCallback.current(), delay);

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

      <Link to="/use-effect-event">
        2026/03/22 React 19 官方解法 useEffectEvent
      </Link>
    </div>
  );
}
