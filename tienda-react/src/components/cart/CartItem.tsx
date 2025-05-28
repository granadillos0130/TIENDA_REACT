import React from 'react';
import type { CartItem } from '../../types';
import { apiService } from '../../services/api';

interface CartItemProps {
  item: CartItem & {
    userName: string;
    userDocument: string;
    productName: string;
    productPrice: number;
    productImage: string;
  };
  onEdit: () => void;
  onDelete: () => void;
}

export const CartItemComponent: React.FC<CartItemProps> = ({
  item,
  onEdit,
  onDelete
}) => {
  const imageUrl = item.productImage ? apiService.getImageUrl(item.productImage) : '';

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP'
    }).format(price);
  };

  return (
    <div className="cart-item">
      <div className="cart-item-header">
        <h3 className="cart-item-title">Compra #{item.idCompra}</h3>
      </div>
      
      <div className="cart-item-content">
        <div className="cart-item-user">
          <div className="user-info">
            <span className="user-label">👤 Usuario:</span>
            <span className="user-name">{item.userName}</span>
            <span className="user-document">({item.userDocument})</span>
          </div>
        </div>

        <div className="cart-item-product">
          <div className="product-image-container">
            {imageUrl ? (
              <img 
                src={imageUrl} 
                alt={item.productName}
                className="cart-product-image"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
            ) : null}
            <div className={`cart-product-placeholder ${imageUrl ? 'hidden' : ''}`}>
              📦
            </div>
          </div>
          
          <div className="product-details">
            <h4 className="product-name">{item.productName}</h4>
            <div className="product-price">
              <span className="price-label">Precio:</span>
              <span className="price-value">{formatPrice(item.productPrice)}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="cart-item-actions">
        <button
          onClick={onEdit}
          className="btn btn-secondary btn-small"
          title="Editar item"
        >
          ✏️ Editar
        </button>
        <button
          onClick={onDelete}
          className="btn btn-danger btn-small"
          title="Eliminar del carrito"
        >
          🗑️ Eliminar
        </button>
      </div>
    </div>
  );
};