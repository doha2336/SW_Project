import React from 'react'
import Sidebar from '../Components/Sidebar'
import Header from '../Components/Header'
import DashboardCards from '../Components/DashboardCards'
import ListingsTable from '../Components/ListingsTable'
import RecentActivity from '../Components/RecentActivity'


export default function Dashboard(){
return (
<div className="app-root">
<Sidebar />
<main className="main-area">
<Header />
<DashboardCards />
<section className="content-grid">
<ListingsTable />
<RecentActivity />
</section>
</main>
</div>
)
}