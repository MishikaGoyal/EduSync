export const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'moved':
        return 'bg-blue-100 text-blue-800';
      case 'allocated':
        return 'bg-green-100 text-green-800';
      default:
        return '';
    }
  };