import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Badge, Spinner } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import api from '../services/api';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await api.get('/api/products/');
      const products = response.data;
      
      // Make sure images have full URLs
      const processedProducts = products.map(product => ({
        ...product,
        image: product.image ? `http://127.0.0.1:8000${product.image}` : '/placeholder-image.jpg'
      }));
      
      // Get 3 random products for featured section
      const shuffled = [...processedProducts].sort(() => 0.5 - Math.random());
      setFeaturedProducts(shuffled.slice(0, 3));
    } catch (error) {
      console.error('Error fetching products:', error);
      // Fallback demo products
      setFeaturedProducts(getDemoProducts());
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: parseFloat(product.price),
      image: product.image,
      brand: product.brand,
      quantity: 1
    };
    
    addToCart(cartItem);
    
    // Show success notification
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-success position-fixed top-0 end-0 m-3';
    alertDiv.style.zIndex = '9999';
    alertDiv.innerHTML = `
      <strong>✅ Added to Cart!</strong><br>
      ${product.name}
    `;
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
      document.body.removeChild(alertDiv);
    }, 3000);
  };

  const categories = [
    { name: 'Lipsticks', icon: '💄', count: '50+ Products', color: '#ff6b8b' },
    { name: 'Foundations', icon: '👩', count: '30+ Products', color: '#ffccd5' },
    { name: 'Eyeliners', icon: '👁️', count: '40+ Products', color: '#6a11cb' },
    { name: 'Mascara', icon: '✨', count: '25+ Products', color: '#ff8c00' },
    { name: 'Blush', icon: '🍑', count: '20+ Products', color: '#ff6b6b' },
    { name: 'Skincare', icon: '🌸', count: '60+ Products', color: '#4cd964' }
  ];

  const features = [
    { icon: '🚚', title: 'Free Shipping', desc: 'Free delivery on orders above $50', color: '#ff6b8b' },
    { icon: '💳', title: 'Secure Payment', desc: '100% secure payment methods', color: '#6a11cb' },
    { icon: '↩️', title: 'Easy Returns', desc: '30-day return policy', color: '#4cd964' },
    { icon: '👑', title: 'Premium Quality', desc: 'Authentic branded products', color: '#ff8c00' }
  ];

  // Demo products fallback
  const getDemoProducts = () => [
    {
      id: 1,
      name: "Velvet Matte Red Lipstick",
      brand: "Maybelline",
      price: "14.99",
      description: "Long-lasting matte lipstick with intense red pigment. Transfer-proof formula.",
      category: { name: "Lipstick" },
      stock_quantity: 50,
      image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400"
    },
    {
      id: 2,
      name: "True Match Liquid Foundation",
      brand: "L'Oreal",
      price: "24.99",
      description: "Lightweight foundation with SPF 30. Perfect for all skin types.",
      category: { name: "Foundation" },
      stock_quantity: 35,
      image: "https://images.unsplash.com/photo-1556228578-9c360e1d8d34?w=400"
    },
    {
      id: 3,
      name: "Waterproof Eyeliner",
      brand: "Lakme",
      price: "8.99",
      description: "Precision liquid eyeliner. Perfect for winged looks.",
      category: { name: "Eyeliner" },
      stock_quantity: 100,
      image: "https://images.unsplash.com/photo-1596703923338-48f1c07e4f2e?w=400"
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="align-items-center min-vh-80">
            <Col lg={6} className="text-white">
              <div className="hero-content">
                <h1 className="display-4 fw-bold mb-4">
                  Discover Your Beauty With <span className="text-warning">Premium Makeup</span>
                </h1>
                <p className="lead mb-4 opacity-90">
                  Shop from our curated collection of high-quality makeup products. 
                  From vibrant lipsticks to flawless foundations, find your perfect match.
                </p>
                <div className="d-flex flex-wrap gap-3">
                  <Button 
                    as={Link} 
                    to="/products" 
                    size="lg" 
                    className="btn-primary px-5 py-3 rounded-pill shadow"
                  >
                    🛍️ Shop Now
                  </Button>
                  <Button 
                    as={Link} 
                    to="/products" 
                    variant="outline-light" 
                    size="lg"
                    className="px-5 py-3 rounded-pill"
                  >
                    👀 View Collection
                  </Button>
                </div>
                
                <div className="mt-5 pt-3">
                  <Row className="g-4">
                    <Col xs={6} md={3}>
                      <div className="text-center">
                        <h3 className="fw-bold text-warning">500+</h3>
                        <p className="mb-0 opacity-90">Happy Customers</p>
                      </div>
                    </Col>
                    <Col xs={6} md={3}>
                      <div className="text-center">
                        <h3 className="fw-bold text-warning">100+</h3>
                        <p className="mb-0 opacity-90">Premium Brands</p>
                      </div>
                    </Col>
                    <Col xs={6} md={3}>
                      <div className="text-center">
                        <h3 className="fw-bold text-warning">24/7</h3>
                        <p className="mb-0 opacity-90">Support</p>
                      </div>
                    </Col>
                    <Col xs={6} md={3}>
                      <div className="text-center">
                        <h3 className="fw-bold text-warning">Free</h3>
                        <p className="mb-0 opacity-90">Shipping</p>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
            
            <Col lg={6} className="d-none d-lg-block">
              <div className="position-relative">
                <div className="floating-product-card">
                  <img 
                    src="https://images.unsplash.com/photo-1586495777744-4413f21062fa" 
                    alt="Lipstick" 
                    className="img-fluid rounded-4 shadow-lg"
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Categories Section */}
      <section className="py-5">
        <Container>
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3 text-gradient-primary">Shop By Category</h2>
            <p className="text-muted lead">Explore our wide range of makeup categories</p>
          </div>
          
          <Row>
            {categories.map((category, index) => (
              <Col md={4} lg={2} key={index} className="mb-4">
                <Card 
                  className="text-center border-0 shadow-sm h-100 category-card hover-lift"
                  style={{ 
                    borderBottom: `4px solid ${category.color}`,
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Card.Body className="d-flex flex-column justify-content-center p-4">
                    <div 
                      className="category-icon mb-3 rounded-circle p-3 mx-auto"
                      style={{ 
                        fontSize: '2rem',
                        backgroundColor: `${category.color}20`,
                        color: category.color,
                        width: '70px',
                        height: '70px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {category.icon}
                    </div>
                    <Card.Title className="fw-bold mb-2">{category.name}</Card.Title>
                    <Card.Text className="text-muted small">{category.count}</Card.Text>
                    <Button 
                      as={Link} 
                      to={`/products?category=${category.name}`}
                      variant="outline-primary" 
                      size="sm" 
                      className="mt-3"
                      style={{ borderColor: category.color, color: category.color }}
                    >
                      Browse
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Featured Products Section - UPDATED */}
      <section className="py-5 bg-gradient-light">
        <Container>
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3 text-gradient-primary">✨ Featured Products</h2>
            <p className="text-muted lead">Our best-selling makeup products loved by customers</p>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-3">Loading featured products...</p>
            </div>
          ) : (
            <Row className="g-4">
              {featuredProducts.map(product => {
                const stockStatus = product.stock_quantity > 10 ? 'In Stock' : 
                                   product.stock_quantity > 0 ? `Low Stock (${product.stock_quantity} left)` : 
                                   'Out of Stock';
                const stockColor = product.stock_quantity > 10 ? 'success' : 
                                  product.stock_quantity > 0 ? 'warning' : 'danger';
                
                return (
                  <Col lg={4} md={6} key={product.id}>
                    <Card className="h-100 product-card shadow border-0 hover-lift">
                      <div className="position-relative overflow-hidden rounded-top" style={{ height: '250px' }}>
                        <Card.Img 
                          variant="top" 
                          src={product.image}
                          className="w-100 h-100"
                          style={{ objectFit: 'cover' }}
                          alt={product.name}
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400';
                          }}
                        />
                        <div className="position-absolute top-0 end-0 m-2">
                          <Badge bg="success" className="px-3 py-2">
                            ${parseFloat(product.price).toFixed(2)}
                          </Badge>
                        </div>
                        {product.category?.name && (
                          <div className="position-absolute top-0 start-0 m-2">
                            <Badge bg="light" text="dark" className="px-3 py-2">
                              {product.category.name}
                            </Badge>
                          </div>
                        )}
                      </div>
                      
                      <Card.Body className="d-flex flex-column p-4">
                        <div className="mb-2">
                          <span className="text-muted small">{product.brand || 'Premium Brand'}</span>
                        </div>
                        
                        <Card.Title className="h5 mb-2 product-title">
                          <Link 
                            to={`/product/${product.id}`} 
                            className="text-decoration-none text-dark"
                          >
                            {product.name}
                          </Link>
                        </Card.Title>
                        
                        <Card.Text className="text-muted small mb-3 flex-grow-1">
                          {product.description?.substring(0, 90) || 'High-quality makeup product for everyday use'}...
                        </Card.Text>
                        
                        <div className="mt-auto">
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <div>
                              <span className="fw-bold text-primary fs-4">
                                ${parseFloat(product.price).toFixed(2)}
                              </span>
                              <br />
                              <small className={`text-${stockColor} fw-semibold`}>
                                {stockStatus}
                              </small>
                            </div>
                            
                            <div className="text-end">
                              <span className="text-warning small">
                                ⭐⭐⭐⭐⭐
                              </span>
                              <br />
                              <small className="text-muted">(4.8/5)</small>
                            </div>
                          </div>
                          
                          <div className="d-grid gap-2">
                            <Button 
                              variant={product.stock_quantity === 0 ? "secondary" : "primary"}
                              className="w-100 py-2"
                              onClick={() => handleAddToCart(product)}
                              disabled={product.stock_quantity === 0}
                            >
                              {product.stock_quantity === 0 ? '❌ Out of Stock' : '🛒 Add to Cart'}
                            </Button>
                            
                            <Button 
                              variant="outline-primary" 
                              className="w-100 py-2"
                              as={Link}
                              to={`/product/${product.id}`}
                            >
                              👁️ Quick View
                            </Button>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          )}
          
          <div className="text-center mt-5">
            <Button 
              as={Link} 
              to="/products" 
              variant="primary" 
              size="lg"
              className="px-5 py-3 rounded-pill shadow"
            >
              View All Products →
            </Button>
          </div>
        </Container>
      </section>

      {/* Features Section - UPDATED */}
      <section className="py-5">
        <Container>
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3 text-gradient-primary">Why Choose Us</h2>
            <p className="text-muted lead">We provide the best shopping experience for makeup lovers</p>
          </div>
          
          <Row className="g-4">
            {features.map((feature, index) => (
              <Col lg={3} md={6} key={index}>
                <Card className="border-0 text-center h-100 hover-lift shadow-sm">
                  <Card.Body className="p-4">
                    <div 
                      className="feature-icon mb-4 rounded-circle mx-auto d-flex align-items-center justify-content-center"
                      style={{ 
                        width: '80px', 
                        height: '80px',
                        backgroundColor: `${feature.color}20`,
                        color: feature.color,
                        fontSize: '2rem'
                      }}
                    >
                      {feature.icon}
                    </div>
                    <Card.Title className="h5 mb-3">{feature.title}</Card.Title>
                    <Card.Text className="text-muted">
                      {feature.desc}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-gradient-primary text-white">
        <Container>
          <Row className="align-items-center">
            <Col lg={8}>
              <h2 className="display-6 fw-bold mb-3">Ready to Enhance Your Beauty?</h2>
              <p className="lead opacity-90">
                Join thousands of satisfied customers who trust us for their makeup needs.
                Get 10% off on your first order!
              </p>
            </Col>
            <Col lg={4} className="text-lg-end">
              <Button 
                as={Link} 
                to="/products" 
                variant="light" 
                size="lg"
                className="px-5 py-3 rounded-pill fw-bold"
              >
                Start Shopping Now
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home;