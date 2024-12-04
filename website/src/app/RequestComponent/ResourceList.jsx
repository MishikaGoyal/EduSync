import React from 'react';
import { Upload, CheckCircle, Clock, MoveRight } from 'lucide-react';
import { getStatusColor } from '../utils/statusHelper';

export default function ResourceList({ resources, onUploadProof }) {
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

  const handleFileUpload = (id, event) => {
    const file = event.target.files?.[0];
    if (file) {
      onUploadProof(id, file);
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

  return (
    <div className="overflow-hidden rounded-xl border border-gray-100">
      <div className="overflow-x-auto scrollbar-custom">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="table-header">Resource</th>
              <th className="table-header">Quantity</th>
              <th className="table-header">Status</th>
              <th className="table-header">Date</th>
              <th className="table-header">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white/50 backdrop-blur-sm divide-y divide-gray-100">
            {resources.map((resource) => (
              <tr key={resource.id} className="hover:bg-white/80 transition-colors duration-150">
                <td className="table-cell">
                  <div className="font-medium text-gray-900">{resource.type}</div>
                  <div className="text-gray-500 mt-1 text-sm line-clamp-2">{resource.description}</div>
                </td>
                <td className="table-cell font-medium">{resource.quantity}</td>
                <td className="table-cell">
                  <span className={`status-badge ${getStatusColor(resource.status)}`}>
                    {getStatusIcon(resource.status)}
                    <span className="ml-2 capitalize">{resource.status}</span>
                  </span>
                </td>
                <td className="table-cell">{resource.requestDate}</td>
                <td className="table-cell">
                  {resource.status === 'moved' && (
                    <label className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 transition-all duration-200 shadow-sm hover:shadow-md">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Proof
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.png,.jpg,.jpeg"
                        onChange={(e) => handleFileUpload(resource.id, e)}
                      />
                    </label>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}