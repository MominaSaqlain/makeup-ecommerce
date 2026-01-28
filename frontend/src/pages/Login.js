// src/pages/Login.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(email, password);
      
      if (result.success) {
        navigate('/');
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Don't show login page if already authenticated
  if (isAuthenticated) {
    return null;
  }

  if (authLoading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Checking authentication...</p>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card className="shadow border-0">
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <h2 className="fw-bold">Welcome Back</h2>
                <p className="text-muted">Sign in to your account</p>
              </div>
              
              {error && (
                <Alert variant="danger" className="text-center">
                  {error}
                </Alert>
              )}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    size="lg"
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    size="lg"
                  />
                  <div className="text-end mt-2">
                    <a href="#" className="text-decoration-none small">Forgot password?</a>
                  </div>
                </Form.Group>
                
                <Form.Group className="mb-4">
                  <Form.Check
                    type="checkbox"
                    label="Remember me"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                </Form.Group>
                
                <Button 
                  variant="primary" 
                  type="submit" 
                  className="w-100 py-3 mb-3"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner as="span" animation="border" size="sm" className="me-2" />
                      Signing In...
                    </>
                  ) : 'Sign In'}
                </Button>
                
                <div className="text-center mb-4">
                  <span className="text-muted">Or sign in with</span>
                </div>
                
                <div className="d-grid gap-2 mb-4">
                  <Button variant="outline-secondary" size="lg">
                    <i className="bi bi-google me-2"></i>
                    Continue with Google
                  </Button>
                  <Button variant="outline-secondary" size="lg">
                    <i className="bi bi-facebook me-2"></i>
                    Continue with Facebook
                  </Button>
                </div>
                
                <div className="text-center">
                  <p className="mb-0">
                    Don't have an account?{' '}
                    <a href="/register" className="text-decoration-none fw-bold">
                      Sign up
                    </a>
                  </p>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

// ✅ YEH LINE IMPORTANT HAI - export default karo
export default Login;