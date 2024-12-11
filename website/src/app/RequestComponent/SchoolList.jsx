import React from 'react';
import { School, ChevronRight } from 'lucide-react';

export function SchoolList({ schools, selectedSchoolId, onSchoolSelect }) {
  return (
    <div className="dashboard-card">
      <div className="card-header">
        <h2 className="text-lg font-semibold text-gray-900">Schools</h2>
        <p className="text-sm text-gray-500 mt-1">Select a school to view requests</p>
      </div>
      <div className="divide-y divide-gray-100">
        {schools.map((school) => (
          <button
            key={school.id}
            onClick={() => onSchoolSelect(school.id)}
            className={`w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-all ${
              selectedSchoolId === school.id ? 'bg-blue-50 hover:bg-blue-50' : ''
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${
                selectedSchoolId === school.id ? 'bg-blue-100' : 'bg-gray-100'
              }`}>
                <School className={`h-5 w-5 ${
                  selectedSchoolId === school.id ? 'text-blue-600' : 'text-gray-500'
                }`} />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium text-gray-900">{school.name}</span>
                <span className="text-xs text-gray-500 mt-0.5">
                  {school.resources.length} {school.resources.length === 1 ? 'request' : 'requests'}
                </span>
              </div>
            </div>
            <ChevronRight className={`h-5 w-5 transition-colors ${
              selectedSchoolId === school.id ? 'text-blue-600' : 'text-gray-400'
            }`} />
          </button>
        ))}
      </div>
    </div>
  );
}