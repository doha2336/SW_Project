// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import WTVMarket from "./WTV_market.jsx"; // unified app entry
import { AuthProvider } from './AuthProvider';

// Global and subsystem styles
import "./index.css"; // unified global styles

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <WTVMarket />
    </AuthProvider>
  </React.StrictMode>
);
