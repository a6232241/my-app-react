import { createPortal } from "react-dom";
import { Main } from "../components/layout";

const CreatePortalPage = () => {
  return (
    <Main>
      <h1>CreatePortal Page</h1>
      <p>I am in this page.</p>
      {createPortal(<p>I am in the portal.</p>, document.body)}
      <p>I am in this page too.</p>
    </Main>
  );
};

export default CreatePortalPage;
