import React from "react";
import { useAppSelector } from "../../store/hooks";
import type { RootState } from "../../store";

const UseAppSelectorPage: React.FC = () => {
  const count = useAppSelector((state: RootState) => state.counter.value);

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        margin: "10px",
      }}
    >
      <h2>UseAppSelector Page</h2>
      <p>Count from Redux: {count}</p>
    </div>
  );
};

export default UseAppSelectorPage;
