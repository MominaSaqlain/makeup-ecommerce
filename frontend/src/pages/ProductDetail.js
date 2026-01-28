// src/pages/ProductDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Container, Row, Col, Card, Button, Badge, Spinner, Alert, Form } from 'react-bootstrap';
import api from '../services/api';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await api.get(`/api/products/${id}/`);
      const productData = response.data;
      
      // Process image URL
      const processedProduct = {
        ...productData,
        image: productData.image 
          ? `http://127.0.0.1:8000${productData.image}` 
          : 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500'
      };
      
      setProduct(processedProduct);
    } catch (error) {
      console.error('Error fetching product details:', error);
      setError('Failed to load product details. Please try again.');
      // Fallback to demo product
      setProduct(getDemoProduct(id));
    } finally {
      setLoading(false);
    }
  };

  // Demo product fallback
  const getDemoProduct = (productId) => {
    const demoProducts = {
      1: {
        id: 1,
        name: "Velvet Matte Red Lipstick",
        brand: "Maybelline",
        price: "14.99",
        description: "Long-lasting matte lipstick with intense red pigment. Transfer-proof formula stays for 12 hours.",
        category: { name: "Lipstick" },
        stock_quantity: 50,
        image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w-500"
      },
      2: {
        id: 2,
        name: "True Match Liquid Foundation",
        brand: "L'Oreal",
        price: "24.99",
        description: "Lightweight liquid foundation with SPF 30. Oil-free formula for all skin types.",
        category: { name: "Foundation" },
        stock_quantity: 35,
        image: "https://images.unsplash.com/photo-1556228578-9c360e1d8d34?w-500"
      },
      3: {
        id: 3,
        name: "Precision Liquid Eyeliner",
        brand: "Lakme",
        price: "8.99",
        description: "Waterproof liquid eyeliner with fine tip. Perfect for winged eyeliner looks.",
        category: { name: "Eyeliner" },
        stock_quantity: 100,
        image: "https://images.unsplash.com/photo-1596703923338-48f1c07e4f2e?w-500"
      }
    };
    
    return demoProducts[productId] || null;
  };

  const handleAddToCart = () => {
    if (product) {
      const cartItem = {
        id: product.id,
        name: product.name,
        price: parseFloat(product.price),
        image: product.image,
        brand: product.brand,
        quantity: quantity
      };
      
      addToCart(cartItem);
      
      // Show success message
      const alertDiv = document.createElement('div');
      alertDiv.className = 'alert alert-success position-fixed top-0 end-0 m-3';
      alertDiv.style.zIndex = '9999';
      alertDiv.innerHTML = `
        <strong>✅ Added to Cart!</strong><br>
        ${quantity} x ${product.name}
      `;
      document.body.appendChild(alertDiv);
      
      setTimeout(() => {
        document.body.removeChild(alertDiv);
      }, 3000);
    }
  };

  const stockStatus = product?.stock_quantity > 10 ? 'success' : 
                     product?.stock_quantity > 0 ? 'warning' : 'danger';

  if (loading) {
    return (
      <Container className="py-5 text-center" style={{ minHeight: '60vh' }}>
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading product details...</p>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="py-5">
        <Alert variant="warning">
          <Alert.Heading>Product Not Found</Alert.Heading>
          <p>The product you're looking for doesn't exist or has been removed.</p>
          <Button variant="primary" onClick={() => navigate('/products')}>
            Browse Products
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      {/* Back Button */}
      <Button 
        variant="outline-secondary" 
        onClick={() => navigate(-1)}
        className="mb-4"
      >
        ← Back to Products
      </Button>

      {/* Error Alert */}
      {error && (
        <Alert variant="warning" className="mb-4">
          <Alert.Heading>⚠️ Connection Issue</Alert.Heading>
          <p>{error}</p>
          <p className="mb-0 small">Showing demo product data</p>
        </Alert>
      )}

      <Row>
        {/* Product Image Section */}
        <Col lg={6} className="mb-4">
          <Card className="shadow-sm border-0">
            <Card.Body className="p-4 text-center">
              <div className="position-relative" style={{ height: '400px' }}>
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="img-fluid rounded"
                  style={{ 
                    maxHeight: '100%', 
                    width: 'auto',
                    objectFit: 'contain' 
                  }}
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w-500';
                  }}
                />
              </div>
              
              {/* Image Thumbnails (Optional) */}
              <div className="d-flex justify-content-center mt-3 gap-2">
                <img 
                  src={product.image} 
                  alt="Thumbnail 1"
                  className="img-thumbnail"
                  style={{ width: '60px', height: '60px', cursor: 'pointer' }}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Product Details Section */}
        <Col lg={6}>
          <Card className="shadow-sm border-0 h-100">
            <Card.Body className="p-4">
              {/* Category Badge */}
              <div className="mb-3">
                <Badge bg="light" text="dark" className="px-3 py-2">
                  {product.category?.name || 'Makeup'}
                </Badge>
              </div>

              {/* Product Name */}
              <h1 className="h2 fw-bold mb-3">{product.name}</h1>

              {/* Brand & Rating */}
              <div className="d-flex align-items-center mb-3">
                <span className="text-muted me-3">
                  by <strong>{product.brand || 'Premium Brand'}</strong>
                </span>
                <div className="d-flex align-items-center">
                  <span className="text-warning me-1">★★★★★</span>
                  <span className="text-muted">(4.5)</span>
                </div>
              </div>

              {/* Price */}
              <h2 className="h1 text-primary mb-4">
                ${parseFloat(product.price).toFixed(2)}
              </h2>

              {/* Stock Status */}
              <div className="mb-4">
                <Badge 
                  bg={stockStatus} 
                  className="px-3 py-2"
                >
                  {product.stock_quantity > 10 ? '✅ In Stock' : 
                   product.stock_quantity > 0 ? `⚠️ Low Stock (${product.stock_quantity} left)` : 
                   '❌ Out of Stock'}
                </Badge>
              </div>

              {/* Description */}
              <div className="mb-4">
                <h5 className="fw-bold mb-2">Description</h5>
                <p className="lead" style={{ lineHeight: '1.8' }}>
                  {product.description || 'Premium quality makeup product for professional results.'}
                </p>
              </div>

              {/* Quantity Selector */}
              <div className="mb-4">
                <h5 className="fw-bold mb-3">Quantity</h5>
                <div className="d-flex align-items-center" style={{ width: '150px' }}>
                  <Button 
                    variant="outline-secondary" 
                    className="rounded-circle"
                    style={{ width: '40px', height: '40px' }}
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  
                  <Form.Control
                    type="number"
                    value={quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (val >= 1 && val <= product.stock_quantity) {
                        setQuantity(val);
                      }
                    }}
                    min="1"
                    max={product.stock_quantity}
                    className="mx-2 text-center"
                    style={{ width: '60px' }}
                  />
                  
                  <Button 
                    variant="outline-secondary" 
                    className="rounded-circle"
                    style={{ width: '40px', height: '40px' }}
                    onClick={() => setQuantity(prev => prev + 1)}
                    disabled={quantity >= product.stock_quantity}
                  >
                    +
                  </Button>
                </div>
                <small className="text-muted mt-2 d-block">
                  Maximum: {product.stock_quantity} units available
                </small>
              </div>

              {/* Add to Cart Button */}
              <Button 
                variant={product.stock_quantity === 0 ? "secondary" : "primary"}
                size="lg"
                className="w-100 py-3 mb-3"
                onClick={handleAddToCart}
                disabled={product.stock_quantity === 0}
              >
                {product.stock_quantity === 0 ? (
                  'Out of Stock'
                ) : (
                  <>
                    <span className="fs-5">🛒 Add to Cart</span>
                    <br />
                    <small>Total: ${(parseFloat(product.price) * quantity).toFixed(2)}</small>
                  </>
                )}
              </Button>

              {/* Product Features */}
              <div className="mt-4 pt-3 border-top">
                <h5 className="fw-bold mb-3">Product Features</h5>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Long-lasting formula
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Waterproof & smudge-proof
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Cruelty-free & vegan
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Dermatologist tested
                  </li>
                </ul>
              </div>

              {/* Additional Info */}
              <div className="row mt-4 pt-3 border-top">
                <Col md={6} className="mb-3">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-truck fs-4 text-primary me-3"></i>
                    <div>
                      <small className="d-block fw-bold">Free Shipping</small>
                      <small className="text-muted">On orders over $50</small>
                    </div>
                  </div>
                </Col>
                <Col md={6} className="mb-3">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-arrow-counterclockwise fs-4 text-primary me-3"></i>
                    <div>
                      <small className="d-block fw-bold">30-Day Returns</small>
                      <small className="text-muted">Easy return policy</small>
                    </div>
                  </div>
                </Col>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Related Products Section */}
      <div className="mt-5 pt-5">
        <h3 className="mb-4">You May Also Like</h3>
        <Row>
          <Col md={4} className="mb-4">
            <Card className="h-100 border-0 shadow-sm hover-lift">
              <Card.Body className="text-center p-4">
                <div className="mb-3">
                  <i className="bi bi-lipstick fs-1 text-primary"></i>
                </div>
                <h5>Lip Gloss Set</h5>
                <p className="text-muted small">Shiny finish gloss collection</p>
                <Badge bg="light" text="dark" className="mt-2">
                  $19.99
                </Badge>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 border-0 shadow-sm hover-lift">
              <Card.Body className="text-center p-4">
                <div className="mb-3">
                  <i className="bi bi-eyedropper fs-1 text-primary"></i>
                </div>
                <h5>Liquid Eyeliner</h5>
                <p className="text-muted small">Precision tip for perfect lines</p>
                <Badge bg="light" text="dark" className="mt-2">
                  $12.99
                </Badge>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 border-0 shadow-sm hover-lift">
              <Card.Body className="text-center p-4">
                <div className="mb-3">
                  <i className="bi bi-gem fs-1 text-primary"></i>
                </div>
                <h5>Face Highlighter</h5>
                <p className="text-muted small">Glowing shimmer for cheekbones</p>
                <Badge bg="light" text="dark" className="mt-2">
                  $24.99
                </Badge>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default ProductDetail;