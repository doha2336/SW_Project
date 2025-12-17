import React from 'react';

export default function Messages(){
  return (
    <div className="main-area">
      <div className="header">
        <h1>Messages</h1>
        <p className="subtitle">Your messages from buyers will appear here.</p>
      </div>
      <div className="card" style={{padding: 20}}>
        <p>No messages yet — this is a placeholder page.</p>
      </div>
    </div>
  );
}
