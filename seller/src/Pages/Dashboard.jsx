import React, { useState } from 'react'
import Header from '../Components/Header'
import DashboardCards from '../Components/DashboardCards'
import ListingsTable from '../Components/ListingsTable'
import RecentActivity from '../Components/RecentActivity'
// REMOVE this line: import Sidebar from "./Components/Sidebar.jsx";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="app-root">
      {/* REMOVE this line: <Sidebar /> */}
      <main className="main-area">
        <Header setSearchQuery={setSearchQuery} />
        <DashboardCards />
        <section className="content-grid">
          <ListingsTable searchQuery={searchQuery} />
          <RecentActivity />
        </section>
      </main>
    </div>
  )
}