// src/WTV_market.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { apiService } from "../seller/src/Services/api";

// Seller imports
import Sidebar from "../seller/src/Components/Sidebar.jsx";
import Dashboard from "../seller/src/Pages/Dashboard.jsx";
import AddListing from "../seller/src/Pages/AddListing.jsx";
import Listings from "../seller/src/Pages/Listing.jsx";
import SellerProductDetails from "../seller/src/Pages/ProductDetails.jsx";
import Orders from "../seller/src/Pages/Orders.jsx";
import Messages from "../seller/src/Pages/Messages.jsx";
import Settings from "../seller/src/Pages/Settings.jsx";
import BuyerProductDetails from "../buyer/src/ProductDetails.jsx";

// Buyer imports
import Cart from "../buyer/src/Cart.jsx";
import PurchaseNotifications from "../buyer/src/PurchaseNotifications.jsx";
import SignUpPage from "../buyer/src/SignUp.jsx";
import Login from "../buyer/src/login.jsx";
import BuyerDashboard from "../buyer/src/Buyer_dashboard.jsx";
import BuyerPurchases from "../buyer/src/BuyerPurchases.jsx";

// ⭐ Seller layout — Sidebar always visible
function SellerLayout() {
  return (
    <div className="seller-root" style={{ 
      display: "flex", 
      minHeight: "100vh",
      backgroundColor: "#f8f9faff" // لون خلفية فاتح كما في الصورة
    }}>
      <div style={{ 
        width: "250px", 
        backgroundColor: "#ffffffff",
        boxShadow: "2px 0 10px rgba(0,0,0,0.05)",
        borderRight: "1px solid #eaeaea"
      }}>
        <Sidebar />
      </div>
      
      <div className="seller-content" style={{ 
        flex: 1, 
        padding: "30px 40px",
        overflowY: "auto",
        maxWidth: "calc(100% - 250px)"
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto"
        }}>
          <Outlet /> {/* This makes child routes show inside the layout */}
        </div>
      </div>
    </div>
  );
}

function WTVMarket() {
  const [listings, setListings] = useState([]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiService.getListings();
        setListings(data);

        const activityData = await apiService.getActivities();
        setActivities(activityData);
      } catch (err) {
        console.error("Error loading data:", err);
      }
    };

    fetchData();
  }, []);

  const deleteListing = async (id) => {
    try {
      await apiService.deleteListing(id);
      setListings((prev) => prev.filter((l) => l.id !== id));
    } catch (err) {
      console.error("Error deleting listing:", err);
    }
  };

  const addListing = async () => {
    try {
      const data = await apiService.getListings();
      setListings(data);

      const activityData = await apiService.getActivities();
      setActivities(activityData);
    } catch (err) {
      console.error("Error reloading listings:", err);
    }
  };

  return (
    <Router>
      <Routes>
        {/* Default route → Signup */}
        <Route path="/" element={<SignUpPage />} />

        {/* Authentication */}
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<Login />} />

        {/* Buyer */}
        <Route path="/buyer" element={<BuyerDashboard />} />
        <Route path="/buyer/purchases" element={<BuyerPurchases />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/notifications" element={<PurchaseNotifications />} />

        {/* ⭐ Seller Routes WITH Sidebar Using Nested Routes */}
        <Route path="/seller" element={<SellerLayout />}>
          <Route
            index
            element={
              <Dashboard
                listings={listings}
                activities={activities}
                onDeleteListing={deleteListing}
              />
            }
          />

          <Route
            path="create-listing"
            element={<AddListing onListingAdded={addListing} />}
          />

          <Route
            path="listings"
            element={
              <Listings listings={listings} onDeleteListing={deleteListing} />
            }
          />

          <Route path="orders" element={<Orders />} />
          <Route path="messages" element={<Messages />} />
          <Route path="settings" element={<Settings />} />

          <Route path="product/:id" element={<SellerProductDetails />} />
        </Route>

        {/* Shared Product Route */}
        <Route path="/product/:id" element={<BuyerProductDetails />} />
      </Routes>
    </Router>
  );
}

export default WTVMarket;