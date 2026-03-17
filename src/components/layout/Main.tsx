import { useNavigate } from "react-router-dom";

const Main = ({ children }: { children: React.ReactNode }) => {
  const navigation = useNavigate();

  return (
    <main style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <button onClick={() => navigation(-1)}>Back</button>
      <section>{children}</section>
    </main>
  );
};

export default Main;
