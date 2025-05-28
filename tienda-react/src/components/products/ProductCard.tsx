import React from 'react';
import type { Product, Category } from '../../types';
import { apiService } from '../../services/api';

interface ProductCardProps {
  product: Product;
  categories: Category[];
  onEdit: () => void;
  onDelete: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  categories,
  onEdit,
  onDelete
}) => {
  const categoryName = categories.find(cat => cat.idCategoria === product.idCategoria)?.nombreCategoria || 'Sin categoría';
  const imageUrl = product.urlImagen ? apiService.getImageUrl(product.urlImagen) : '';

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP'
    }).format(price);
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={product.descripcion}
            className="product-image"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.nextElementSibling?.classList.remove('hidden');
            }}
          />
        ) : null}
        <div className={`product-image-placeholder ${imageUrl ? 'hidden' : ''}`}>
          📦
        </div>
      </div>
      
      <div className="product-content">
        <div className="product-header">
          <h3 className="product-title">{product.descripcion}</h3>
          <span className="product-category">{categoryName}</span>
        </div>
        
        <div className="product-details">
          <div className="product-price">
            <span className="price-label">Precio:</span>
            <span className="price-value">{formatPrice(product.precio)}</span>
          </div>
          
          <div className="product-info">
            <div className="info-item">
              <span className="info-label">Cantidad:</span>
              <span className="info-value">{product.cantidad} {product.unidad}</span>
            </div>
            <div className="info-item">
              <span className="info-label">ID:</span>
              <span className="info-value">{product.idProducto}</span>
            </div>
          </div>
        </div>
        
        <div className="product-actions">
          <button
            onClick={onEdit}
            className="btn btn-secondary btn-small"
            title="Editar producto"
          >
            ✏️ Editar
          </button>
          <button
            onClick={onDelete}
            className="btn btn-danger btn-small"
            title="Eliminar producto"
          >
            🗑️ Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

// Exportaciones múltiples para máxima compatibilidad
export { ProductCard };
export default ProductCard;