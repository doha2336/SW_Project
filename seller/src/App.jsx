import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar.jsx";
import Dashboard from "./Pages/Dashboard";
import AddListing from "./Pages/AddListing";   // correct name

function App() {
  return (
    <Router>
      <div className="app-root">
        <Sidebar />

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create-listing" element={<AddListing />} />   {/* fixed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
