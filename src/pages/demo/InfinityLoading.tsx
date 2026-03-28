import { Main } from "../../components/layout";
import List from "../../features/InfinityLoading/List";

const InfinityLoadingPage = () => {
  return (
    <Main>
      <h1>InfinityLoadingPage</h1>
      <p>向下捲動到最底部以載入資料（200 x 200 區塊）</p>

      <List />
    </Main>
  );
};

export default InfinityLoadingPage;
