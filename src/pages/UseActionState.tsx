import {
  startTransition,
  useActionState,
  useOptimistic,
  useRef,
  useState,
} from "react";
import { Main } from "../components/layout";
import { fetchData } from "../utils/data";

interface LoginState {
  success: boolean;
  message: string;
}

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

const updatePost = async (
  _previousState: number,
  payload: { postId: number; signal?: AbortSignal },
): Promise<number> => {
  await fetchData(
    { pathname: `/posts/${payload.postId}`, signal: payload?.signal },
    1,
    1000,
  );
  return payload.postId;
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

  const [postId, updatePostAction, isPendingPost] = useActionState(
    updatePost,
    1,
  );
  // useOptimistic 用於在 transition / action 期間更新 UI，用做樂觀更新，最後一個 action 完成時，自動退回並以他作為最終值
  const [optimisticPostId, setOptimisticPostId] = useOptimistic(postId);

  const abortRef = useRef<AbortController | null>(null);

  // useActionState 沒有在 form action 使用，需要手動開啟 transition
  // const handleUpdateCount = (type: 'ADD' | 'SUB') => {
  //   startTransition(() => {
  //     if (type === "ADD") {
  //       setOptimisticPostId((prev) => prev + 1);
  //       updatePostAction(postId + 1);
  //     } else {
  //       setOptimisticPostId((prev) => prev - 1);
  //       updatePostAction(postId - 1);
  //     }
  //   });
  // };

  const handleUpdateCount = (type: "ADD" | "SUB") => {
    if (abortRef.current) {
      abortRef.current.abort();
    }

    abortRef.current = new AbortController();

    startTransition(() => {
      if (type === "ADD") {
        setOptimisticPostId((prev) => prev + 1);
        updatePostAction({
          postId: postId + 1,
          signal: abortRef.current?.signal,
        });
      } else {
        setOptimisticPostId((prev) => prev - 1);
        updatePostAction({
          postId: postId - 1,
          signal: abortRef.current?.signal,
        });
      }
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
        <p style={{ opacity: isPendingPost ? 0.5 : 1 }}>
          Post: {optimisticPostId}
        </p>
        <button onClick={() => handleUpdateCount("ADD")}>+1</button>
        <button onClick={() => handleUpdateCount("SUB")}>-1</button>
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
