interface CounterProps {
  count: number;
  setCount: (count: number) => void;
}

const Counter = ({ count, setCount }: CounterProps) => {
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export default Counter;
