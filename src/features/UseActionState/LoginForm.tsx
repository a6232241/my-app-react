import { useActionState, useState } from "react";
import type { LoginState } from "../../types/models";

const login = async (
  _previousState: LoginState,
  formData: FormData,
): Promise<LoginState> => {
  const username = formData.get("username");
  const password = formData.get("password");

  await new Promise((resolve) => setTimeout(resolve, 3000));

  if (username === "admin" && password === "password") {
    return { success: true, message: "Login success" };
  }

  return { success: false, message: "Login failed" };
};

const initialLoginState: LoginState = {
  success: false,
  message: "",
};

const LoginForm = () => {
  // useActionState 用於觀察 transition 狀態，所以除非在 form action 使用，否則都需要手動開啟 transition
  const [responseData, formAction, isPending] = useActionState(
    login,
    initialLoginState,
  );

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // useActionState 在 form action 使用時，會自動開啟 transition
  return (
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
  );
};

export default LoginForm;
