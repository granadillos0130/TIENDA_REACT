import React from 'react';
import type  { User } from '../../types';
import { apiService } from '../../services/api';

interface UserCardProps {
  user: User;
  onEdit: () => void;
  onDelete: () => void;
}

export const UserCard: React.FC<UserCardProps> = ({
  user,
  onEdit,
  onDelete
}) => {
  const imageUrl = user.urlImagen ? apiService.getImageUrl(user.urlImagen) : '';

  return (
    <div className="user-card">
      <div className="user-avatar-container">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={`${user.nombre} ${user.apellido}`}
            className="user-avatar"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.nextElementSibling?.classList.remove('hidden');
            }}
          />
        ) : null}
        <div className={`user-avatar-placeholder ${imageUrl ? 'hidden' : ''}`}>
          👤
        </div>
      </div>
      
      <div className="user-content">
        <div className="user-header">
          <h3 className="user-name">{user.nombre} {user.apellido}</h3>
          <span className="user-id">ID: {user.idUsuario}</span>
        </div>
        
        <div className="user-details">
          <div className="user-info">
            <div className="info-item">
              <span className="info-label">📄 Documento:</span>
              <span className="info-value">{user.documento}</span>
            </div>
          </div>
        </div>
        
        <div className="user-actions">
          <button
            onClick={onEdit}
            className="btn btn-secondary btn-small"
            title="Editar usuario"
          >
            ✏️ Editar
          </button>
          <button
            onClick={onDelete}
            className="btn btn-danger btn-small"
            title="Eliminar usuario"
          >
            🗑️ Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;