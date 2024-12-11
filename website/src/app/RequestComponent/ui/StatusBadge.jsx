import React from 'react';

export function StatusBadge({ status }) {
  const getStatusClasses = () => {
    switch (status) {
      case 'pending':
        return 'status-badge-pending';
      case 'moved':
        return 'status-badge-moved';
      case 'allocated':
        return 'status-badge-allocated';
      default:
        return 'status-badge-pending';
    }
  };

  return (
    <span className={`status-badge ${getStatusClasses()}`}>
      {status}
    </span>
  );
}