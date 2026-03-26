interface CounterProps {
  count: number;
  setCount: (count: number) => void;
  title?: string;
  isPending?: boolean;
}

const Counter = ({ count, setCount, title = "Count", isPending = false }: CounterProps) => {
  return (
    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
      <p style={{ opacity: isPending ? 0.5 : 1 }}>
        {title}: {count}
      </p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export default Counter;
