
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpPage from "./SignUp";
import Login from "./login";
import BuyerDashboard from "./Buyer_dashboard";
import ProductDetails from "./ProductDetails";
import BuyerPurchases from "./BuyerPurchases";

function App() {
  return (
    <Router>
      <Routes>
        {/* Authentication Routes */}
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<Login />} />
        
        {/* Buyer Routes */}
        <Route path="/" element={<BuyerDashboard />} />
        <Route path="/buyer" element={<BuyerDashboard />} />
        <Route path="/buyer/purchases" element={<BuyerPurchases />} />
        
        {/* Product Routes */}
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
      </Routes>
    </Router>
  );
}

export default App;