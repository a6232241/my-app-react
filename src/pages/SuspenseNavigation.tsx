import { Suspense, useTransition } from "react";
import { Post } from "../components/ui";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Main } from "../components/layout";

// 當使用 useTransition 切換 navigation 時，如何保留當前 UI 直到 promise resolve 或 強制重新渲染
const SuspenseNavigationPage = () => {
  const [searchParams] = useSearchParams();
  const queryPostId = Number(searchParams.get("id") ?? 1);
  const navigate = useNavigate();

  const [isPending, startTransition] = useTransition();

  const handleNavigateTo = (postId: string) => {
    startTransition(() => {
      navigate(`/suspense-navigation?id=${postId}`);
    });
  };

  return (
    <Main>
      <h1 style={{ opacity: isPending ? 0.5 : 1 }}>SuspenseNavigationPage</h1>
      <nav>
        <button onClick={() => handleNavigateTo("1")}>去 ID 1</button>
        <button onClick={() => handleNavigateTo("2")}>去 ID 2</button>
      </nav>

      <Suspense
        // 實驗組 A (不加 key): use 的 promise 會被 useTransition 影響，因此保留 UI 直到 promise resolve
        // 預期情境：切換 navigation 後，UI 保持不變，直到 promise resolve
        // 實驗組 B (加 key): 同樣被 useTransition 影響，但因為 key 改變，且強制重新渲染
        // 預期情境：切換 navigation 後，UI 立刻更新
        key={queryPostId}
        fallback={<div className="loading">⏳ 正在載入新內容...</div>}
      >
        <Post postId={queryPostId} delay={1000} />
      </Suspense>
    </Main>
  );
};

export default SuspenseNavigationPage;
