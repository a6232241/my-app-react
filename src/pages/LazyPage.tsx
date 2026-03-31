import { Main } from "../components/layout";

const LazyPage = () => {
  return (
    <Main>
      <h1>Lazy Loaded Page</h1>
      <p>This page was loaded using React.lazy()</p>
    </Main>
  );
};

export default LazyPage;
