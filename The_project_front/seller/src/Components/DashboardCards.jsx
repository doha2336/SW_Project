import React, { useEffect, useState } from 'react';
import { apiService } from '../Services/api';

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
  const [metrics, setMetrics] = useState({
    total_revenue: '0.00',
    active_listings: 0,
    unread_messages: 0,
    pending_orders: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const data = await apiService.getSellerMetrics();
        if (mounted && data) setMetrics(data);
      } catch (e) {
        console.error('Failed to load dashboard metrics', e);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    const interval = setInterval(load, 10000);
    return () => { mounted = false; clearInterval(interval); };
  }, []);

  const rev = Number(metrics.total_revenue || 0).toFixed(2);

  return (
    <div className="stats-container">
      <Card
        title="Total Revenue"
        value={`EGP ${rev}`}
        noChange={true}
      />

      <Card
        title="Active Listings"
        value={String(metrics.active_listings || 0)}
        noChange={true}
      />

      <Card
        title="Unread Messages"
        value={String(metrics.unread_messages || 0)}
        noChange={true}
      />

      <Card
        title="Pending Orders"
        value={String(metrics.pending_orders || 0)}
        noChange={true}
      />
    </div>
  );
}