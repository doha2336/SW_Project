import React, { useEffect, useState } from 'react';
import { apiService } from '../Services/api';

export default function Orders(){
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await apiService.getSellerOrders();
        if (mounted) setOrders(data || []);
      } catch (e) {
        console.error('Failed to load seller orders', e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false };
  }, []);

  return (
    <div className="main-area">
      <div className="header">
        <h1>Orders</h1>
        <p className="subtitle">Recent orders for your listings</p>
      </div>
      <div className="card" style={{padding: 20}}>
        {loading ? (
          <p>Loading orders…</p>
        ) : orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          <div>
            {orders.map(order => (
              <div key={order.id} style={{borderBottom: '1px solid #eee', padding: 12}}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                  <div style={{display: 'flex', gap: 12, alignItems: 'center'}}>
                    {order.product_info?.image ? <img src={order.product_info.image} alt="" style={{width:80, height:80, objectFit:'cover', borderRadius:8}} /> : <div style={{width:80, height:80, backgroundColor:'#f1f1f1', borderRadius:8}}/>}
                    <div>
                      <strong>Order #{order.id}</strong>
                      <div>Product: {order.product_info?.name}</div>
                      <div>Quantity: {order.quantity}</div>
                      <div>Buyer: {order.buyer_info?.username} ({order.buyer_info?.email})</div>
                    </div>
                  </div>
                  <div style={{textAlign: 'right'}}>
                    <div>Total: ${order.total_price}</div>
                    <div>Status: {order.status}</div>
                    <div>Date: {new Date(order.created_at).toLocaleString()}</div>
                    <button className="action-btn" style={{marginTop:8}} onClick={() => window.location.href = `/seller/orders/${order.id}`}>View</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
