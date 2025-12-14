import React from 'react';

function Card({title, value, change, noChange}) {
  return (
    <div className="stat-card">
      <div className="stat-title">{title}</div>
      <div className="stat-value">{value}</div>
      {!noChange && <div className="stat-change">{change}</div>}
    </div>
  );
}

export default function DashboardCards() {
  return (
    <div className="stats-container">
      <Card 
        title="Total Revenue" 
        value="$1,250.00" 
        change="+5.2% this month" 
      />
      
      <Card 
        title="Active Listings" 
        value="82" 
        change="+2 this week" 
      />
      
      <Card 
        title="Unread Messages" 
        value="5" 
        noChange={true}
      />
      
      <Card 
        title="Pending Orders" 
        value="12" 
        change="+3 today" 
      />
    </div>
  );
}