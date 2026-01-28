import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Spinner, Badge, Alert } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import api from '../services/api';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, selectedCategory, searchTerm]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await api.get('/api/products/');
      const productsData = response.data;
      
      // Make sure images have full URL
      const processedProducts = productsData.map(product => ({
        ...product,
        image: product.image ? `http://127.0.0.1:8000${product.image}` : '/placeholder-image.jpg'
      }));
      
      setProducts(processedProducts);
      setFilteredProducts(processedProducts);
      
      // Extract unique categories from products
      const uniqueCategories = [...new Set(productsData
        .map(p => p.category?.name)
        .filter(Boolean))];
      setCategories(['All', ...uniqueCategories]);
      
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to load products. Using demo products instead.');
      
      // Use extended demo products that match your screenshot
      const demoProducts = getDemoProducts();
      setProducts(demoProducts);
      setFilteredProducts(demoProducts);
      setCategories(['All', 'Lipstick', 'Foundation', 'Eyeliner', 'Mascara', 'Blush']);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = products;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => 
        product.category?.name === selectedCategory
      );
    }

    if (searchTerm.trim()) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (product.brand && product.brand.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredProducts(filtered);
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
    
    // Show success message
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

  // Extended demo products to match your screenshot
  const getDemoProducts = () => [
    {
      id: 1,
      name: "Matte Red Lipstick",
      brand: "Maybelline",
      price: "12.99",
      description: "Long-lasting matte finish lipstick with vibrant red color. Perfect for all occasions.",
      category: { name: "Lipstick" },
      stock_quantity: 50,
      image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400"
    },
    {
      id: 2,
      name: "Foundation Makeup",
      brand: "L'Oreal",
      price: "24.99",
      description: "Full coverage foundation for flawless skin all day long.",
      category: { name: "Foundation" },
      stock_quantity: 35,
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400"
    },
    {
      id: 3,
      name: "Eye Shadow Palette",
      brand: "Huda Beauty",
      price: "45.99",
      description: "Professional eyeshadow palette with 18 vibrant colors.",
      category: { name: "Eye Makeup" },
      stock_quantity: 25,
      image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=400"
    },
    {
      id: 4,
      name: "Mascara Volume",
      brand: "Maybelline",
      price: "9.99",
      description: "Volumizing mascara for dramatic lashes.",
      category: { name: "Mascara" },
      stock_quantity: 100,
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400"
    },
    {
      id: 5,
      name: "Blush Compact",
      brand: "NARS",
      price: "32.99",
      description: "Silky blush for a natural rosy glow.",
      category: { name: "Blush" },
      stock_quantity: 40,
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400"
    },
    {
      id: 6,
      name: "Makeup Brush Set",
      brand: "Real Techniques",
      price: "29.99",
      description: "Professional makeup brush set for perfect application.",
      category: { name: "Tools" },
      stock_quantity: 60,
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&q=60"
    }
  ];

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSearchTerm('');
  };

  // Add this function to fix the image URL for demo products
  const getProductImage = (product) => {
    if (product.image) {
      return product.image;
    }
    
    // Default images based on category
    const defaultImages = {
      'Lipstick': 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400',
      'Foundation': 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400',
      'Eye Makeup': 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=400',
      'Mascara': 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400',
      'Blush': 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400',
      'Tools': 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&q=60'
    };
    
    return defaultImages[product.category?.name] || 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400';
  };

  if (loading) {
    return (
      <Container className="py-5 text-center" style={{ minHeight: '60vh' }}>
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading makeup products...</p>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold text-gradient-primary">💄 Premium Makeup Collection</h1>
        <p className="text-muted lead">Discover beauty products that enhance your natural glow</p>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="info" className="mb-4">
          <Alert.Heading>ℹ️ Demo Mode</Alert.Heading>
          <p>{error}</p>
          <p className="mb-0 small">Showing demo products. Connect to backend for real data.</p>
        </Alert>
      )}

      {/* Filters Section */}
      <Card className="shadow-sm border-0 mb-5">
        <Card.Body>
          <Row className="align-items-center">
            <Col md={6} lg={8}>
              <Form.Group>
                <div className="input-group input-group-lg">
                  <span className="input-group-text bg-light border-end-0">
                    <i className="bi bi-search"></i>
                  </span>
                  <Form.Control
                    type="text"
                    placeholder="Search lipstick, foundation, mascara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border-start-0"
                  />
                </div>
              </Form.Group>
            </Col>
            <Col md={3} lg={2}>
              <Form.Select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                size="lg"
                className="shadow-sm"
              >
                {categories.length > 0 ? (
                  categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))
                ) : (
                  <option value="All">All</option>
                )}
              </Form.Select>
            </Col>
            <Col md={3} lg={2}>
              <Button 
                variant="outline-secondary" 
                onClick={handleResetFilters}
                className="w-100"
                size="lg"
              >
                Clear Filters
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Results Info */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <Badge bg="primary" pill className="px-3 py-2 me-2">
            {filteredProducts.length}
          </Badge>
          <span className="text-muted">Products Found</span>
        </div>
        <div className="d-flex gap-2">
          {selectedCategory !== 'All' && (
            <Badge bg="light" text="dark" className="px-3 py-2">
              Category: {selectedCategory}
            </Badge>
          )}
          {searchTerm && (
            <Badge bg="info" text="dark" className="px-3 py-2">
              Search: "{searchTerm}"
            </Badge>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <Row>
        {filteredProducts.length === 0 ? (
          <Col className="text-center py-5">
            <div className="mb-4" style={{ fontSize: '4rem' }}>😔</div>
            <h4 className="mb-3">No makeup products found</h4>
            <p className="text-muted mb-4">We couldn't find any products matching your criteria</p>
            <Button 
              variant="outline-primary" 
              onClick={handleResetFilters}
              size="lg"
            >
              Show All Products
            </Button>
          </Col>
        ) : (
          filteredProducts.map(product => {
            const stockStatus = product.stock_quantity > 10 ? 'success' : 
                               product.stock_quantity > 0 ? 'warning' : 'danger';
            const productImage = getProductImage(product);
            
            return (
              <Col xl={3} lg={4} md={6} key={product.id} className="mb-4">
                <Card className="h-100 product-card shadow-sm border-0 hover-lift">
                  {/* Product Image */}
                  <div className="position-relative overflow-hidden" style={{ height: '220px' }}>
                    <Card.Img 
                      variant="top" 
                      src={productImage}
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

                  <Card.Body className="d-flex flex-column p-3">
                    {/* Brand */}
                    <div className="mb-2">
                      <span className="text-muted small">{product.brand || 'Makeup Brand'}</span>
                    </div>

                    {/* Product Name - Match screenshot */}
                    <Card.Title className="h5 mb-2 product-title">
                      <Link 
                        to={`/product/${product.id}`} 
                        className="text-decoration-none text-dark"
                      >
                        {product.name}
                      </Link>
                    </Card.Title>

                    {/* Description */}
                    <Card.Text className="text-muted small mb-3 flex-grow-1">
                      {product.description?.substring(0, 80) || 'Premium quality makeup product'}...
                    </Card.Text>

                    {/* Stock & Actions */}
                    <div className="mt-auto">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                          <span className="fw-bold text-primary fs-5">
                            ${parseFloat(product.price).toFixed(2)}
                          </span>
                          <br />
                          <small className={`text-${stockStatus}`}>
                            {product.stock_quantity > 10 ? 'In Stock' : 
                             product.stock_quantity > 0 ? `Low Stock (${product.stock_quantity} left)` : 
                             'Out of Stock'}
                          </small>
                        </div>
                      </div>

                      {/* Buttons */}
                      <div className="d-grid gap-2">
                        <Button 
                          variant={product.stock_quantity === 0 ? "secondary" : "primary"}
                          className="w-100"
                          onClick={() => handleAddToCart(product)}
                          disabled={product.stock_quantity === 0}
                        >
                          {product.stock_quantity === 0 ? '❌ Out of Stock' : '🛒 Add to Cart'}
                        </Button>
                        
                        <Button 
                          variant="outline-primary" 
                          className="w-100"
                          as={Link}
                          to={`/product/${product.id}`}
                        >
                          👁️ View Details
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })
        )}
      </Row>

      {/* Pagination and Summary */}
      {filteredProducts.length > 0 && (
        <div className="mt-5 pt-4 border-top">
          <Row className="align-items-center">
            <Col md={6}>
              <p className="text-muted mb-0">
                Showing <strong>{filteredProducts.length}</strong> of <strong>{products.length}</strong> makeup products
              </p>
            </Col>
            <Col md={6} className="text-md-end">
              <div className="btn-group">
                <Button variant="outline-secondary" size="sm" disabled>
                  « Previous
                </Button>
                <Button variant="outline-secondary" size="sm" active>
                  1
                </Button>
                <Button variant="outline-secondary" size="sm">
                  2
                </Button>
                <Button variant="outline-secondary" size="sm">
                  3
                </Button>
                <Button variant="outline-secondary" size="sm">
                  Next »
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </Container>
  );
};

export default Products;