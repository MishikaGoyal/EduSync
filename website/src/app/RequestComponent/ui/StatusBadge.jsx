import React from 'react';

export function StatusBadge({ status }) {
  return (
    <span className={`status-badge ${
      status === 'pending' ? 'status-badge-pending' : 
      status === 'moved' ? 'status-badge-moved' : 
      'status-badge-allocated'
    }`}>
      {status}
    </span>
  );
}