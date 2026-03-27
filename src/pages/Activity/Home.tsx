import { Link } from "react-router-dom";
import { Main } from "../../components/layout";

const HomePage = () => {
  return (
    <Main>
      <h1>Activity Home</h1>
      <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Link to="/activity/demo">Go to Demo</Link>
        <Link to="/activity/input">Go to Input</Link>
      </nav>
    </Main>
  );
}

export default HomePage;
