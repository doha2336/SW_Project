import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardCards from "../Components/DashboardCards";

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in (token exists)
    const token = localStorage.getItem('wtv_access_token');
    const user = localStorage.getItem('currentUser');
    
    if (!token || !user) {
      // Redirect to login if not authenticated
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p className="dashboard-subtitle">Overview of your marketplace</p>
      </div>

      {/* Stats Cards */}
      <DashboardCards />

      {/* Divider Line */}
      <hr className="divider" />

      {/* Latest Listings */}
      <div className="section">
        <h2 className="section-title">Latest Listings</h2>
        <table className="simple-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="4" className="no-data">
                No listings found matching your search.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Divider Line */}
      <hr className="divider" />

      {/* Recent Activity */}
      <div className="section">
        <h2 className="section-title">Recent Activity</h2>
        <div className="activity-section">
          <div className="activity-item">
            <strong className="activity-title">New Sale: Vintage...</strong>
            <p className="activity-desc">Order #12510 has been confirmed.</p>
            <span className="activity-time">2m ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}