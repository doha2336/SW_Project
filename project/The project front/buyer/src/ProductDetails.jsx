import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Import product images (use the same imports as Buyer Dashboard)
import product1 from './assets/product1.jpg.jpeg';
import product2 from './assets/product2.jpg.jpeg';
import product3 from './assets/product3.jpg.jpeg';
import product4 from './assets/product4.jpg.jpeg';
import product5 from './assets/product5.jpg.jpeg';
import product6 from './assets/product6.jpeg';
import product7 from './assets/product7.jpg.jpeg';
import product8 from './assets/product8.jpg.jpeg';
import product9 from './assets/product9.jpg.jpeg';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Fetch product data from API
  const [product, setProduct] = useState(null);
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await import('@seller/Services/api').then(m => m.apiService.getListing(id));
        if (mounted) setProduct(data);
      } catch (e) {
        console.error('Failed to load product', e);
      }
    })();
    return () => { mounted = false };
  }, [id]);

  // Fallback if product not yet loaded
  const fallback = { id: 0, name: 'Loading...', price: 0, category: 'Uncategorized', description: '' };
  const current = product || fallback;
  const images = [product ? product.image || product.id : product1, product1, product2, product3, product4, product5, product6, product7, product8, product9];

  const features = [
    'High quality materials',
    'Excellent condition',
    'Fast delivery available',
    'Secure payment',
    'Return policy included',
  ];

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if product already exists in cart
    const existingItemIndex = existingCart.findIndex(item => item.id === current.id);
    
    if (existingItemIndex !== -1) {
      // Product exists, update quantity
      existingCart[existingItemIndex].quantity += quantity;
    } else {
      // Add new product to cart
      existingCart.push({
        id: current.id,
        name: current.name,
        price: current.price,
        img: current.image || current.id,
        category: current.category,
        quantity: quantity
      });
    }
    
    // Save back to localStorage
    localStorage.setItem('cart', JSON.stringify(existingCart));
    
    // Show success message and option to view cart
    const viewCart = window.confirm(`✅ Added ${quantity} "${current.name}" to cart!\n\nView cart now?`);
    if (viewCart) {
      navigate('/cart');
    }
  };

  const handleBuyNow = () => {
    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if product already exists in cart
    const existingItemIndex = existingCart.findIndex(item => item.id === current.id);
    
    if (existingItemIndex !== -1) {
      // Product exists, update quantity
      existingCart[existingItemIndex].quantity += quantity;
    } else {
      // Add new product to cart
      existingCart.push({
        id: current.id,
        name: current.name,
        price: current.price,
        img: current.image || current.id,
        category: current.category,
        quantity: quantity
      });
    }
    
    // Save back to localStorage
    localStorage.setItem('cart', JSON.stringify(existingCart));
    
    // Navigate directly to cart for checkout
    navigate('/cart');
  };

  return (
    <div style={styles.container}>
      {/* Header matching Buyer Dashboard */}
      <header style={styles.header}>
        <h1 style={styles.logo}>ReValue</h1>
        <div style={styles.headerButtons}>
          <button 
            style={styles.cartButton} 
            onClick={() => navigate('/cart')}
          >
            🛒 Cart
            {(() => {
              const cart = JSON.parse(localStorage.getItem('cart')) || [];
              const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
              return itemCount > 0 ? (
                <span style={styles.cartBadge}>{itemCount}</span>
              ) : null;
            })()}
          </button>
          <button style={styles.backButton} onClick={() => navigate('/buyer')}>
            ← Back to Dashboard
          </button>
        </div>
      </header>

      <div style={styles.content}>
        {/* Left side - Images */}
        <div style={styles.imageSection}>
          <div style={styles.mainImage}>
            <img 
              src={images[selectedImage]} 
              alt={current.name}
              style={styles.mainImageImg}
            />
          </div>
          <div style={styles.thumbnails}>
            {images.map((img, index) => (
              <div
                key={index}
                style={{
                  ...styles.thumbnail,
                  ...(selectedImage === index ? styles.thumbnailActive : {})
                }}
                onClick={() => setSelectedImage(index)}
              >
                <img src={img} alt={`View ${index + 1}`} style={styles.thumbnailImg} />
              </div>
            ))}
          </div>
        </div>

        {/* Right side - Product Info */}
        <div style={styles.infoSection}>
          <div style={styles.categoryBadge}>{current.category}</div>
          
          <h1 style={styles.productTitle}>{current.name}</h1>
          
          <div style={styles.rating}>
            <span style={styles.stars}>★★★★☆</span>
            <span style={styles.ratingText}>(4.0 - 128 reviews)</span>
          </div>

          <div style={styles.price}>${current.price}</div>

          <div style={styles.stockBadge}>{current.stock ? `✓ ${current.stock} In Stock` : '✓ In Stock'}</div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Description</h3>
            <p style={styles.description}>{current.description}</p>
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Key Features</h3>
            <ul style={styles.featuresList}>
              {features.map((feature, index) => (
                <li key={index} style={styles.featureItem}>
                  ✓ {feature}
                </li>
              ))}
            </ul>
          </div>

          <div style={styles.quantitySection}>
            <label style={styles.quantityLabel}>Quantity:</label>
            <div style={styles.quantityControls}>
              <button 
                style={styles.quantityButton}
                onClick={() => handleQuantityChange(-1)}
              >
                −
              </button>
              <span style={styles.quantityDisplay}>{quantity}</span>
              <button 
                style={styles.quantityButton}
                onClick={() => handleQuantityChange(1)}
              >
                +
              </button>
            </div>
          </div>

          <div style={styles.actions}>
            <button 
              style={styles.addToCartButton}
              onClick={handleAddToCart}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#8B4513';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.color = '#8B4513';
              }}
            >
              Add to Cart
            </button>
            <button 
              style={styles.buyNowButton}
              onClick={handleBuyNow}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(139, 69, 19, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Buy Now →
            </button>
          </div>
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
  headerButtons: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
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
    maxWidth: '1200px',
    margin: '40px auto',
    padding: '0 20px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '40px',
  },
  imageSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  mainImage: {
    width: '100%',
    aspectRatio: '1',
    backgroundColor: '#ecf0f1',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  mainImageImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  thumbnails: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '12px',
  },
  thumbnail: {
    aspectRatio: '1',
    borderRadius: '8px',
    overflow: 'hidden',
    cursor: 'pointer',
    border: '3px solid transparent',
    transition: 'all 0.2s',
  },
  thumbnailActive: {
    border: '3px solid #8B4513',
  },
  thumbnailImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  infoSection: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  categoryBadge: {
    display: 'inline-block',
    backgroundColor: 'rgba(139,69,19,0.1)',
    color: '#8B4513',
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: 600,
    marginBottom: '16px',
  },
  productTitle: {
    fontSize: '32px',
    fontWeight: 700,
    color: '#2c3e50',
    margin: '0 0 16px 0',
  },
  rating: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '20px',
  },
  stars: {
    color: '#f39c12',
    fontSize: '20px',
    letterSpacing: '2px',
  },
  ratingText: {
    color: '#7f8c8d',
    fontSize: '14px',
  },
  price: {
    fontSize: '36px',
    fontWeight: 700,
    color: '#27ae60',
    marginBottom: '16px',
  },
  stockBadge: {
    display: 'inline-block',
    backgroundColor: '#d4edda',
    color: '#155724',
    padding: '10px 16px',
    borderRadius: '8px',
    fontWeight: 600,
    marginBottom: '24px',
  },
  section: {
    marginBottom: '24px',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#2c3e50',
    marginBottom: '12px',
  },
  description: {
    color: '#7f8c8d',
    lineHeight: '1.6',
    fontSize: '16px',
  },
  featuresList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  featureItem: {
    padding: '10px 0',
    color: '#7f8c8d',
    borderBottom: '1px solid #ecf0f1',
    fontSize: '16px',
  },
  quantitySection: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '24px',
    paddingTop: '16px',
  },
  quantityLabel: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#2c3e50',
  },
  quantityControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    backgroundColor: '#f1f3f4',
    padding: '8px 12px',
    borderRadius: '8px',
  },
  quantityButton: {
    width: '32px',
    height: '32px',
    border: 'none',
    backgroundColor: 'white',
    borderRadius: '6px',
    fontSize: '18px',
    fontWeight: 600,
    cursor: 'pointer',
    color: '#2c3e50',
    transition: 'all 0.2s',
  },
  quantityDisplay: {
    minWidth: '40px',
    textAlign: 'center',
    fontWeight: 600,
    fontSize: '18px',
    color: '#2c3e50',
  },
  actions: {
    display: 'flex',
    gap: '12px',
  },
  addToCartButton: {
    flex: 1,
    padding: '16px',
    border: '2px solid #8B4513',
    backgroundColor: 'white',
    color: '#8B4513',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  buyNowButton: {
    flex: 1,
    padding: '16px',
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