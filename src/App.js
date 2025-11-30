
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpPage from "./SignUp";
import Login from "./login";
import BuyerDashboard from "./Buyer_dashboard";
import ProductDetails from "./ProductDetails";

function App() {
  return (
    <Router>
      <Routes>
        {/* Authentication Routes */}
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<Login />} />
        
        {/* Dashboard Routes */}
        <Route path="/buyer" element={<BuyerDashboard />} />
        
        {/* Product Routes */}
        <Route path="/product/:id" element={<ProductDetails />} />
        
        {/* Default Route - Redirect to login */}
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;