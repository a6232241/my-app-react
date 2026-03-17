import {
  startTransition,
  useActionState,
  useOptimistic,
  useState,
} from "react";
import { Main } from "../components/layout";

const login = async (previousState: any, formData: FormData) => {
  const username = formData.get("username");
  const password = formData.get("password");

  await new Promise((resolve) => setTimeout(resolve, 3000));

  if (username === "admin" && password === "password") {
    return { success: true, message: "Login success" };
  }

  return { success: false, message: "Login failed" };
};

const updateCount = async (previousState: any, data: number) => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return data;
};

const responseDataInitial = {
  success: false,
  message: "",
};

const UseActionStatePage = () => {
  // useActionState 用於觀察 transition 狀態，所以除非在 form action 使用，否則都需要手動開啟 transition
  const [responseData, formAction, isPending] = useActionState(
    login,
    responseDataInitial,
  );

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [count, updateCountAction, isPendingCount] = useActionState(
    updateCount,
    0,
  );
  // useOptimistic 用於在 transition / action 期間更新 UI，用做樂觀更新，最後一個 action 完成時，自動退回並以他作為最終值
  const [optimisticCount, setOptimisticCount] = useOptimistic(count);

  // useActionState 沒有在 form action 使用，需要手動開啟 transition
  const handleUpdateCount = () => {
    startTransition(() => {
      setOptimisticCount((prev) => prev + 1);
      updateCountAction(count + 1);
    });
  };

  return (
    <Main
      contentStyle={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        alignItems: "flex-start",
      }}
    >
      <h1>useActionState</h1>

      <div>
        <p style={{ opacity: isPendingCount ? 0.5 : 1 }}>
          Count: {optimisticCount}
        </p>
        <button onClick={handleUpdateCount}>Update</button>
      </div>

      {/* useActionState 在 form action 使用時，會自動開啟 transition */}
      <form
        action={formAction}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          alignItems: "flex-start",
        }}
      >
        <label htmlFor="username">Username</label>
        <input
          id="username"
          placeholder="username"
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          placeholder="password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={isPending}>
          {isPending ? "Logging in..." : "Login"}
        </button>
        {responseData.success && <p>{responseData.message}</p>}
        {!responseData.success && <p>{responseData.message}</p>}
      </form>
    </Main>
  );
};

export default UseActionStatePage;
