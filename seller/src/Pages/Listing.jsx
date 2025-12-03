// src/Pages/Listing.jsx
import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../Services/api';

export default function Listings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadListings = useCallback(async () => {
    try {
      setLoading(true);
      const data = await apiService.getListings();
      setListings(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadListings();
  }, [loadListings]);

  const deleteListing = async (id) => {
    if (!window.confirm('Delete this listing?')) return;
    try {
      await apiService.deleteListing(id);
      await loadListings();
    } catch (err) {
      alert('Failed to delete: ' + err.message);
    }
  };

  return (
    <div className="main-area">
      <div className="header">
        <div>
          <h1>My Listings</h1>
          <p className="subtitle">Manage and view all your product listings</p>
        </div>
      </div>

      <div className="listings-container">
        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-number">{listings.length}</div>
            <div className="stat-label">Total Listings</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{listings.filter(l => l.status === 'active').length}</div>
            <div className="stat-label">Active</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{listings.filter(l => l.status === 'sold').length}</div>
            <div className="stat-label">Sold</div>
          </div>
        </div>

        <div className="table-card">
          {loading ? <div>Loading...</div> : (
            <table>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Date Posted</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {listings.map((listing) => (
                  <tr key={listing.id}>
                    <td>
                      <div className="product-info">
                        <div className="product-name">{listing.name}</div>
                      </div>
                    </td>
                    <td>{listing.category}</td>
                    <td className="price">${Number(listing.price).toFixed(2)}</td>
                    <td>{listing.status}</td>
                    <td>{new Date(listing.created_at).toLocaleDateString()}</td>
                    <td>
                      <div className="actions">
                        <button className="action-btn view" onClick={() => navigate(`/product/${listing.id}`)}>View</button>
                        <button className="action-btn delete" onClick={() => deleteListing(listing.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
                {listings.length === 0 && (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '40px' }}>
                      No listings found. Create your first listing!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
