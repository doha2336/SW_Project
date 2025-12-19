// src/WTV_market.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { apiService } from "@seller/Services/api";
import ProtectedRoute from './ProtectedRoute';

// Seller imports
import Sidebar from "@seller/Components/Sidebar.jsx";
import Dashboard from "@seller/Pages/Dashboard.jsx";
import AddListing from "@seller/Pages/AddListing.jsx";
import Listings from "@seller/Pages/Listing.jsx";
import SellerProductDetails from "@seller/Pages/ProductDetails.jsx";
import Orders from "@seller/Pages/Orders.jsx";
import SellerOrderDetails from "@seller/Pages/SellerOrderDetails.jsx";
import EditListing from "@seller/Pages/EditListing.jsx";
import Messages from "@seller/Pages/Messages.jsx";
import Settings from "@seller/Pages/Settings.jsx";
import BuyerProductDetails from "@buyer/ProductDetails.jsx";

// Buyer imports
import Cart from "@buyer/Cart.jsx";
import PurchaseNotifications from "@buyer/PurchaseNotifications.jsx";
import SignUpPage from "@buyer/SignUp.jsx";
import Login from "@buyer/login.jsx";
import BuyerDashboard from "@buyer/Buyer_dashboard.jsx";
import BuyerPurchases from "@buyer/BuyerPurchases.jsx";
import BuyerOrderDetails from "@buyer/BuyerOrderDetails.jsx";

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
        <Route path="/buyer/purchases/:id" element={<ProtectedRoute allowedRole="buyer"><BuyerOrderDetails /></ProtectedRoute>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/notifications" element={<PurchaseNotifications />} />

  {/* ⭐ Buyer Routes - Protected */}
  <Route path="/buyer" element={<ProtectedRoute allowedRole="buyer"><BuyerDashboard /></ProtectedRoute>} />
  <Route path="/buyer/purchases" element={<ProtectedRoute allowedRole="buyer"><BuyerPurchases /></ProtectedRoute>} />
  <Route path="/cart" element={<ProtectedRoute allowedRole="buyer"><Cart /></ProtectedRoute>} />
  <Route path="/notifications" element={<ProtectedRoute allowedRole="buyer"><PurchaseNotifications /></ProtectedRoute>} />

        {/* ⭐ Seller Routes WITH Sidebar Using Nested Routes */}
        <Route path="/seller" element={<ProtectedRoute allowedRole="seller"><SellerLayout /></ProtectedRoute>}>
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
          <Route path="orders/:id" element={<SellerOrderDetails />} />
          <Route path="messages" element={<Messages />} />
          <Route path="settings" element={<Settings />} />

          <Route path="product/:id" element={<SellerProductDetails />} />
          <Route path="edit/:id" element={<EditListing />} />
        </Route>

        {/* Shared Product Route */}
        <Route path="/product/:id" element={<BuyerProductDetails />} />
      </Routes>
    </Router>
  );
}

export default WTVMarket;