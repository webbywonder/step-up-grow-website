import * as React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

import "./styles.css";

const rootElement = document.getElementById("root");

// Ensure the rootElement exists in your HTML file
if (rootElement) {
  const root = createRoot(rootElement); // Use createRoot
  root.render(<App />);
}
