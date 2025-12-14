// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import WTVMarket from "./WTV_market.jsx"; // unified app entry

// ✅ Corrected paths (تأكدي إن الملفات موجودة فعلاً في المسارات دي)
import "./index.css"; // unified global styles
import "../seller/src/index.css";   // seller global styles (correct case)
import "../buyer/src/index.css";      // buyer global styles

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WTVMarket />
    
  </React.StrictMode>
);
