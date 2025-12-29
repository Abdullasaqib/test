import { Navigate } from "react-router-dom";

// Redirect certification info page to tier landing page to eliminate navigation loops
const AIBuilderPage = () => {
  return <Navigate to="/ai-builder" replace />;
};

export default AIBuilderPage;
