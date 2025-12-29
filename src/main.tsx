// Build v27 - Force clean rebuild 2025-12-07
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./styles/print.css";

console.log('NEXT_ Platform v26 booting...');

const rootElement = document.getElementById("root");
if (rootElement) {
  console.log('Root element found, mounting React...');
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
  console.log('React mounted successfully');
} else {
  console.error('Root element not found!');
}
