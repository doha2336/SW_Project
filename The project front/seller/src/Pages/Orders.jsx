import React from 'react';

export default function Orders(){
  return (
    <div className="main-area">
      <div className="header">
        <h1>Orders</h1>
        <p className="subtitle">List of recent orders and order details will appear here.</p>
      </div>
      <div className="card" style={{padding: 20}}>
        <p>There are currently no orders. This is a placeholder page.</p>
      </div>
    </div>
  );
}
