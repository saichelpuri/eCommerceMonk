import React, { useState } from 'react';
import './ProductList.css';

const ProducList = () => {
  const [products, setProducts] = useState([
    { id: 1, product: '', discount: false }
  ]);

  const handleAddProduct = () => {
    const newProduct = {
      id: products.length + 1,
      product: '',
      discount: false
    };
    setProducts([...products, newProduct]);
  };

  const handleProductChange = (id, value) => {
    const updatedProducts = products.map(product =>
      product.id === id ? { ...product, product: value } : product
    );
    setProducts(updatedProducts);
  };

  return (
    <div className="container">
      <h2 className="title">Add Products</h2>
      <div className="products-container">
        <div className="header-grid">
          <div className="header-column">
            <label className="input-label">Product</label>
          </div>
          <div className="header-column">
            <label className="input-label">Discount</label>
          </div>
        </div>
        
        {products.map((product, index) => (
          <div key={product.id} className="product-row">
            <div className="product-number">
              {index + 1}.
            </div>
            <div className="product-input-container">
              <div className="input-wrapper">
                <input
                  type="text"
                  className="product-input"
                  placeholder="Select Product"
                  value={product.product}
                  onChange={(e) => handleProductChange(product.id, e.target.value)}
                />
                <button className="edit-button">
                  <svg className="edit-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="discount-container">
              <button className="discount-button">
                Add Discount
              </button>
            </div>
          </div>
        ))}
      </div>
      <button onClick={handleAddProduct} className="add-product-button">
        Add Product
      </button>
    </div>
  );
};

export default ProducList;