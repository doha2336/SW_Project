import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PurchaseNotifications() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all'); // all, unread, orders, messages

  // Load notifications from localStorage
  useEffect(() => {
    const savedNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
    setNotifications(savedNotifications);
  }, []);

  // Sample notifications data structure
  // In real app, these would come from backend
  useEffect(() => {
    const sampleNotifications = [
      {
        id: 1,
        type: 'order',
        title: 'Order Shipped',
        message: 'Your order #12345 (Vintage Leather Chair) has been shipped!',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        read: false,
        icon: '📦'
      },
      {
        id: 2,
        type: 'order',
        title: 'Order Delivered',
        message: 'Your order #12340 (Used iPhone 12) has been delivered.',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
        read: true,
        icon: '✅'
      },
      {
        id: 3,
        type: 'message',
        title: 'New Message from Seller',
        message: 'The seller has responded to your question about the Wooden Coffee Table.',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
        read: false,
        icon: '💬'
      },
      {
        id: 4,
        type: 'promotion',
        title: 'Special Offer',
        message: 'Get 20% off on all electronics this weekend!',
        timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(), // 2 days ago
        read: true,
        icon: '🎉'
      },
      {
        id: 5,
        type: 'order',
        title: 'Order Confirmed',
        message: 'Your order #12346 has been confirmed and is being processed.',
        timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
        read: false,
        icon: '✓'
      }
    ];

    // Only set if no notifications exist
    const existing = JSON.parse(localStorage.getItem('notifications'));
    if (!existing || existing.length === 0) {
      localStorage.setItem('notifications', JSON.stringify(sampleNotifications));
      setNotifications(sampleNotifications);
    }
  }, []);

  const markAsRead = (id) => {
    const updated = notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    );
    setNotifications(updated);
    localStorage.setItem('notifications', JSON.stringify(updated));
  };

  const markAllAsRead = () => {
    const updated = notifications.map(notif => ({ ...notif, read: true }));
    setNotifications(updated);
    localStorage.setItem('notifications', JSON.stringify(updated));
  };

  const deleteNotification = (id) => {
    const updated = notifications.filter(notif => notif.id !== id);
    setNotifications(updated);
    localStorage.setItem('notifications', JSON.stringify(updated));
  };

  const clearAll = () => {
    if (window.confirm('Are you sure you want to clear all notifications?')) {
      setNotifications([]);
      localStorage.setItem('notifications', JSON.stringify([]));
    }
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diff = Math.floor((now - time) / 1000); // difference in seconds

    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`;
    return time.toLocaleDateString();
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notif.read;
    if (filter === 'orders') return notif.type === 'order';
    if (filter === 'messages') return notif.type === 'message';
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

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
        {/* Title and Actions */}
        <div style={styles.titleRow}>
          <div>
            <h2 style={styles.title}>Notifications</h2>
            {unreadCount > 0 && (
              <span style={styles.unreadBadge}>{unreadCount} unread</span>
            )}
          </div>
          <div style={styles.actions}>
            {unreadCount > 0 && (
              <button style={styles.actionButton} onClick={markAllAsRead}>
                Mark all as read
              </button>
            )}
            {notifications.length > 0 && (
              <button style={styles.clearButton} onClick={clearAll}>
                Clear all
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div style={styles.filters}>
          <button
            style={{
              ...styles.filterButton,
              ...(filter === 'all' ? styles.filterButtonActive : {})
            }}
            onClick={() => setFilter('all')}
          >
            All ({notifications.length})
          </button>
          <button
            style={{
              ...styles.filterButton,
              ...(filter === 'unread' ? styles.filterButtonActive : {})
            }}
            onClick={() => setFilter('unread')}
          >
            Unread ({unreadCount})
          </button>
          <button
            style={{
              ...styles.filterButton,
              ...(filter === 'orders' ? styles.filterButtonActive : {})
            }}
            onClick={() => setFilter('orders')}
          >
            Orders ({notifications.filter(n => n.type === 'order').length})
          </button>
          <button
            style={{
              ...styles.filterButton,
              ...(filter === 'messages' ? styles.filterButtonActive : {})
            }}
            onClick={() => setFilter('messages')}
          >
            Messages ({notifications.filter(n => n.type === 'message').length})
          </button>
        </div>

        {/* Notifications List */}
        {filteredNotifications.length === 0 ? (
          <div style={styles.emptyState}>
            <p style={styles.emptyIcon}>🔔</p>
            <p style={styles.emptyText}>No notifications</p>
            <p style={styles.emptySubtext}>
              {filter === 'all' 
                ? "You're all caught up!"
                : `No ${filter} notifications`}
            </p>
          </div>
        ) : (
          <div style={styles.notificationsList}>
            {filteredNotifications.map((notif) => (
              <div
                key={notif.id}
                style={{
                  ...styles.notificationCard,
                  ...(notif.read ? {} : styles.notificationUnread)
                }}
                onClick={() => !notif.read && markAsRead(notif.id)}
              >
                <div style={styles.notifIcon}>{notif.icon}</div>
                <div style={styles.notifContent}>
                  <div style={styles.notifHeader}>
                    <h3 style={styles.notifTitle}>{notif.title}</h3>
                    {!notif.read && <span style={styles.newBadge}>NEW</span>}
                  </div>
                  <p style={styles.notifMessage}>{notif.message}</p>
                  <p style={styles.notifTime}>{getTimeAgo(notif.timestamp)}</p>
                </div>
                <button
                  style={styles.deleteButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNotification(notif.id);
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#e74c3c';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#95a5a6';
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
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
    background: 'none',
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
    maxWidth: '900px',
    margin: '40px auto',
    padding: '0 20px',
  },
  titleRow: {
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
  unreadBadge: {
    display: 'inline-block',
    backgroundColor: '#e74c3c',
    color: 'white',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: 600,
  },
  actions: {
    display: 'flex',
    gap: '12px',
  },
  actionButton: {
    padding: '10px 20px',
    backgroundColor: 'white',
    color: '#8B4513',
    border: '2px solid #8B4513',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  clearButton: {
    padding: '10px 20px',
    backgroundColor: '#fee',
    color: '#e74c3c',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  filters: {
    display: 'flex',
    gap: '12px',
    marginBottom: '30px',
    flexWrap: 'wrap',
  },
  filterButton: {
    padding: '10px 20px',
    borderRadius: '20px',
    backgroundColor: '#e9ecef',
    border: 'none',
    fontSize: '14px',
    fontWeight: 500,
    color: '#495057',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  filterButtonActive: {
    backgroundColor: '#8B4513',
    color: 'white',
  },
  notificationsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  notificationCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    display: 'flex',
    gap: '16px',
    alignItems: 'flex-start',
    cursor: 'pointer',
    transition: 'all 0.2s',
    position: 'relative',
  },
  notificationUnread: {
    borderLeft: '4px solid #8B4513',
    backgroundColor: '#fffbf5',
  },
  notifIcon: {
    fontSize: '32px',
    flexShrink: 0,
  },
  notifContent: {
    flex: 1,
  },
  notifHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '8px',
  },
  notifTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#2c3e50',
    margin: 0,
  },
  newBadge: {
    backgroundColor: '#e74c3c',
    color: 'white',
    padding: '2px 8px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: 700,
  },
  notifMessage: {
    fontSize: '16px',
    color: '#7f8c8d',
    margin: '0 0 8px 0',
    lineHeight: '1.5',
  },
  notifTime: {
    fontSize: '14px',
    color: '#95a5a6',
    margin: 0,
  },
  deleteButton: {
    background: 'none',
    border: 'none',
    color: '#95a5a6',
    fontSize: '20px',
    cursor: 'pointer',
    padding: '4px',
    transition: 'all 0.2s',
  },
  emptyState: {
    textAlign: 'center',
    padding: '60px 20px',
    backgroundColor: 'white',
    borderRadius: '12px',
  },
  emptyIcon: {
    fontSize: '64px',
    margin: '0 0 20px 0',
  },
  emptyText: {
    fontSize: '24px',
    fontWeight: 600,
    color: '#2c3e50',
    margin: '0 0 8px 0',
  },
  emptySubtext: {
    fontSize: '16px',
    color: '#7f8c8d',
    margin: 0,
  },
};