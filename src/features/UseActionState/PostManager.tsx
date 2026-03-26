import { startTransition, useActionState, useOptimistic, useRef } from "react";
import { fetchData } from "../../utils/data";
import type { PostData } from "../../types/models";

const updatePost = async (
  prev: PostData,
  payload: {
    type: "ADD" | "SUB" | "RETURN_ERROR" | "THROW_ERROR";
    signal?: AbortSignal;
  },
): Promise<PostData> => {
  switch (payload.type) {
    case "ADD": {
      const result = await fetchData({
        pathname: `/posts/${prev.id + 1}`,
        signal: payload?.signal,
      }, 1, 1000);
      if (result instanceof Error)
        return {
          ...prev,
          id: prev.id + 1,
          error: result?.message ?? "Something went wrong",
        };
      return { ...(result as PostData), error: null };
    }
    case "SUB": {
      const result = await fetchData({
        pathname: `/posts/${prev.id - 1}`,
        signal: payload?.signal,
      });
      if (result instanceof Error)
        return {
          ...prev,
          id: prev.id - 1,
          error: result?.message ?? "Something went wrong",
        };
      return { ...(result as PostData), error: null };
    }
    case "THROW_ERROR": {
      throw new Error("Something went wrong");
    }
    default:
      return {
        ...prev,
        error: "Invalid action type",
      };
  }
};

const initialPostData: PostData = {
  id: 1,
  title: "",
  body: "",
  userId: 1,
  error: null,
};

const PostManager = () => {
  const [postData, updatePostAction, isPendingPost] = useActionState(
    updatePost,
    initialPostData,
  );

  // useOptimistic 用於在 transition / action 期間更新 UI，用做樂觀更新，最後一個 action 完成時，自動退回並以他作為最終值
  const [optimisticPostId, setOptimisticPostId] = useOptimistic(postData.id);

  const abortRef = useRef<AbortController | null>(new AbortController());

  const handleUpdateCount = (
    type: "ADD" | "SUB" | "RETURN_ERROR" | "THROW_ERROR",
  ) => {
    if (abortRef.current) {
      abortRef.current.abort();
    }

    abortRef.current = new AbortController();

    // useActionState 回傳的 action 若非在 form action 使用，則需要手動開啟 transition
    startTransition(() => {
      switch (type) {
        case "ADD": {
          setOptimisticPostId((prev) => prev + 1);
          updatePostAction({
            type: "ADD",
            signal: abortRef.current?.signal,
          });
          break;
        }
        case "SUB": {
          setOptimisticPostId((prev) => prev - 1);
          updatePostAction({
            type: "SUB",
            signal: abortRef.current?.signal,
          });
          break;
        }
        case "THROW_ERROR": {
          updatePostAction({
            type: "THROW_ERROR",
          });
          break;
        }
        default:
          updatePostAction({
            type: "RETURN_ERROR",
          });
      }
    });
  };

  return (
    <div>
      <p style={{ opacity: isPendingPost ? 0.5 : 1 }}>
        Post: {optimisticPostId}
      </p>
      {postData.error && <p style={{ color: "red" }}>{postData.error}</p>}
      <button onClick={() => handleUpdateCount("ADD")}>+1</button>
      <button onClick={() => handleUpdateCount("SUB")}>-1</button>
      <button onClick={() => handleUpdateCount("RETURN_ERROR")}>
        Return Error
      </button>
      <button onClick={() => handleUpdateCount("THROW_ERROR")}>
        Throw Error
      </button>
    </div>
  );
};

export default PostManager;
