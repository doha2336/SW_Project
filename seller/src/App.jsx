import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Dashboard from "./Pages/Dashboard";
import AddListing from "./Pages/AddListing";
import Listings from "./Pages/Listing";
import ProductDetails from "./Pages/ProductDetails";
import { useState, useEffect } from "react";
import { apiService } from "./Services/api";

function App() {
  const [listings, setListings] = useState([]);
  const [activities, setActivities] = useState([]);

  // Load all data safely inside useEffect
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
  }, []); // Only runs once on mount

  // Delete listing
  const deleteListing = async (id) => {
    try {
      await apiService.deleteListing(id);
      setListings((prev) => prev.filter((l) => l.id !== id));
    } catch (err) {
      console.error("Error deleting listing:", err);
    }
  };

  // Reload dashboard after adding a new listing
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
      <div className="app-root">
        <Sidebar />
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                listings={listings}
                activities={activities}
                onDeleteListing={deleteListing}
              />
            }
          />
          <Route
            path="/create-listing"
            element={<AddListing onListingAdded={addListing} />}
          />
          <Route
            path="/listings"
            element={
              <Listings listings={listings} onDeleteListing={deleteListing} />
            }
          />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
