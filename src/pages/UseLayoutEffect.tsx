import { useLayoutEffect, useState, useRef } from "react";
import { Main } from "../components/layout";

const Popup = () => {
  const popupRef = useRef<HTMLDivElement>(null);

  const [popupHeight, setPopupHeight] = useState(0);

  useLayoutEffect(() => {
    const { height } = popupRef.current?.getBoundingClientRect() || {
      height: 0,
    };
    setPopupHeight(height);
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        top: `${popupHeight}px`,
        background: "lightyellow",
        border: "1px solid orange",
        padding: "10px",
        marginTop: "5px",
      }}
      ref={popupRef}
    >
      <p>I am a popup positioned correctly before painting!</p>
    </div>
  );
};

const UseLayoutEffectPage = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
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
        ref={buttonRef}
        onPointerEnter={() => {
          const { left, top, right, bottom } =
            buttonRef.current?.getBoundingClientRect() || {
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
            };
          setTargetRect({ left, top, right, bottom });
        }}
        onPointerLeave={() => {
          setTargetRect(null);
        }}
      >
        Toggle Popup
      </button>

      {targetRect && <Popup />}
    </Main>
  );
};

export default UseLayoutEffectPage;
