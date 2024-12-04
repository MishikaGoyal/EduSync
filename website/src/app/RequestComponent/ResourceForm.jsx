import React, { useState } from 'react';
import { PlusCircle, AlertCircle } from 'lucide-react';
import { RESOURCE_TYPES } from '../utils/resourceType';
import { validateQuantity } from '../utils/validation';

export default function ResourceForm({ onSubmit }) {
  const [type, setType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [quantityError, setQuantityError] = useState('');

  const handleQuantityChange = (e) => {
    const inputValue = e.target.value;
    setQuantity(inputValue);
    if (type) {
      const validation = validateQuantity(type, inputValue);
      setQuantityError(validation.isValid ? '' : validation.error);
    }
  };

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setType(newType);
    if (quantity) {
      const validation = validateQuantity(newType, quantity);
      setQuantityError(validation.isValid ? '' : validation.error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!type) {
      return;
    }

    const validation = validateQuantity(type, quantity);
    if (!validation.isValid) {
      setQuantityError(validation.error);
      return;
    }

    onSubmit({
      type,
      quantity: validation.value,
      description,
    });

    setType('');
    setQuantity('');
    setDescription('');
    setQuantityError('');
  };

  const getQuantityPlaceholder = () => {
    if (!type) return 'Select a resource type first';
    const resourceType = RESOURCE_TYPES.find(r => r.label === type);
    return resourceType?.unit === 'rupees' 
      ? 'Enter amount in rupees'
      : `Enter number of ${resourceType?.unit || 'units'}`;
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h2 className="text-2xl font-semibold mb-8 pb-4 border-b border-gray-100">
        New Request
      </h2>
      
      <div className="space-y-6">
        <div>
          <label className="form-label">Resource Type</label>
          <select
            value={type}
            onChange={handleTypeChange}
            className="form-input"
            required
          >
            <option value="">Select a resource type</option>
            {RESOURCE_TYPES.map((resource) => (
              <option key={resource.label} value={resource.label}>
                {resource.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="form-label">Quantity</label>
          <input
            type="text"
            value={quantity}
            onChange={handleQuantityChange}
            className={`form-input ${quantityError ? 'border-red-300 focus:ring-red-500' : ''}`}
            required
            placeholder={getQuantityPlaceholder()}
          />
          {quantityError && (
            <div className="mt-2 flex items-center text-sm text-red-600">
              <AlertCircle className="w-4 h-4 mr-1" />
              {quantityError}
            </div>
          )}
        </div>

        <div>
          <label className="form-label">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-input min-h-[120px] resize-none"
            required
            placeholder="Provide additional details about your request..."
          />
        </div>

        <button 
          type="submit" 
          className="btn-primary mt-8"
          disabled={!!quantityError}
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Submit Request
        </button>
      </div>
    </form>
  );
}