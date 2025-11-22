import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpPage from "./SignUp";
import BuyerDashboard from "./Buyer_dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/buyer" element={<BuyerDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
