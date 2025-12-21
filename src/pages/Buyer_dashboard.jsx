import React, { useState } from 'react';
import '../App.css'; // نفس CSS القديم عشان التصميم يفضل زي ما هو

const BuyerDashboard = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeNav, setActiveNav] = useState('Browse');
  
  const categories = ['All', 'Electronics', 'Furniture', 'Clothing'];
  
  const products = [
    { id: 1, name: 'Vintage Leather Chair', price: 150, category: 'Furniture' },
    { id: 2, name: 'Used iPhone 12', price: 300, category: 'Electronics' },
    { id: 3, name: 'Wooden Coffee Table', price: 80, category: 'Furniture' },
    { id: 4, name: 'Designer Handbag', price: 250, category: 'Clothing' },
    { id: 5, name: 'Set of Kitchen Knives', price: 45, category: 'Furniture' },
    { id: 6, name: 'Mountain Bike', price: 200, category: 'Electronics' }
  ];
  
  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(product => product.category === activeCategory);
  
  const navItems = ['Browse', 'Saved', 'Sell', 'Profile'];

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <h1 className="logo">ReValue</h1>
      </header>
      
      {/* Search Bar */}
      <div className="search-bar">
        <p>Search for treasures...</p>
      </div>
      
      {/* Categories */}
      <div className="categories">
        {categories.map(category => (
          <button
            key={category}
            className={`category-btn ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      
      {/* Products Grid */}
      <div className="products-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image"></div>
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        {navItems.map(item => (
          <button
            key={item}
            className={`nav-item ${activeNav === item ? 'active' : ''}`}
            onClick={() => setActiveNav(item)}
          >
            {item}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default BuyerDashboard;
