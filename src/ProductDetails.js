import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Import product images (use the same imports as Buyer Dashboard)
import product1 from './assets/product1.jpg.jpeg';
import product2 from './assets/product2.jpg.jpeg';
import product3 from './assets/product3.jpg.jpeg';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Mock products data (should match Buyer Dashboard products)
  const allProducts = [
    { id: 1, name: 'Vintage Leather Chair', price: 150, category: 'Furniture', img: product1, description: 'Beautiful vintage leather chair in excellent condition. Perfect for your living room or office.' },
    { id: 2, name: 'Used iPhone 12', price: 300, category: 'Electronics', img: product2, description: 'Gently used iPhone 12 with 128GB storage. Comes with original charger and case.' },
    { id: 3, name: 'Wooden Coffee Table', price: 80, category: 'Furniture', img: product3, description: 'Solid wood coffee table with modern design. Great for any living space.' },
  ];

  // Find product by id
  const product = allProducts.find(p => p.id === parseInt(id)) || allProducts[0];

  // Multiple images for gallery (using same image for demo)
  const images = [product.img, product.img, product.img, product.img];

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
    alert(`Added ${quantity} "${product.name}" to cart!`);
  };

  const handleBuyNow = () => {
    alert(`Proceeding to checkout with ${quantity} "${product.name}"`);
    // Could navigate to checkout page
    // navigate('/checkout');
  };

  return (
    <div style={styles.container}>
      {/* Header matching Buyer Dashboard */}
      <header style={styles.header}>
        <h1 style={styles.logo}>ReValue</h1>
        <button style={styles.backButton} onClick={() => navigate('/buyer')}>
          ← Back to Dashboard
        </button>
      </header>

      <div style={styles.content}>
        {/* Left side - Images */}
        <div style={styles.imageSection}>
          <div style={styles.mainImage}>
            <img 
              src={images[selectedImage]} 
              alt={product.name}
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
          <div style={styles.categoryBadge}>{product.category}</div>
          
          <h1 style={styles.productTitle}>{product.name}</h1>
          
          <div style={styles.rating}>
            <span style={styles.stars}>★★★★☆</span>
            <span style={styles.ratingText}>(4.0 - 128 reviews)</span>
          </div>

          <div style={styles.price}>${product.price}</div>

          <div style={styles.stockBadge}>✓ In Stock</div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Description</h3>
            <p style={styles.description}>{product.description}</p>
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Key Features</h3>
            <ul style={styles.featuresList}>
              {features.map((feature, index) => (
                <li key={index} style={styles.featureItem}>
                  {feature}
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
            >
              Add to Cart
            </button>
            <button 
              style={styles.buyNowButton}
              onClick={handleBuyNow}
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