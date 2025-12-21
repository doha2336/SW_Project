import React from 'react'
import { NavLink } from "react-router-dom";
import { FiGrid, FiList, FiPackage, FiMail, FiBarChart2, FiSettings, FiPlusCircle } from 'react-icons/fi'

export default function Sidebar(){
  return (
    <aside className="sidebar">
      <div className="profile">
        <img src="/avatar.png" alt="avatar" className="avatar" />
        <div>
          <div className="name">Eco Seller</div>
          <div className="email">seller@example.com</div>
        </div>
      </div>
      
      <nav className="nav">
        <NavLink to="/" className="nav-item">
          <FiGrid/> <span>Dashboard</span>
        </NavLink>
        <NavLink to="/listings" className="nav-item">  {/* CHANGED TO NavLink */}
          <FiList/> <span>My Listings</span>
        </NavLink>
        <button className="nav-item"><FiPackage/> <span>Orders</span></button>
        <button className="nav-item"><FiMail/> <span>Messages</span></button>
        {/*<button className="nav-item"><FiBarChart2/> <span>Analytics</span></button>*/}
        <button className="nav-item"><FiSettings/> <span>Settings</span></button>
      </nav>
      
      <NavLink to="/create-listing" className="add-listing">
        <FiPlusCircle /> Add New Listing
      </NavLink>
    </aside>
  )
}