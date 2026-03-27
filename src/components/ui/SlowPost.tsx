import { memo, type ComponentProps } from "react";
import Post from "./Post";

const SlowPost = (props: ComponentProps<typeof Post>) => {
  console.log("Rendering SlowPost");
  // 模擬渲染延遲
  const startTime = performance.now();
  while (performance.now() - startTime < 1000) {
    // 什麼都不做
  }

  return (
    <Post {...props} />
  )
}

export default memo(SlowPost);
  