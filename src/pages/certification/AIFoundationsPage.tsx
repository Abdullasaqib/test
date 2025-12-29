import { Navigate } from "react-router-dom";

// Redirect certification info page to tier landing page to eliminate navigation loops
const AIFoundationsPage = () => {
  return <Navigate to="/ai-foundations" replace />;
};

export default AIFoundationsPage;
