import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '@seller/Services/api';
import { useAuth } from '../../src/useAuth';

export default function Cart() {
  const navigate = useNavigate();
  
  // Load cart from localStorage
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const updateQuantity = (id, change) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const clearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      setCartItems([]);
      localStorage.removeItem('cart');
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const { logout } = useAuth();

  return (
    <div style={styles.container}>
      {/* Header matching Buyer Dashboard */}
      <header style={styles.header}>
        <h1 style={styles.logo}>ReValue</h1>
        <div>
          <button style={styles.logoutButton} onClick={() => { logout(); navigate('/'); }}>
            Logout
          </button>
          <button style={styles.backButton} onClick={() => navigate('/buyer')}>
            ← Back to Dashboard
          </button>
        </div>
      </header>

      <div style={styles.content}>
        {/* Title Section */}
        <div style={styles.titleSection}>
          <div>
            <h2 style={styles.title}>Shopping Cart</h2>
            <p style={styles.itemCount}>{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}</p>
          </div>
          {cartItems.length > 0 && (
            <button 
              style={styles.clearButton} 
              onClick={clearCart}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#fee';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              Clear Cart
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <div style={styles.emptyCart}>
            <div style={styles.emptyIcon}>🛒</div>
            <h3 style={styles.emptyTitle}>Your cart is empty</h3>
            <p style={styles.emptyText}>Add some items to get started!</p>
            <button 
              style={styles.shopButton} 
              onClick={() => navigate('/buyer')}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(139, 69, 19, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div style={styles.mainContent}>
            {/* Cart Items Section */}
            <div style={styles.cartSection}>
              {cartItems.map(item => (
                <div key={item.id} style={styles.cartItem}>
                  <img 
                    src={item.img} 
                    alt={item.name} 
                    style={styles.itemImage}
                    onClick={() => navigate(`/product/${item.id}`)}
                  />
                  <div style={styles.itemInfo}>
                    <h3 
                      style={styles.itemName}
                      onClick={() => navigate(`/product/${item.id}`)}
                    >
                      {item.name}
                    </h3>
                    <p style={styles.itemCategory}>{item.category}</p>
                    <p style={styles.itemPrice}>${item.price}</p>
                  </div>
                  <div style={styles.itemActions}>
                    <div style={styles.quantityControls}>
                      <button 
                        onClick={() => updateQuantity(item.id, -1)} 
                        style={styles.qtyButton}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#8B4513';
                          e.currentTarget.style.color = 'white';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#f1f3f4';
                          e.currentTarget.style.color = '#2c3e50';
                        }}
                      >
                        −
                      </button>
                      <span style={styles.quantity}>{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)} 
                        style={styles.qtyButton}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#8B4513';
                          e.currentTarget.style.color = 'white';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#f1f3f4';
                          e.currentTarget.style.color = '#2c3e50';
                        }}
                      >
                        +
                      </button>
                    </div>
                    <p style={styles.itemTotal}>${(item.price * item.quantity).toFixed(2)}</p>
                    <button 
                      onClick={() => removeItem(item.id)} 
                      style={styles.removeButton}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#e74c3c';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#95a5a6';
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary Section */}
            <div style={styles.summarySection}>
              <div style={styles.summaryCard}>
                <h3 style={styles.summaryTitle}>Order Summary</h3>
                
                <div style={styles.summaryDetails}>
                  <div style={styles.summaryRow}>
                    <span style={styles.summaryLabel}>Subtotal</span>
                    <span style={styles.summaryValue}>${total.toFixed(2)}</span>
                  </div>
                  <div style={styles.summaryRow}>
                    <span style={styles.summaryLabel}>Shipping</span>
                    <span style={styles.summaryValue}>$10.00</span>
                  </div>
                  <div style={styles.summaryRow}>
                    <span style={styles.summaryLabel}>Tax</span>
                    <span style={styles.summaryValue}>${(total * 0.08).toFixed(2)}</span>
                  </div>
                  
                  <div style={styles.divider}></div>
                  
                  <div style={{...styles.summaryRow, ...styles.summaryTotal}}>
                    <span style={styles.totalLabel}>Total</span>
                    <span style={styles.totalValue}>${(total + 10 + total * 0.08).toFixed(2)}</span>
                  </div>
                </div>

                <button 
                  style={styles.checkoutButton} 
                  onClick={async () => {
                    if (!confirm('Confirm purchase and proceed to checkout?')) return;
                    try {
                      for (const item of cartItems) {
                        await apiService.createOrder({ product: item.id, quantity: item.quantity });
                      }
                      // Clear cart and navigate to purchases
                      setCartItems([]);
                      localStorage.removeItem('cart');
                      alert('Order placed successfully!');
                      navigate('/buyer/purchases');
                    } catch (e) {
                      console.error('Checkout error', e.response?.data || e);
                      const backendMsg = e.response?.data;
                      if (e.response && e.response.status === 401) {
                        alert('Please log in before checking out.');
                        navigate('/login');
                      } else {
                        const msg = backendMsg?.detail || backendMsg?.error || JSON.stringify(backendMsg) || e.message;
                        alert('Failed to place order: ' + msg);
                      }
                    }
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(139, 69, 19, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Proceed to Checkout →
                </button>
                
                <button 
                  style={styles.continueButton} 
                  onClick={() => navigate('/buyer')}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#8B4513';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.color = '#8B4513';
                  }}
                >
                  Continue Shopping
                </button>

                {/* Trust Badges */}
                <div style={styles.trustBadges}>
                  <div style={styles.badge}>
                    <span style={styles.badgeIcon}>🔒</span>
                    <span style={styles.badgeText}>Secure Payment</span>
                  </div>
                  <div style={styles.badge}>
                    <span style={styles.badgeIcon}>📦</span>
                    <span style={styles.badgeText}>Fast Shipping</span>
                  </div>
                  <div style={styles.badge}>
                    <span style={styles.badgeIcon}>↩️</span>
                    <span style={styles.badgeText}>Easy Returns</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  header: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #eaeaea',
    backgroundColor: 'white',
  },
  logo: {
    color: '#2c3e50',
    fontSize: '32px',
    fontWeight: 700,
    letterSpacing: '1px',
    margin: 0,
  },
  backButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#8B4513',
    fontSize: '16px',
    cursor: 'pointer',
    fontWeight: 600,
    padding: '8px 16px',
    borderRadius: '8px',
    transition: 'all 0.2s',
  },
  logoutButton: {
    backgroundColor: 'transparent',
    border: '2px solid #8B4513',
    color: '#8B4513',
    fontSize: '14px',
    cursor: 'pointer',
    fontWeight: 600,
    padding: '6px 12px',
    borderRadius: '8px',
  },
  clearButton: {
    backgroundColor: 'transparent',
    border: '2px solid #e74c3c',
    color: '#e74c3c',
    fontSize: '14px',
    cursor: 'pointer',
    fontWeight: 600,
    padding: '10px 20px',
    borderRadius: '8px',
    transition: 'all 0.2s',
  },
  content: {
    maxWidth: '1200px',
    margin: '40px auto',
    padding: '0 20px',
  },
  titleSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
  },
  title: {
    fontSize: '32px',
    fontWeight: 700,
    color: '#2c3e50',
    margin: '0 0 8px 0',
  },
  itemCount: {
    fontSize: '16px',
    color: '#7f8c8d',
    margin: 0,
  },

  mainContent: {
    display: 'grid',
    gridTemplateColumns: '1fr 400px',
    gap: '30px',
  },
  cartSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  cartItem: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    display: 'grid',
    gridTemplateColumns: '120px 1fr auto',
    gap: '20px',
    alignItems: 'center',
    transition: 'all 0.2s',
  },
  itemImage: {
    width: '120px',
    height: '120px',
    objectFit: 'cover',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  itemInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  itemName: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#2c3e50',
    margin: 0,
    cursor: 'pointer',
    transition: 'color 0.2s',
  },
  itemCategory: {
    fontSize: '14px',
    color: '#95a5a6',
    margin: 0,
  },
  itemPrice: {
    fontSize: '20px',
    fontWeight: 700,
    color: '#27ae60',
    margin: 0,
  },
  itemActions: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '12px',
  },
  quantityControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    backgroundColor: '#f1f3f4',
    padding: '8px 12px',
    borderRadius: '8px',
  },
  qtyButton: {
    width: '32px',
    height: '32px',
    border: 'none',
    backgroundColor: '#f1f3f4',
    borderRadius: '6px',
    fontSize: '18px',
    fontWeight: 600,
    cursor: 'pointer',
    color: '#2c3e50',
    transition: 'all 0.2s',
  },
  quantity: {
    minWidth: '30px',
    textAlign: 'center',
    fontWeight: 600,
    fontSize: '16px',
    color: '#2c3e50',
  },
  itemTotal: {
    fontSize: '22px',
    fontWeight: 700,
    color: '#2c3e50',
    margin: 0,
  },
  removeButton: {
    background: 'none',
    border: 'none',
    color: '#95a5a6',
    fontSize: '14px',
    cursor: 'pointer',
    fontWeight: 600,
    transition: 'all 0.2s',
    textDecoration: 'underline',
  },
  summarySection: {
    position: 'sticky',
    top: '20px',
    height: 'fit-content',
  },
  summaryCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '30px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  summaryTitle: {
    fontSize: '24px',
    fontWeight: 700,
    color: '#2c3e50',
    marginBottom: '24px',
  },
  summaryDetails: {
    marginBottom: '24px',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
  },
  summaryLabel: {
    fontSize: '16px',
    color: '#7f8c8d',
  },
  summaryValue: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#2c3e50',
  },
  divider: {
    height: '1px',
    backgroundColor: '#ecf0f1',
    margin: '16px 0',
  },
  summaryTotal: {
    paddingTop: '16px',
  },
  totalLabel: {
    fontSize: '20px',
    fontWeight: 700,
    color: '#2c3e50',
  },
  totalValue: {
    fontSize: '24px',
    fontWeight: 700,
    color: '#27ae60',
  },
  checkoutButton: {
    width: '100%',
    padding: '16px',
    border: 'none',
    backgroundColor: '#8B4513',
    color: 'white',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
    marginBottom: '12px',
  },
  continueButton: {
    width: '100%',
    padding: '14px',
    backgroundColor: 'white',
    color: '#8B4513',
    border: '2px solid #8B4513',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  trustBadges: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginTop: '24px',
    paddingTop: '24px',
    borderTop: '1px solid #ecf0f1',
  },
  badge: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  badgeIcon: {
    fontSize: '20px',
  },
  badgeText: {
    fontSize: '14px',
    color: '#7f8c8d',
    fontWeight: 500,
  },
  emptyCart: {
    textAlign: 'center',
    padding: '80px 20px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  emptyIcon: {
    fontSize: '80px',
    marginBottom: '20px',
  },
  emptyTitle: {
    fontSize: '28px',
    fontWeight: 700,
    color: '#2c3e50',
    margin: '0 0 12px 0',
  },
  emptyText: {
    fontSize: '16px',
    color: '#7f8c8d',
    marginBottom: '30px',
  },
  shopButton: {
    padding: '16px 40px',
    border: 'none',
    backgroundColor: '#8B4513',
    color: 'white',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
};