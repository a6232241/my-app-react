import { TestProvider } from "./contexts/Test";
import { Link } from "react-router-dom";

function App() {
  return (
    <TestProvider foo="bar" bar={42}>
      <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <h1>React</h1>
        <Link to="/use-deferred-value">UseDeferredValue</Link>
        <Link to="/suspense">Suspense</Link>
        <Link to="/suspense-navigation">SuspenseNavigation</Link>
        <Link to="/use-action-state">UseActionState</Link>
        <Link to="/use-effect-event">UseEffectEvent</Link>
        <Link to="/use-id">UseId</Link>
        <Link to="/use-imperative-handle">UseImperativeHandle</Link>

        <h1>Redux & Redux Toolkit</h1>
        <Link to="/redux/use-app-selector">UseAppSelector</Link>
        <Link to="/redux/use-app-dispatch">UseAppDispatch</Link>

        <h1>Resume</h1>
        <Link to="/resume/set-interval-listener">SetIntervalListener</Link>
      </nav>
    </TestProvider>
  );
}

export default App;
