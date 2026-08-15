import React from 'react';
import './PageHeader.css';

function PageHeader({ eyebrow, title, description, action }) {
  return (
    <div className="page-header-root">
      <div className="page-header-info">
        {eyebrow && <span className="page-header-eyebrow">{eyebrow}</span>}
        <h1 className="page-header-title">{title}</h1>
        {description && <p className="page-header-desc">{description}</p>}
      </div>
      {action && <div className="page-header-action">{action}</div>}
    </div>
  );
}

export default PageHeader;
