import { use } from "react";
import { TestContext } from "../../contexts/Test";

function About({ isUseContext }: { isUseContext: boolean }) {
  if (isUseContext) {
    const { foo, bar } = use(TestContext);
    return (
      <div>
        <h1>About</h1>
        <p>{foo}</p>
        <p>{bar}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>About</h1>
    </div>
  );
}

export default About;
