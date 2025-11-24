import React from 'react'
import { FiGrid, FiList, FiPackage, FiMail, FiBarChart2, FiSettings } from 'react-icons/fi'


export default function Sidebar(){
return (
<aside className="sidebar">
<div className="profile">
<img src="/mnt/data/screen.png" alt="avatar" className="avatar" />
<div>
<div className="name">Eco Seller</div>
<div className="email">seller@example.com</div>
</div>
</div>


<nav className="nav">
<button className="nav-item active"><FiGrid/> <span>Dashboard</span></button>
<button className="nav-item"><FiList/> <span>My Listings</span></button>
<button className="nav-item"><FiPackage/> <span>Orders</span></button>
<button className="nav-item"><FiMail/> <span>Messages</span></button>
<button className="nav-item"><FiBarChart2/> <span>Analytics</span></button>
<button className="nav-item"><FiSettings/> <span>Settings</span></button>
</nav>


<button className="add-listing">Add New Listing</button>
</aside>
)
}