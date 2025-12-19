import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '@seller/Services/api';

// Import product images (reusing from dashboard)
import product1 from './assets/product1.jpg.jpeg';

export default function BuyerPurchases() {
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState('All');
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await apiService.getMyOrders();
        if (mounted) setPurchases((data || []));
      } catch (e) {
        console.error('Failed to load purchases', e);
      }
    })();
    return () => { mounted = false };
  }, []);

  const statuses = ['All', 'Processing', 'Shipped', 'Delivered'];

  const filteredPurchases = filterStatus === 'All' 
    ? purchases 
    : purchases.filter(p => p.status === filterStatus);

  const getStatusStyle = (status) => {
    switch(status) {
      case 'Delivered':
        return { backgroundColor: '#d4edda', color: '#155724' };
      case 'Shipped':
        return { backgroundColor: '#d1ecf1', color: '#0c5460' };
      case 'Processing':
        return { backgroundColor: '#fff3cd', color: '#856404' };
      default:
        return { backgroundColor: '#e9ecef', color: '#495057' };
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.logo}>ReValue</h1>
        <button style={styles.backButton} onClick={() => navigate('/buyer')}>
          ← Back to Dashboard
        </button>
      </header>

      <div style={styles.content}>
        <div style={styles.titleSection}>
          <h2 style={styles.pageTitle}>My Purchases</h2>
          <p style={styles.pageSubtitle}>View and track your order history</p>
        </div>

        {/* Filter Tabs */}
        <div style={styles.filterSection}>
          {statuses.map((status) => (
            <button
              key={status}
              style={{
                ...styles.filterBtn,
                ...(filterStatus === status ? styles.filterBtnActive : {})
              }}
              onClick={() => setFilterStatus(status)}
            >
              {status}
              {status === 'All' && ` (${purchases.length})`}
              {status !== 'All' && ` (${purchases.filter(p => p.status === status).length})`}
            </button>
          ))}
        </div>

        {/* Purchases List */}
        <div style={styles.purchasesList}>
          {filteredPurchases.length === 0 ? (
            <div style={styles.emptyState}>
              <p style={styles.emptyText}>No purchases found</p>
              <button 
                style={styles.shopButton}
                onClick={() => navigate('/buyer')}
              >
                Start Shopping
              </button>
            </div>
          ) : (
            filteredPurchases.map((purchase) => (
              <div key={purchase.id} style={styles.purchaseCard}>
                {/* Order Header */}
                <div style={styles.orderHeader}>
                  <div style={styles.orderInfo}>
                    <h3 style={styles.orderId}>Order #{purchase.id}</h3>
                    <p style={styles.orderDate}>Placed on {new Date(purchase.created_at).toLocaleDateString()}</p>
                  </div>
                  <div style={styles.orderStatus}>
                    <span style={{...styles.statusBadge, ...getStatusStyle(purchase.status)}}>
                      {purchase.status}
                    </span>
                  </div>
                </div>

                {/* Order Items */}
                <div style={styles.itemsList}>
                  <div style={styles.itemRow}>
                    <div style={styles.itemImage}>
                      <img src={purchase.product_info?.image || product1} alt={purchase.product_info?.name || 'Product'} style={styles.itemImg} />
                    </div>
                    <div style={styles.itemDetails}>
                      <h4 style={styles.itemName}>{purchase.product_info?.name}</h4>
                      <p style={styles.itemQuantity}>Quantity: {purchase.quantity}</p>
                    </div>
                    <div style={styles.itemPrice}>
                      ${purchase.total_price}
                    </div>
                  </div>
                </div>

                {/* Order Footer */}
                <div style={styles.orderFooter}>
                  <div style={styles.deliveryInfo}>
                    <p style={styles.deliveryText}>Status: {purchase.status}</p>
                  </div>
                  <div style={styles.totalSection}>
                    <span style={styles.totalLabel}>Total:</span>
                    <span style={styles.totalAmount}>${purchase.total_price}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={styles.actionButtons}>
                  <button style={styles.viewDetailsBtn} onClick={() => navigate(`/buyer/purchases/${purchase.id}`)}>
                    View Details
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
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
  content: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
  },
  titleSection: {
    marginBottom: '30px',
  },
  pageTitle: {
    fontSize: '32px',
    fontWeight: 700,
    color: '#2c3e50',
    margin: '0 0 8px 0',
  },
  pageSubtitle: {
    fontSize: '16px',
    color: '#7f8c8d',
    margin: 0,
  },
  filterSection: {
    display: 'flex',
    gap: '12px',
    marginBottom: '30px',
    flexWrap: 'wrap',
  },
  filterBtn: {
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
  filterBtnActive: {
    backgroundColor: '#8B4513',
    color: 'white',
  },
  purchasesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  purchaseCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  },
  orderHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '20px',
    paddingBottom: '16px',
    borderBottom: '1px solid #ecf0f1',
  },
  orderInfo: {
    flex: 1,
  },
  orderId: {
    fontSize: '20px',
    fontWeight: 600,
    color: '#2c3e50',
    margin: '0 0 4px 0',
  },
  orderDate: {
    fontSize: '14px',
    color: '#7f8c8d',
    margin: 0,
  },
  orderStatus: {
    display: 'flex',
    alignItems: 'center',
  },
  statusBadge: {
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: 600,
  },
  itemsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginBottom: '20px',
  },
  itemRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  itemImage: {
    width: '80px',
    height: '80px',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: '#ecf0f1',
  },
  itemImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#2c3e50',
    margin: '0 0 4px 0',
  },
  itemQuantity: {
    fontSize: '14px',
    color: '#7f8c8d',
    margin: 0,
  },
  itemPrice: {
    fontSize: '18px',
    fontWeight: 700,
    color: '#27ae60',
  },
  orderFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '16px',
    borderTop: '1px solid #ecf0f1',
    marginBottom: '16px',
  },
  deliveryInfo: {
    flex: 1,
  },
  deliveryText: {
    fontSize: '14px',
    color: '#7f8c8d',
    margin: 0,
  },
  totalSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  totalLabel: {
    fontSize: '16px',
    color: '#7f8c8d',
    fontWeight: 500,
  },
  totalAmount: {
    fontSize: '24px',
    fontWeight: 700,
    color: '#2c3e50',
  },
  actionButtons: {
    display: 'flex',
    gap: '12px',
  },
  viewDetailsBtn: {
    flex: 1,
    padding: '12px 24px',
    border: '2px solid #8B4513',
    backgroundColor: 'white',
    color: '#8B4513',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  reviewBtn: {
    flex: 1,
    padding: '12px 24px',
    border: 'none',
    backgroundColor: '#27ae60',
    color: 'white',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  trackBtn: {
    flex: 1,
    padding: '12px 24px',
    border: 'none',
    backgroundColor: '#8B4513',
    color: 'white',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  emptyState: {
    textAlign: 'center',
    padding: '60px 20px',
    backgroundColor: 'white',
    borderRadius: '12px',
  },
  emptyText: {
    fontSize: '18px',
    color: '#7f8c8d',
    marginBottom: '20px',
  },
  shopButton: {
    padding: '14px 32px',
    backgroundColor: '#8B4513',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
};