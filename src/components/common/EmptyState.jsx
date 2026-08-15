import React from 'react';
import './EmptyState.css';

function EmptyState({ icon = "📁", title = "No items found", description = "Get started by adding a new item.", action }) {
  return (
    <div className="empty-state-root">
      <div className="empty-state-icon">{icon}</div>
      <h3 className="empty-state-title">{title}</h3>
      {description && <p className="empty-state-desc">{description}</p>}
      {action && <div className="empty-state-action">{action}</div>}
    </div>
  );
}

export default EmptyState;
