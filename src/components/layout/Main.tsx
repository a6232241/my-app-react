import { useNavigate } from "react-router-dom";

const Main = ({
  children,
  contentStyle,
}: {
  children: React.ReactNode;
  contentStyle?: React.CSSProperties;
}) => {
  const navigation = useNavigate();

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <button onClick={() => navigation("/")}>Back Home</button>
      <section style={contentStyle}>{children}</section>
    </main>
  );
};

export default Main;
