import React from 'react';
import type { Category } from '../../types';

interface CategoryItemProps {
  category: Category;
  onEdit: () => void;
  onDelete: () => void;
}

export const CategoryItem: React.FC<CategoryItemProps> = ({
  category,
  onEdit,
  onDelete
}) => {
  return (
    <div className="category-item">
      <div className="category-content">
        <div className="category-icon">📁</div>
        <div className="category-info">
          <h3 className="category-name">{category.nombreCategoria}</h3>
          <p className="category-id">ID: {category.idCategoria}</p>
        </div>
      </div>
      
      <div className="category-actions">
        <button
          onClick={onEdit}
          className="btn btn-secondary btn-small"
          title="Editar categoría"
        >
          ✏️ Editar
        </button>
        <button
          onClick={onDelete}
          className="btn btn-danger btn-small"
          title="Eliminar categoría"
        >
          🗑️ Eliminar
        </button>
      </div>
    </div>
  );
};

export default CategoryItem;