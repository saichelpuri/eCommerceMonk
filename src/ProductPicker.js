import React, { useState } from 'react';

import './ProductPicker.css';

const ProductPicker = ({ isOpen, onClose, onProductSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);

  const products = [
    {
      id: 1,
      name: 'Long Socks - Made with natural materials',
      image: '/api/placeholder/50/50',
      variants: [
        { id: 11, size: 'S', color: 'White', material: 'Cotton', available: 99, price: 3.99 },
        { id: 12, size: 'M', color: 'White', material: 'Cotton', available: 99, price: 3.99 },
        { id: 13, size: 'L', color: 'White', material: 'Cotton', available: 99, price: 3.99 },
      ]
    },
    {
      id: 2,
      name: 'Printed Tshirt',
      image: '/api/placeholder/50/50',
      variants: [
        { id: 21, size: 'S', color: 'White', material: 'Cotton', available: 75, price: 8.99 },
      ]
    }
  ];

  const handleCheckboxChange = (itemId) => {
    setSelectedItems(prev => {
      if (prev.includes(itemId)) {
        return prev.filter(id => id !== itemId);
      }
      return [...prev, itemId];
    });
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {/* Header */}
        <div className="modal-header">
          <div className="header-content">
            <h2>Select Products</h2>
            <button onClick={onClose} className="close-button">
             x
            </button>
          </div>
          
          <div className="search-container">
            <input
              type="text"
              placeholder="Search product"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {/* Product List */}
        <div className="product-list">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-item">
              {/* Product Header */}
              <div className="product-header">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(product.id)}
                  onChange={() => handleCheckboxChange(product.id)}
                  className="checkbox"
                />
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
                <span className="product-name">{product.name}</span>
              </div>

              {/* Product Variants */}
              <div className="variant-list">
                {product.variants.map(variant => (
                  <div key={variant.id} className="variant-item">
                    <div className="variant-left">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(variant.id)}
                        onChange={() => handleCheckboxChange(variant.id)}
                        className="checkbox"
                      />
                      <span className="variant-info">
                        {variant.size}/ {variant.color} / {variant.material}
                      </span>
                    </div>
                    <div className="variant-right">
                      <span className="availability">{variant.available} available</span>
                      <span className="price">${variant.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <span className="selection-count">
            {selectedItems.length} product{selectedItems.length !== 1 ? 's' : ''} selected
          </span>
          <div className="button-group">
            <button
              onClick={onClose}
              className="cancel-button"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onProductSelect(selectedItems);
                onClose();
              }}
              className="add-button"
            >
              Add
            </button>
          </div>
        </div>
      </div>

    
    </div>
  );
};

export default ProductPicker;