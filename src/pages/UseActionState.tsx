import { ErrorBoundary } from "react-error-boundary";
import { Main } from "../components/layout";
import LoginForm from "../features/UseActionState/LoginForm";
import PostManager from "../features/UseActionState/PostManager";

const UseActionStatePage = () => {
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

      <ErrorBoundary
        fallback={<div>I caught a error, I am ErrorBoundary</div>}
        onError={(error) => {
          console.log(error);
        }}
      >
        <PostManager />
      </ErrorBoundary>

      <LoginForm />
    </Main>
  );
};

export default UseActionStatePage;
