import React, { useState, useEffect } from 'react';
import api from '../services/api';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await api.get('/api/products/');
            setProducts(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h2 className="mb-4">💄 Makeup Products</h2>
            
            {loading ? (
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p>Loading products...</p>
                </div>
            ) : (
                <div className="row">
                    {products.map(product => (
                        <div key={product.id} className="col-md-4 mb-4">
                            <div className="card h-100">
                                {product.image && (
                                    <img 
                                        src={`http://127.0.0.1:8000${product.image}`} 
                                        className="card-img-top" 
                                        alt={product.name}
                                        style={{ height: '200px', objectFit: 'cover' }}
                                    />
                                )}
                                <div className="card-body">
                                    <h5 className="card-title">{product.name}</h5>
                                    <p className="card-text">
                                        {product.description.substring(0, 100)}...
                                    </p>
                                    <p className="text-muted">Brand: {product.brand}</p>
                                    <p className="text-muted">Category: {product.category?.name}</p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h4 className="text-primary">${product.price}</h4>
                                        <button className="btn btn-primary">
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ProductList;