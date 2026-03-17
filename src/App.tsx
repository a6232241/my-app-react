import "./App.css";
import { TestProvider } from "./contexts/Test";
import { Link } from "react-router-dom";

function App() {
  return (
    <TestProvider foo="bar" bar={42}>
      <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Link to="/use-deferred-value">UseDeferredValue</Link>
        <Link to="/suspense">Suspense</Link>
        <Link to="/suspense-navigation">SuspenseNavigation</Link>
        <Link to="/use-action-state">UseActionState</Link>
      </nav>
    </TestProvider>
  );
}

export default App;
