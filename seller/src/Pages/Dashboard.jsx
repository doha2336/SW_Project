import React, { useState } from "react";
import Header from "../Components/Header";
import DashboardCards from "../Components/DashboardCards";
import ListingsTable from "../Components/ListingsTable";
import RecentActivity from "../Components/RecentActivity";

export default function Dashboard({ listings, activities, onDeleteListing }) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="app-root">
      <main className="main-area">
        <Header setSearchQuery={setSearchQuery} />
        <DashboardCards listings={listings} />
        <section className="content-grid">
          <ListingsTable
            searchQuery={searchQuery}
            listings={listings}
            onDeleteListing={onDeleteListing}
          />
          <RecentActivity activities={activities} />
        </section>
      </main>
    </div>
  );
}
