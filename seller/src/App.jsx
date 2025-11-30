import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Dashboard from "./Pages/Dashboard";
import AddListing from "./Pages/AddListing";
import Listings from "./Pages/Listing";

function App() {
  return (
    <Router>
      <div className="app-root">
        <Sidebar />

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create-listing" element={<AddListing />} />
          <Route path="/listings" element={<Listings />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
