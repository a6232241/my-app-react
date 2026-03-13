import { Suspense, useState, type ErrorInfo } from "react";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";
import "./App.css";
import { TestProvider } from './contexts/Test';
import { Posts, About } from './components';


const FallbackComponent = ({error, resetErrorBoundary, onReset}: FallbackProps & { onReset: () => void }) => {

  const handleReset = () => {
    onReset();
    resetErrorBoundary();
  }

  return (
    <div>
      <h1>Something went wrong</h1>
      <p>{error.message}</p>
      <button onClick={handleReset}>Try again</button>
    </div>
  );
}

function App() {
  const [tab, setTab] = useState("about");
  const [isTestError, setIsTestError] = useState(true);

  const mockDataPromise = fetch(
    "https://jsonplaceholder.typicode.com/posts",
  ).then((res) => {
    if (!res.ok || isTestError) {
      throw new Error("Failed to fetch mock data");
    }
    return res.json();
  })
  // .catch((error) => {
  //   if (error instanceof Error) {
  //     return error.message;
  //   }
  //   return "Failed to fetch mock data";
  // })

  const handleError = (error: unknown, info: ErrorInfo) => {
    console.log(error);
    console.log(info);
  }

  return (
    <TestProvider foo="bar" bar={42}>
      <button onClick={() => setTab("about")}>About</button>
      <button onClick={() => setTab("posts")}>Posts</button>
      <ErrorBoundary onError={handleError} fallbackRender={(props) => <FallbackComponent {...props} onReset={() => setIsTestError(false)} />}>
        <Suspense fallback={<div>Loading...</div>}>
          {tab === "about" && <About isUseContext={false} />}
          {tab === "posts" && <Posts mockDataPromise={mockDataPromise} />}
        </Suspense>
      </ErrorBoundary>
    </TestProvider>
  );
}

export default App;
