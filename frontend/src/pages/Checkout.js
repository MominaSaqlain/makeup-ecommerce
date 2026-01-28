// src/pages/Checkout.js
import React from 'react';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const { cartItems = [], totalPrice } = useCart();

  const isEmpty = !Array.isArray(cartItems) || cartItems.length === 0;

  if (isEmpty) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning text-center">
          <h4>Your cart is empty</h4>
          <p>Please add some products to your cart before checkout.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">Checkout</h2>
      
      <div className="row">
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title mb-4">Shipping Information</h5>
              
              <form>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">First Name</label>
                    <input type="text" className="form-control" required />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Last Name</label>
                    <input type="text" className="form-control" required />
                  </div>
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Address</label>
                  <input type="text" className="form-control" required />
                </div>
                
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">City</label>
                    <input type="text" className="form-control" required />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">State</label>
                    <input type="text" className="form-control" required />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">ZIP Code</label>
                    <input type="text" className="form-control" required />
                  </div>
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" required />
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input type="tel" className="form-control" required />
                </div>
              </form>
            </div>
          </div>
          
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-4">Payment Information</h5>
              
              <form>
                <div className="mb-3">
                  <label className="form-label">Card Number</label>
                  <input type="text" className="form-control" placeholder="1234 5678 9012 3456" required />
                </div>
                
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Expiration Date</label>
                    <input type="text" className="form-control" placeholder="MM/YY" required />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">CVV</label>
                    <input type="text" className="form-control" placeholder="123" required />
                  </div>
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Name on Card</label>
                  <input type="text" className="form-control" required />
                </div>
              </form>
            </div>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-4">Order Summary</h5>
              
              <div className="mb-3">
                {cartItems.map((item) => (
                  <div key={item.id} className="d-flex justify-content-between mb-2">
                    <span>
                      {item.name} x {item.quantity || 1}
                    </span>
                    <span>${(item.price || 0) * (item.quantity || 1)}</span>
                  </div>
                ))}
              </div>
              
              <hr />
              
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
              
              <button className="btn btn-primary w-100">
                Place Order
              </button>
              
              <p className="text-muted small mt-3">
                By placing your order, you agree to our Terms & Conditions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;