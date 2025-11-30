import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BuyerDashboard from "./Buyer_dashboard";
import ProductDetails from "./ProductDetails";
import BuyerPurchases from "./BuyerPurchases";

function App() {
  return (
    <Router>
      <Routes>
        {/* Buyer Routes Only */}
        <Route path="/" element={<BuyerDashboard />} />
        <Route path="/buyer" element={<BuyerDashboard />} />
        <Route path="/buyer/purchases" element={<BuyerPurchases />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
}

export default App;