import React from 'react';
import { School, Package2 } from 'lucide-react';
import { ResourceTable } from './ResourceTable';

export function ResourceDetails({ school, onUpdateStatus }) {
  if (!school) {
    return (
      <div className="dashboard-card">
        <div className="flex flex-col items-center justify-center p-12 text-center">
          <div className="p-3 bg-gray-100 rounded-full mb-4">
            <Package2 className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No School Selected</h3>
          <p className="text-gray-500 max-w-sm">
            Select a school from the list to view and manage their resource requests
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-card">
      <div className="card-header">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <School className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{school.name}</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Managing {school.resources.length} resource {school.resources.length === 1 ? 'request' : 'requests'}
            </p>
          </div>
        </div>
      </div>
      <div className="p-6">
        <ResourceTable
          resources={school.resources}
          onUpdateStatus={(resourceId, maxDeliveryDate) => 
            onUpdateStatus(school.id, resourceId, maxDeliveryDate)
          }
        />
      </div>
    </div>
  );
}