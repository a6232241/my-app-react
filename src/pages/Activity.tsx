import { Route } from "react-router-dom";
import ActivityRoutes from "../features/Router/ActivityRoutes";
import DemoPage from "./activity/Demo";
import InputPage from "./activity/Input";
import HomePage from "./activity/Home";

const ActivityPage = () => {
  return (
    <ActivityRoutes>
      <Route path="" element={<HomePage />} />
      <Route path="demo" element={<DemoPage />} />
      <Route path="input" element={<InputPage />} />
    </ActivityRoutes>
  );
};

export default ActivityPage;
