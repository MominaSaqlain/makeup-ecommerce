import React from 'react';
import { Container, Row, Col, Card, Button, Tab, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const user = {
    name: "Momina Saqlain",
    email: "mominasaqlain27@gmail.com",
    joinDate: "January 2026"
  };

  const orders = [
    { id: 1, date: '2026-01-25', total: '$87.50', status: 'Delivered' },
    { id: 2, date: '2026-01-20', total: '$45.00', status: 'Shipped' },
    { id: 3, date: '2026-01-15', total: '$120.00', status: 'Pending' }
  ];

  return (
    <Container className="py-5">
      <h2 className="mb-4">👤 My Dashboard</h2>
      
      <Row>
        <Col lg={3} className="mb-4">
          <Card className="shadow-sm">
            <Card.Body className="text-center">
              <div className="mb-3">
                <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center" 
                     style={{ width: '80px', height: '80px' }}>
                  <span className="text-white fs-3">{user.name.charAt(0)}</span>
                </div>
              </div>
              <h5>{user.name}</h5>
              <p className="text-muted">{user.email}</p>
              <p className="small text-muted">
                Member since {user.joinDate}
              </p>
              
              <hr />
              
              <div className="d-grid gap-2">
                <Link to="/cart" className="btn btn-outline-primary">
                  🛒 My Cart
                </Link>
                <Link to="/products" className="btn btn-outline-secondary">
                  🛍️ Continue Shopping
                </Link>
                <Button variant="outline-danger">Logout</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={9}>
          <Tab.Container defaultActiveKey="orders">
            <Card className="shadow-sm">
              <Card.Header>
                <Nav variant="tabs" className="border-0">
                  <Nav.Item>
                    <Nav.Link eventKey="orders">📦 My Orders</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="profile">👤 Profile</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="address">🏠 Address</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Header>
              
              <Card.Body>
                <Tab.Content>
                  <Tab.Pane eventKey="orders">
                    <h5 className="mb-4">Recent Orders</h5>
                    {orders.length === 0 ? (
                      <p className="text-muted text-center py-4">
                        No orders yet. <Link to="/products">Start shopping!</Link>
                      </p>
                    ) : (
                      <div className="table-responsive">
                        <table className="table">
                          <thead>
                            <tr>
                              <th>Order #</th>
                              <th>Date</th>
                              <th>Total</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {orders.map(order => (
                              <tr key={order.id}>
                                <td>#{order.id}</td>
                                <td>{order.date}</td>
                                <td>{order.total}</td>
                                <td>
                                  <span className={`badge ${
                                    order.status === 'Delivered' ? 'bg-success' :
                                    order.status === 'Shipped' ? 'bg-warning' : 'bg-secondary'
                                  }`}>
                                    {order.status}
                                  </span>
                                </td>
                                <td>
                                  <Button size="sm" variant="outline-primary">
                                    View Details
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </Tab.Pane>
                  
                  <Tab.Pane eventKey="profile">
                    <h5 className="mb-4">Profile Information</h5>
                    <Row>
                      <Col md={6}>
                        <div className="mb-3">
                          <label className="form-label">Full Name</label>
                          <input type="text" className="form-control" defaultValue={user.name} />
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="mb-3">
                          <label className="form-label">Email</label>
                          <input type="email" className="form-control" defaultValue={user.email} />
                        </div>
                      </Col>
                    </Row>
                    <Button variant="primary">Update Profile</Button>
                  </Tab.Pane>
                  
                  <Tab.Pane eventKey="address">
                    <h5 className="mb-4">Shipping Address</h5>
                    <p className="text-muted">No address saved yet.</p>
                    <Button variant="primary">Add New Address</Button>
                  </Tab.Pane>
                </Tab.Content>
              </Card.Body>
            </Card>
          </Tab.Container>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;