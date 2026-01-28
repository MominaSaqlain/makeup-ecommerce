// src/pages/Cart.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems = [], removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();

  // Safely check if cart is empty
  const isEmpty = !Array.isArray(cartItems) || cartItems.length === 0;

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  if (isEmpty) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <h2 className="mb-4">Your Cart is Empty</h2>
          <p className="lead mb-4">Looks like you haven't added any products to your cart yet.</p>
          <Link to="/products" className="btn btn-primary btn-lg">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">Shopping Cart</h2>
      
      <div className="row">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body">
              {cartItems.map((item) => (
                <div key={item.id} className="d-flex align-items-center mb-4 pb-4 border-bottom">
                  <div className="flex-shrink-0">
                    <img 
                      src={item.image || 'https://via.placeholder.com/100'} 
                      alt={item.name} 
                      className="img-fluid rounded"
                      style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                    />
                  </div>
                  
                  <div className="flex-grow-1 ms-4">
                    <h5 className="mb-1">{item.name}</h5>
                    <p className="text-muted mb-2">{item.description || 'No description available'}</p>
                    <p className="fw-bold mb-0">${item.price || 0}</p>
                  </div>
                  
                  <div className="d-flex align-items-center">
                    <div className="input-group input-group-sm" style={{ width: '120px' }}>
                      <button 
                        className="btn btn-outline-secondary" 
                        type="button"
                        onClick={() => handleQuantityChange(item.id, (item.quantity || 1) - 1)}
                      >
                        -
                      </button>
                      <input 
                        type="text" 
                        className="form-control text-center" 
                        value={item.quantity || 1} 
                        readOnly
                      />
                      <button 
                        className="btn btn-outline-secondary" 
                        type="button"
                        onClick={() => handleQuantityChange(item.id, (item.quantity || 1) + 1)}
                      >
                        +
                      </button>
                    </div>
                    
                    <button 
                      className="btn btn-link text-danger ms-3"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              
              <div className="d-flex justify-content-between align-items-center">
                <button 
                  className="btn btn-outline-danger"
                  onClick={clearCart}
                >
                  Clear Cart
                </button>
                
                <Link to="/products" className="btn btn-outline-primary">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-lg-4 mt-4 mt-lg-0">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-4">Order Summary</h5>
              
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span>${totalPrice || 0}</span>
              </div>
              
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              
              <div className="d-flex justify-content-between mb-2">
                <span>Tax</span>
                <span>$0.00</span>
              </div>
              
              <hr />
              
              <div className="d-flex justify-content-between mb-4">
                <strong>Total</strong>
                <strong>${totalPrice || 0}</strong>
              </div>
              
              <Link to="/checkout" className="btn btn-primary w-100">
                Proceed to Checkout
              </Link>
              
              <p className="text-muted small mt-3 text-center">
                Free shipping on orders over $50
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;