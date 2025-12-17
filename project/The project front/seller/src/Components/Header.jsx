import React from 'react';
import { useAuth } from '../../../src/useAuth';
import { useNavigate } from 'react-router-dom';

export default function Header({ setSearchQuery }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div>
        <h1>Dashboard</h1>
        <p className="subtitle">Overview of your marketplace</p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search listings…"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ fontWeight: 600 }}>{user.username || user.email}</div>
            <button className="btn-logout" onClick={handleLogout} style={{ padding: '8px 12px', borderRadius: 8 }}>
              Logout
            </button>
          </div>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
