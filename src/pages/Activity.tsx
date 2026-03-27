import { Route } from "react-router-dom";
import ActivityRoutes from "../features/Router/ActivityRoutes";
import DemoPage from "./Activity/Demo";
import InputPage from "./Activity/Input";
import HomePage from "./Activity/Home";

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
