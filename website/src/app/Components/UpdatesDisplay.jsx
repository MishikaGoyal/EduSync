"use client";

import { useState } from "react";
import {
  Check,
  X,
  FileText,
  Building2,
  Image as ImageIcon,
} from "lucide-react";

export default function UpdatesDisplay({ updatesData }) {
  const [selectedSchool, setSelectedSchool] = useState(null);

  const handleAccept = (id) => {
    // Placeholder for accept logic
    console.log("Accepted update:", id);
  };

  const handleReject = (id) => {
    // Placeholder for reject logic
    console.log("Rejected update:", id);
  };

  const handleViewDocument = (url) => {
    // Placeholder for view document logic
    window.open(url, "_blank");
  };

  const handleViewImage = (imageUrl) => {
    // Open image in a new tab
    window.open(imageUrl, "_blank");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-72 bg-white shadow-lg border-r">
        <div className="p-5 flex items-center space-x-3 border-b">
          <Building2 className="text-blue-600" size={24} />
          <h2 className="text-xl font-semibold text-gray-800">Schools</h2>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-70px)]">
          {[
            ...new Map(
              updatesData.map((update) => [update.UDISE_CODE, update])
            ).values(),
          ].map((update) => (
            <div
              key={update.id}
              className={`p-4 cursor-pointer hover:bg-blue-50 transition-colors flex items-center space-x-3 ${
                selectedSchool === update.UDISE_CODE
                  ? "bg-blue-100 border-l-4 border-blue-600"
                  : "hover:border-l-4 hover:border-blue-300"
              }`}
              onClick={() => setSelectedSchool(update.UDISE_CODE)}
            >
              <Building2 className="text-gray-500" size={20} />
              <span className="text-gray-700 font-medium">
                {update.UDISE_CODE}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8 overflow-y-auto bg-gray-50">
        {selectedSchool ? (
          updatesData
            .filter((update) => update.UDISE_CODE === selectedSchool)
            .map((update) => (
              <div
                key={update.id}
                className="bg-white rounded-xl shadow-md border border-gray-100 p-6 mb-6"
              >
                <div className="flex items-center mb-6">
                  <FileText className="text-blue-600 mr-3" size={28} />
                  <h2 className="text-2xl font-bold text-gray-800">
                    Update Request
                  </h2>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-gray-500 font-medium mb-1">
                      Resource Type:
                    </p>
                    <p className="text-gray-800">{update.resource_type}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 font-medium mb-1">Status:</p>
                    <p className="text-gray-800">{update.status}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 font-medium mb-1">
                      Previous Value:
                    </p>
                    <p className="text-gray-800">{update.previous_value}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 font-medium mb-1">New Value:</p>
                    <p className="text-gray-800">{update.new_value}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-500 font-medium mb-1">
                      Description:
                    </p>
                    <p className="text-gray-800">{update.description}</p>
                  </div>
                </div>
                <div className="mt-6 flex justify-between items-center">
                  <div className="space-x-3 flex flex-rows">
                    <button
                      onClick={() => handleAccept(update.id)}
                      className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-green-600 transition-colors"
                    >
                      <Check size={18} />
                      <span>Accept</span>
                    </button>
                    <button
                      onClick={() => handleReject(update.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-red-600 transition-colors"
                    >
                      <X size={18} />
                      <span>Reject</span>
                    </button>
                  </div>
                  <div className="space-x-3 flex flex-rows">
                    {update.url && (
                      <button
                        onClick={() => handleViewDocument(update.url)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-blue-600 transition-colors"
                      >
                        <FileText size={18} />
                        <span>View Document</span>
                      </button>
                    )}
                    {update.image && (
                      <button
                        onClick={() => handleViewImage(update.image)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-blue-700 transition-colors"
                      >
                        <ImageIcon size={18} />
                        <span>View Image</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
        ) : (
          <div className="text-center text-gray-500 mt-20 bg-white p-8 rounded-xl shadow-md">
            <Building2 className="mx-auto mb-4 text-gray-400" size={48} />
            <p className="text-lg">Select a school to view update requests</p>
          </div>
        )}
      </div>
    </div>
  );
}
