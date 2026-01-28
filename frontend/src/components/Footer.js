import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer mt-auto py-4">
      <Container>
        <Row>
          <Col md={4} className="mb-4">
            <h5 className="text-white">💄 Makeup Store</h5>
            <p className="text-muted">
              Your one-stop shop for premium makeup products. 
              Quality beauty products at affordable prices.
            </p>
          </Col>
          
          <Col md={2} className="mb-4">
            <h6 className="text-white mb-3">Quick Links</h6>
            <div className="footer-links">
              <Link to="/">Home</Link>
              <Link to="/products">Products</Link>
              <Link to="/cart">Cart</Link>
              <Link to="/login">Login</Link>
            </div>
          </Col>
          
          <Col md={3} className="mb-4">
            <h6 className="text-white mb-3">Categories</h6>
            <div className="footer-links">
              <Link to="/products?category=Lipstick">Lipsticks</Link>
              <Link to="/products?category=Foundation">Foundations</Link>
              <Link to="/products?category=Eyeliner">Eyeliners</Link>
              <Link to="/products?category=Mascara">Mascara</Link>
            </div>
          </Col>
          
          <Col md={3} className="mb-4">
            <h6 className="text-white mb-3">Contact Us</h6>
            <p className="text-muted">
              <i className="bi bi-geo-alt me-2"></i>
              123 Beauty Street, Makeup City
            </p>
            <p className="text-muted">
              <i className="bi bi-envelope me-2"></i>
              contact@makeupstore.com
            </p>
            <p className="text-muted">
              <i className="bi bi-phone me-2"></i>
              +1 234 567 8900
            </p>
          </Col>
        </Row>
        
        <hr className="bg-secondary" />
        
        <Row className="mt-3">
          <Col className="text-center">
            <p className="text-muted mb-0">
              &copy; {new Date().getFullYear()} Makeup Store. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;