import { useLayoutEffect, useState, useRef } from "react";
import { Main } from "../components/layout";

interface PopupProps {
  y: number;
}

const Popup = ({ y }: PopupProps) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const [showBelow, setShowBelow] = useState(false);

  useLayoutEffect(() => {
    if (popupRef.current) {
      const { height } = popupRef.current.getBoundingClientRect();

      setShowBelow(y - height < 0);
    }
  }, [y]);

  return (
    <div
      ref={popupRef}
      style={{
        position: "absolute",
        left: "0px",
        top: "0px",
        transform: showBelow ? "translateY(100%)" : "translateY(-100%)",
        background: "lightyellow",
        border: "1px solid orange",
        padding: "10px",
        marginTop: showBelow ? "5px" : "-5px",
        pointerEvents: "none",
        zIndex: 1000,
        width: "max-content",
        color: "black",
      }}
    >
      <p>I am a popup positioned correctly before painting!</p>
    </div>
  );
};

const UseLayoutEffectPage = () => {
  const [targetRect, setTargetRect] = useState<{
    left: number;
    top: number;
    right: number;
    bottom: number;
  } | null>(null);

  return (
    <Main contentStyle={{ height: "200vh" }}>
      <h1>useLayoutEffect</h1>

      <button
        style={{ position: "relative" }}
        onPointerEnter={(e) => {
          const { left, top, right, bottom } =
            e.currentTarget.getBoundingClientRect();
          setTargetRect({ left, top, right, bottom });
        }}
        onPointerLeave={() => {
          setTargetRect(null);
        }}
      >
        Toggle Popup
        {targetRect && <Popup y={targetRect.top} />}
      </button>
    </Main>
  );
};

export default UseLayoutEffectPage;
