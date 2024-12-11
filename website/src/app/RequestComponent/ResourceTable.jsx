import React, { useState } from 'react';
import { Clock, Package, RefreshCw, Calendar } from 'lucide-react';
import { StatusBadge } from './ui/StatusBadge';
import { DatePickerModal } from './ui/DatePickerModal';

export function ResourceTable({ resources, onUpdateStatus }) {
  const [selectedResource, setSelectedResource] = useState(null);

  const handleMove = (resource) => {
    setSelectedResource(resource);
  };

  const handleDateSelect = (date) => {
    if (selectedResource) {
      onUpdateStatus(selectedResource.id, date);
    }
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resource</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Re-requests</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {resources.map((resource) => (
              <tr key={resource.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Package className="h-5 w-5 text-gray-500" />
                    </div>
                    <span className="font-medium text-gray-900">{resource.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">{resource.quantity}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-500">{resource.description}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-500">{resource.requestTime}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={resource.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {resource.maxDeliveryDate ? (
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-500">{resource.maxDeliveryDate}</span>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-400">-</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <RefreshCw className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-500">{resource.reRequestCount}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {resource.status === 'pending' && (
                    <button
                      onClick={() => handleMove(resource)}
                      className="action-button action-button-primary"
                    >
                      Move
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DatePickerModal
        isOpen={!!selectedResource}
        onClose={() => setSelectedResource(null)}
        onSelect={handleDateSelect}
        resourceName={selectedResource?.name}
      />
    </div>
  );
}