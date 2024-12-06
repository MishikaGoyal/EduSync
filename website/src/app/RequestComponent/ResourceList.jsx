import React from 'react';
import { CheckCircle, Clock, MoveRight, AlertTriangle, RotateCcw } from 'lucide-react';
import { formatDistanceToNow, isPast } from 'date-fns';

export default function ResourceList({ resources, onResourceUpdate }) {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-amber-500" />;
      case 'moved':
        return <MoveRight className="w-5 h-5 text-purple-500" />;
      case 'allocated':
        return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      default:
        return null;
    }
  };

  const handleMarkReceived = async (id) => {
    try {
      const response = await fetch("api/resource-request/principal/mark-received", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({
          resourceId: id,
        }),
      })

      if (!response.ok) {
        console.error("Failed to re-request resource:", response.statusText);
        return;
      }

      const result = await response.json();
      console.log("logging for the mark Received data :", result);

      onResourceUpdate(result.updatedResource);

    } catch (error) {
      console.error('Failed to mark resource as received:', error);
    }
  };


  // to handle the re-reuqest for the particular resource
  const handleReRequest = async (id) => {
    try {
      const response = await fetch("/api/resource-request/principal/re-request", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({
          resourceId: id,
        }),
      });

      if (!response.ok) {
        console.error("Failed to re-request resource:", response.statusText);
        return;
      }

      const result = await response.json();
      console.log("logging for re-request data", result);

      onResourceUpdate(result.updatedResource);

    } catch (error) {
      console.error("Failed to re-request resource:", error);
    }
  };


  if (resources.length === 0) {
    return (
      <div className="text-center py-12">
        <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">No resource requests yet</p>
        <p className="text-gray-400 text-sm mt-1">Create a new request to get started</p>
      </div>
    );
  }

  console.log("logging resources from the ResorceList :", resources)

  return (
    <div className="overflow-hidden rounded-xl border border-gray-100">
      <div className="overflow-x-auto scrollbar-custom">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="table-header">Resource</th>
              <th className="table-header">Quantity</th>
              <th className="table-header">Status</th>
              <th className="table-header">Expected By</th>
              <th className="table-header">Re-requests</th>
              <th className="table-header">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white/50 backdrop-blur-sm divide-y divide-gray-100">
            {resources.map((resource) => {
              // Access the actual resource data inside the 'resource_request' object
              //const data = resource.resource_request;

              const isOverdue = resource.max_date_for_resource_delivery && isPast(new Date(resource.max_date_for_resource_delivery));
              const canReRequest = resource.status === 'moved' && isOverdue;

              return (
                <tr key={resource.id} className="hover:bg-white/80 transition-colors duration-150">
                  <td className="table-cell">
                    <div className="font-medium text-gray-900">{resource.resource_type}</div>
                    <div className="text-gray-500 mt-1 text-sm line-clamp-2">{resource.description}</div>
                  </td>
                  <td className="table-cell font-medium">{resource.quantity}</td>
                  <td className="table-cell">
                    <span className={`status-badge ${getStatusColor(resource.status)}`}>
                      {getStatusIcon(resource.status)}
                      <span className="ml-2 capitalize">{resource.status}</span>
                    </span>
                  </td>
                  <td className="table-cell">
                    {resource.max_date_for_resource_delivery && (
                      <div className={`flex items-center ${isOverdue ? 'text-red-600' : 'text-gray-600'}`}>
                        {isOverdue && <AlertTriangle className="w-4 h-4 mr-1" />}
                        {formatDistanceToNow(new Date(resource.max_date_for_resource_delivery), { addSuffix: true })}
                      </div>
                    )}
                  </td>
                  <td className="table-cell">
                    {resource.rerequest_count > 0 && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                        {resource.rerequest_count} times
                      </span>
                    )}
                  </td>
                  <td className="table-cell">
                    {resource.status === 'moved' && !isOverdue && (
                      <button
                        onClick={() => handleMarkReceived(resource.id)}
                        className="btn-primary py-2 px-4 w-auto"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Mark Received
                      </button>
                    )}
                    {canReRequest && (
                      <button
                        onClick={() => handleReRequest(resource.id)}
                        className="btn-re-request flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-lg shadow-lg hover:from-purple-500 hover:to-indigo-500 hover:shadow-xl transition-transform transform hover:scale-105"
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Re-request
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const getStatusColor = (status) => {
  switch (status) {
    case 'pending':
      return 'bg-amber-50 text-amber-700 border border-amber-100';
    case 'moved':
      return 'bg-purple-50 text-purple-700 border border-purple-100';
    case 'allocated':
      return 'bg-emerald-50 text-emerald-700 border border-emerald-100';
    default:
      return '';
  }
};