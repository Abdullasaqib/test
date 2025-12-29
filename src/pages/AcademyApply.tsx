import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// This page now redirects to /pricing
// Kept for backwards compatibility with bookmarks/links
const AcademyApply = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/pricing", { replace: true });
  }, [navigate]);

  return null;
};

export default AcademyApply;