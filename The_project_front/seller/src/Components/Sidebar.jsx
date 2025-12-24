import React from 'react'
import logo from '@src/assets/logo.svg'
import { NavLink, useNavigate } from "react-router-dom";
import { FiGrid, FiList, FiPackage, FiMail, FiBarChart2, FiSettings, FiPlusCircle } from 'react-icons/fi'
import { useAuth } from '../../../src/useAuth';

export default function Sidebar(){
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  }

  return (
    <aside className="sidebar">
      <div className="profile">
        <img src={logo} alt="avatar" className="avatar" />
        <div>
          <div className="name">Eco Seller</div>
          <div className="email">seller@example.com</div>
        </div>
      </div>
      
      <nav className="nav">
        <NavLink to="/seller" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <FiGrid/> <span>Dashboard</span>
        </NavLink>
        <NavLink to="/seller/listings" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <FiList/> <span>My Listings</span>
        </NavLink>
        <NavLink to="/seller/orders" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <FiPackage/> <span>Orders</span>
        </NavLink>
        <NavLink to="/seller/messages" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <FiMail/> <span>Messages</span>
        </NavLink>
        {}
        <NavLink to="/seller/settings" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}><FiSettings/> <span>Settings</span></NavLink>
      </nav>
      
      <NavLink to="/seller/create-listing" className="add-listing">
        <FiPlusCircle /> Add New Listing
      </NavLink>

      <button className="btn-logout" style={{marginTop:16}} onClick={handleLogout}>Logout</button>
    </aside>
  )
}