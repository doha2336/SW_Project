import React from 'react';

export default function Listings() {
  // Sample listings data
  const listings = [
    { id: 1, name: "Antique Wooden Chair", price: "$120", status: "Active", date: "2024-01-15", category: "Furniture" },
    { id: 2, name: "Vintage Oak Planks", price: "$80", status: "Active", date: "2024-01-10", category: "Wood" },
    { id: 3, name: "Reclaimed Metal Pipes", price: "$60", status: "Sold", date: "2024-01-05", category: "Metal" },
    { id: 4, name: "Set of Ceramic Mugs", price: "$45", status: "Expired", date: "2023-12-20", category: "Home" },
    { id: 5, name: "Antique Brass Lamp", price: "$95", status: "Active", date: "2024-01-12", category: "Lighting" },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Active': return '#e9f7ea';
      case 'Sold': return '#f0f0f0';
      case 'Expired': return '#ffe6e6';
      default: return '#f0f0f0';
    }
  };

  const getStatusTextColor = (status) => {
    switch(status) {
      case 'Active': return '#2b7a3b';
      case 'Sold': return '#555';
      case 'Expired': return '#d32f2f';
      default: return '#555';
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
            <div className="stat-number">{listings.filter(l => l.status === 'Active').length}</div>
            <div className="stat-label">Active</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{listings.filter(l => l.status === 'Sold').length}</div>
            <div className="stat-label">Sold</div>
          </div>
        </div>

        <div className="table-card">
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
                  <td className="price">{listing.price}</td>
                  <td>
                    <span 
                      className="status-badge"
                      style={{
                        backgroundColor: getStatusColor(listing.status),
                        color: getStatusTextColor(listing.status)
                      }}
                    >
                      {listing.status}
                    </span>
                  </td>
                  <td>{listing.date}</td>
                  <td>
                    <div className="actions">
                      <button className="action-btn edit">Edit</button>
                      <button className="action-btn delete">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}