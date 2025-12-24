import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { apiService } from '@seller/Services/api';
import { useAuth } from '../../src/useAuth';

const styles = {
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
    gap: '12px',
    alignItems: 'center',
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
  cartButton: {
    background: 'none',
    border: '2px solid #8B4513',
    color: '#8B4513',
    fontSize: '16px',
    cursor: 'pointer',
    fontWeight: 600,
    padding: '8px 16px',
    borderRadius: '8px',
    transition: 'all 0.2s',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  cartBadge: {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    backgroundColor: '#e74c3c',
    color: 'white',
    borderRadius: '50%',
    padding: '2px 6px',
    fontSize: '12px',
    fontWeight: 'bold',
    minWidth: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
  const { logout } = useAuth();
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeNav, setActiveNav] = useState('Browse');
  const [cartCount, setCartCount] = useState(0);
  const [notificationCount, setNotificationCount] = useState(0);

  
  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
      setCartCount(totalItems);
    };

    
    updateCartCount();

    
    window.addEventListener('storage', updateCartCount);
    
    
    const interval = setInterval(updateCartCount, 1000);

    return () => {
      window.removeEventListener('storage', updateCartCount);
      clearInterval(interval);
    };
  }, []);

  
  useEffect(() => {
    const updateNotificationCount = () => {
      const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
      const unreadCount = notifications.filter(n => !n.read).length;
      setNotificationCount(unreadCount);
    };

    
    updateNotificationCount();

    
    window.addEventListener('storage', updateNotificationCount);
    
    
    const interval = setInterval(updateNotificationCount, 1000);

    return () => {
      window.removeEventListener('storage', updateNotificationCount);
      clearInterval(interval);
    };
  }, []);

  const categories = ['All', 'Wood', 'Metal', 'Furniture', 'Electronics'];

  const [products, setProducts] = useState([]);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        
        const data = await apiService.getAllProducts();
        console.log('Loaded products:', data); 
        if (data && data.length > 0) {
          console.log('First product image:', data[0].image); 
        }
        if (mounted) setProducts(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error('Could not load products', e);
        if (mounted) setProducts([]);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  const getImageForProduct = (product, idx) => {
    
    console.log(`Product ${product.id} image:`, product.image); 
    return product.image || null;
  };

  const filteredProducts =
    activeCategory === 'All'
      ? products
      : products.filter((product) => (product.category || 'uncategorized').toLowerCase() === activeCategory.toLowerCase());

  const navItems = ['Browse', 'My Purchases', 'Notifications', 'Sell', 'Profile'];

  const handleNavClick = (item) => {
    setActiveNav(item);
    
    
    if (item === 'My Purchases') {
      navigate('/buyer/purchases');
    } else if (item === 'Notifications') {
      navigate('/notifications');
    }
    
    
    
    
    
    
    
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleNotificationsClick = () => {
    navigate('/notifications');
  };

  return (
    <div style={styles.app}>
      {}
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
          
          {}
          <button 
            style={styles.cartButton}
            onClick={handleNotificationsClick}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#8B4513';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#8B4513';
            }}
          >
            🔔 Notifications
            {notificationCount > 0 && (
              <span style={styles.cartBadge}>{notificationCount}</span>
            )}
          </button>
          
          {}
          <button 
            style={styles.cartButton}
            onClick={handleCartClick}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#8B4513';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#8B4513';
            }}
          >
            🛒 Cart
            {cartCount > 0 && (
              <span style={styles.cartBadge}>{cartCount}</span>
            )}
          </button>
          
          {}
          <button
            style={{
              ...styles.cartButton,
              border: '2px solid transparent',
              color: '#8B4513',
              backgroundColor: 'transparent'
            }}
            onClick={() => { logout(); navigate('/'); }}
          >
            Logout
          </button>
        </nav>
      </header>

      {}
      <section style={styles.searchSection}>
        <div style={styles.searchBar}>
          <p style={styles.searchBarText}>Search for treasures...</p>
        </div>
      </section>

      {}
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

      {}
      <section style={styles.productsGrid}>
        {filteredProducts.map((product, index) => (
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
            {getImageForProduct(product, index) ? (
              <div
                style={{
                  ...styles.productImage,
                  backgroundImage: `url(${getImageForProduct(product, index)})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              />
            ) : (
              <div
                style={{
                  ...styles.productImage,
                  backgroundColor: '#f1f3f4',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#95a5a6',
                  fontSize: '14px',
                }}
              >
                No Image
              </div>
            )}
            <div style={styles.productInfo}>
              <h3 style={styles.productName}>{product.name}</h3>
              <p style={styles.productPrice}>EGP {product.price}</p>
              <p style={{marginTop:8, color:'#7f8c8d', fontSize: '13px'}}>
                Seller: {product.seller_email || product.seller_username || 'Unknown'}
              </p>
              <p style={{marginTop:6, color: product.stock > 0 ? '#27ae60' : '#e74c3c', fontSize: '12px', fontWeight: '600'}}>
                {product.stock > 0 ? `Stock: ${product.stock}` : 'Out of Stock'}
              </p>
            </div>
          </div>
        ))}
      </section>

      {}
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