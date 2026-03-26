import { useCallback, useSyncExternalStore } from 'react';
import { Main } from "../components/layout";

let lastWindowSize = {
  width: window.innerWidth,
  height: window.innerHeight,
}

const getServerSnapshot = () => {
  return {
    width: 0,
    height: 0,
  };
}

const useWindowSize = (): {width: number, height: number} => {
  const getSnapshot = useCallback(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    if (width !== lastWindowSize.width || height !== lastWindowSize.height) {
      lastWindowSize = { width, height };
    }
    return lastWindowSize;
  }, []);

  const subscribe = (callback: () => void) => {
    window.addEventListener("resize", callback);
    return () => {
      window.removeEventListener("resize", callback);
    };
  };

  const windowSize = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return windowSize;
}

const useOnline = () => {
  const isOnline = () => navigator.onLine;
  const subscribe = (callback: () => void) => {
    window.addEventListener("online", callback);
    window.addEventListener("offline", callback);
    return () => {
      window.removeEventListener("online", callback);
      window.removeEventListener("offline", callback);
    };
  };

  const online = useSyncExternalStore(subscribe, isOnline);
  return online;
}
  

const UseSyncExternalStorePage = () => {
  const online = useOnline();
  const { width, height } = useWindowSize();

  return (
    <Main>
      <h1>useSyncExternalStore</h1>
      <p>Online: {online ? "Yes" : "No"}</p>
      <p>Window Size: {width} x {height}</p>
    </Main>
  );
};

export default UseSyncExternalStorePage;
