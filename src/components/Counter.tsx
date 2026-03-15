interface CounterProps {
  count: number;
  setCount: (count: number) => void;
  title?: string;
}

const Counter = ({ count, setCount, title = "Count" }: CounterProps) => {
  return (
    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
      <p>
        {title}: {count}
      </p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export default Counter;
