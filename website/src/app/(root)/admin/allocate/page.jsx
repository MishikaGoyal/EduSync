"use client";
import React, { useState } from "react";
import { SchoolSearch } from "@/app/RequestComponent/SchoolSearch";
import { SchoolList } from "@/app/RequestComponent/SchoolList";
import { ResourceDetails } from "@/app/RequestComponent/ResourceDetails";
import { mockSchools } from "@/lib/mockData";
import Navbar from "@/app/Components/NavbarAdmin";

function Page() {
  const [schools, setSchools] = useState(mockSchools);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSchoolId, setSelectedSchoolId] = useState(null);

  const filteredSchools = schools.filter((school) =>
    school.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedSchool = selectedSchoolId
    ? schools.find((school) => school.id === selectedSchoolId)
    : null;

  const handleUpdateStatus = (schoolId, resourceId, maxDeliveryDate) => {
    setSchools((prevSchools) =>
      prevSchools.map((school) => {
        if (school.id === schoolId) {
          return {
            ...school,
            resources: school.resources.map((resource) => {
              if (resource.id === resourceId) {
                return {
                  ...resource,
                  status: "moved",
                  maxDeliveryDate,
                };
              }
              return resource;
            }),
          };
        }
        return school;
      })
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            {" "}
            Admin Resource Management Dashboard
          </h1>
          <SchoolSearch
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <SchoolList
              schools={filteredSchools}
              selectedSchoolId={selectedSchoolId}
              onSchoolSelect={setSelectedSchoolId}
            />
          </div>
          <div className="md:col-span-2">
            <ResourceDetails
              school={selectedSchool}
              onUpdateStatus={handleUpdateStatus}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Page;
