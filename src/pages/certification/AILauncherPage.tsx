import { Navigate } from "react-router-dom";

// Redirect certification info page to tier landing page to eliminate navigation loops
const AILauncherPage = () => {
  return <Navigate to="/ai-launcher" replace />;
};

export default AILauncherPage;
