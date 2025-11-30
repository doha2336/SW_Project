import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import product1 from './assets/product1.jpg.jpeg';
import product2 from './assets/product2.jpg.jpeg';
import product3 from './assets/product3.jpg.jpeg';
import product4 from './assets/product4.jpg.jpeg';
import product5 from './assets/product5.jpg.jpeg';
import product6 from './assets/product6.jpeg';        
import product7 from './assets/product7.jpg.jpeg';
import product8 from './assets/product8.jpg.jpeg';  
import product9 from './assets/product9.jpg.jpeg';

export const styles = {
  app: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    minHeight: '100vh',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 0',
    borderBottom: '1px solid #eaeaea',
    marginBottom: '30px',
  },
  logo: {
    color: '#2c3e50',
    fontSize: '32px',
    fontWeight: 700,
    letterSpacing: '1px',
  },
  mainNav: {
    display: 'flex',
    gap: '30px',
  },
  navItem: {
    background: 'none',
    border: 'none',
    fontSize: '16px',
    color: '#7f8c8d',
    cursor: 'pointer',
    padding: '8px 16px',
    borderRadius: '8px',
    fontWeight: 500,
    transition: 'all 0.2s',
  },
  navItemActive: {
    color: '#8B4513',
    backgroundColor: 'rgba(139,69,19,0.1)',
  },
  searchSection: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  searchBar: {
    backgroundColor: '#f1f3f4',
    borderRadius: '24px',
    padding: '15px 25px',
    margin: '20px auto',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    maxWidth: '500px',
    display: 'inline-block',
  },
  searchBarText: {
    color: '#5f6368',
    fontSize: '16px',
    margin: 0,
  },
  categories: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '40px',
    gap: '15px',
    flexWrap: 'wrap',
  },
  categoryBtn: {
    padding: '12px 24px',
    borderRadius: '20px',
    backgroundColor: '#e9ecef',
    border: 'none',
    fontSize: '16px',
    fontWeight: 500,
    color: '#495057',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  categoryBtnActive: {
    backgroundColor: '#8B4513',
    color: 'white',
  },
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '30px',
    marginBottom: '60px',
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s, box-shadow 0.3s',
    cursor: 'pointer',
  },
  productImage: {
    width: '100%',
    height: '200px',
    backgroundColor: '#ecf0f1',
    position: 'relative',
  },
  productInfo: {
    padding: '20px',
  },
  productName: {
    fontSize: '18px',
    fontWeight: 600,
    marginBottom: '10px',
    color: '#2c3e50',
  },
  productPrice: {
    color: '#27ae60',
    fontWeight: 700,
    fontSize: '20px',
  },
  footer: {
    backgroundColor: 'white',
    padding: '30px 0',
    borderTop: '1px solid #eaeaea',
    marginTop: '40px',
  },
  footerNav: {
    display: 'flex',
    justifyContent: 'center',
    gap: '40px',
  },
  footerItem: {
    background: 'none',
    border: 'none',
    fontSize: '16px',
    color: '#7f8c8d',
    cursor: 'pointer',
    padding: '10px 20px',
    borderRadius: '8px',
    transition: 'all 0.2s',
    fontWeight: 500,
  },
  footerItemActive: {
    color: '#8B4513',
    backgroundColor: 'rgba(139,69,19,0.1)',
  },
};

const BuyerDashboard = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeNav, setActiveNav] = useState('Browse');
  const navigate = useNavigate(); // to navigate to product details 
  

  const categories = ['All', 'Electronics', 'Furniture', 'Clothing'];

  const products = [
    { id: 1, name: 'Vintage Leather Chair', price: 150, category: 'Furniture', img: product1 },
    { id: 2, name: 'Used iPhone 12', price: 300, category: 'Electronics', img: product2 },
    { id: 3, name: 'Wooden Coffee Table', price: 80, category: 'Furniture', img: product3 },
    { id: 4, name: 'Designer Handbag', price: 250, category: 'Clothing', img: product4 },
    { id: 5, name: 'Set of Kitchen Knives', price: 45, category: 'Furniture', img: product5 },
    { id: 6, name: 'Mountain Bike', price: 200, category: 'Electronics', img: product6 },
    { id: 7, name: 'Vintage Camera', price: 120, category: 'Electronics', img: product7 },
    { id: 8, name: 'Leather Jacket', price: 180, category: 'Clothing', img: product8 },
    { id: 9, name: 'Office Desk', price: 95, category: 'Furniture', img: product9 },
  ];

  const filteredProducts =
    activeCategory === 'All'
      ? products
      : products.filter((product) => product.category === activeCategory);

  const navItems = ['Browse', 'My Purchases', 'Sell', 'Profile'];

  const handleNavClick = (item) => {
    setActiveNav(item);
    
    // Navigate to different pages based on nav item
    if (item === 'My Purchases') {
      navigate('/buyer/purchases');
    }
    // Add more navigation logic here for other items when you create those pages
    // else if (item === 'Sell') {
    //   navigate('/seller');
    // }
    // else if (item === 'Profile') {
    //   navigate('/profile');
    // }
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div style={styles.app}>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.logo}>ReValue</h1>
        <nav style={styles.mainNav}>
          <button 
            style={{ 
              ...styles.navItem, 
              ...styles.navItemActive 
            }}
          >
            Home
          </button>
          <button style={styles.navItem}>Categories</button>
          <button style={styles.navItem}>How it Works</button>
          <button style={styles.navItem}>Contact</button>
        </nav>
      </header>

      {/* Search Section */}
      <section style={styles.searchSection}>
        <div style={styles.searchBar}>
          <p style={styles.searchBarText}>Search for treasures...</p>
        </div>
      </section>

      {/* Categories */}
      <section style={styles.categories}>
        {categories.map((category) => (
          <button
            key={category}
            style={{
              ...styles.categoryBtn,
              ...(activeCategory === category ? styles.categoryBtnActive : {}),
            }}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </section>

      {/* Products Grid */}
      <section style={styles.productsGrid}>
        {filteredProducts.map((product) => (
          <div 
            key={product.id} 
            style={styles.productCard}
            onClick={() => handleProductClick(product.id)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
            }}
          >
            <div
              style={{
                ...styles.productImage,
                backgroundImage: `url(${product.img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            />
            <div style={styles.productInfo}>
              <h3 style={styles.productName}>{product.name}</h3>
              <p style={styles.productPrice}>${product.price}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <nav style={styles.footerNav}>
          {navItems.map((item) => (
            <button
              key={item}
              style={{
                ...styles.footerItem,
                ...(activeNav === item ? styles.footerItemActive : {}),
              }}
              onClick={() => handleNavClick(item)}
              onMouseEnter={(e) => {
                if (activeNav !== item) {
                  e.currentTarget.style.color = '#3498db';
                }
              }}
              onMouseLeave={(e) => {
                if (activeNav !== item) {
                  e.currentTarget.style.color = '#7f8c8d';
                }
              }}
            >
              {item}
            </button>
          ))}
        </nav>
      </footer>
    </div>
  );
};

export default BuyerDashboard;