import { Navigate } from "react-router-dom";

// Redirect to Coming Soon waitlist page
const ProfessionalBuilder = () => {
  return <Navigate to="/professionals" replace />;
};

export default ProfessionalBuilder;
