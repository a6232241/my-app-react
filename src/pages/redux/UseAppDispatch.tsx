import React from "react";
import { useAppDispatch } from "../../store/hooks";
import {
  increment,
  decrement,
  incrementByAmount,
} from "../../store/slices/counterSlice";

const UseAppDispatchPage: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        margin: "10px",
      }}
    >
      <h2>UseAppDispatch Page</h2>
      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={() => dispatch(increment())}>Increment</button>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
        <button onClick={() => dispatch(incrementByAmount(5))}>
          Increment by 5
        </button>
      </div>
    </div>
  );
};

export default UseAppDispatchPage;
