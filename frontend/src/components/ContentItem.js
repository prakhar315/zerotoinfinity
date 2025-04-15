import React, { useState } from 'react';
import { progressService } from '../services/api';

const ContentItem = ({ content, onProgressUpdate }) => {
  const [completed, setCompleted] = useState(content.completed || false);
  const [loading, setLoading] = useState(false);

  const handleCheckboxChange = async () => {
    try {
      setLoading(true);
      const newStatus = !completed;
      await progressService.updateProgress(content.id, newStatus);
      setCompleted(newStatus);
      if (onProgressUpdate) {
        onProgressUpdate(content.id, newStatus);
      }
    } catch (error) {
      console.error('Failed to update progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const getContentIcon = () => {
    switch (content.content_type) {
      case 'video':
        return '🎬';
      case 'exercise':
        return '📝';
      case 'notes':
        return '📚';
      default:
        return '📄';
    }
  };

  return (
    <div className={`content-item ${completed ? 'completed' : ''}`}>
      <div className="d-flex align-items-center">
        <div className="form-check me-3">
          <input
            className="form-check-input"
            type="checkbox"
            checked={completed}
            onChange={handleCheckboxChange}
            disabled={loading}
            id={`content-${content.id}`}
          />
        </div>
        <div>
          <h5>
            {getContentIcon()} {content.title}
          </h5>
          <p className="mb-1">{content.description}</p>
          <a href={content.url} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary">
            {content.content_type === 'video' ? 'Watch Video' : content.content_type === 'exercise' ? 'Solve Exercise' : 'View Notes'}
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContentItem;
