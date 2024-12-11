"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const resourceTypes = [
  { value: "Total_Class_Rooms", label: "Total Class Rooms" },
  { value: "Total_Teachers", label: "Total Teachers" },
  { value: "Total_Washrooms", label: "Total Washrooms" },
  { value: "Total_Students", label: "Total Students" },
  { value: "Result", label: "Result" },
];

export default function ResourceManagementDashboard() {
  const [resources, setResources] = useState([]);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  // Fetch school data on page load
  useEffect(() => {
    async function fetchSchoolData() {
      try {
        const response = await fetch("/api/school-data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ udiseId: "29  20  01  23  917" }), // Replace with actual UDISE ID
        });

        if (!response.ok) {
          throw new Error("Failed to fetch school data");
        }

        const { data } = await response.json();
        // Transform fetched data into the required structure
        const formattedResources = Object.entries(data).map(([key, value]) => ({
          id: key,
          resource_type: key,
          previous_value: "0", // Default or derived value
          new_value: value,
          description: `${key.replace("_", " ")} details`,
        }));
        setResources(formattedResources);
      } catch (error) {
        console.error(error);
      }
    }

    fetchSchoolData();
  }, []);

  const onSubmit = (data) => {
    setResources((prevResources) => {
      const existingResourceIndex = prevResources.findIndex(
        (r) => r.resource_type === data.resource_type
      );

      if (existingResourceIndex !== -1) {
        // Update existing resource
        const updatedResources = [...prevResources];
        updatedResources[existingResourceIndex] = {
          ...updatedResources[existingResourceIndex],
          previous_value: updatedResources[existingResourceIndex].new_value,
          new_value: data.new_value,
          description: data.description,
        };
        return updatedResources;
      } else {
        // Add new resource
        return [
          ...prevResources,
          {
            id: Date.now().toString(),
            resource_type: data.resource_type,
            previous_value: "0",
            new_value: data.new_value,
            description: data.description,
          },
        ];
      }
    });

    reset();
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("File uploaded:", file);
      // Add your logic to process the file here
    }
  };

  const graphData = resources
    .filter((resource) =>
      [
        "Total_Class_Rooms",
        "Total_Teachers",
        "Total_Washrooms",
        "Total_Students",
      ].includes(resource.resource_type)
    )
    .map((resource) => ({
      name:
        resourceTypes.find((type) => type.value === resource.resource_type)
          ?.label || resource.resource_type,
      previous: parseFloat(resource.previous_value) || 0,
      current: parseFloat(resource.new_value) || 0,
    }));

  return (
    <div className="w-[100%] flex flex-col items-center justify-center px-[15%] p-4">
      <h1 className="text-3xl font-bold mb-8">Resource Management Dashboard</h1>

      <div className="w-[100%] flex gap-8 flex-col justify-center items-center">
        <div className="bg-white shadow-md rounded-lg p-6 w-[60%]">
          <h2 className="text-xl font-semibold mb-4">Update Resource</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label
                htmlFor="resource_type"
                className="block text-sm font-medium text-gray-700"
              >
                Resource Type
              </label>
              <Controller
                name="resource_type"
                control={control}
                rules={{ required: "Resource type is required" }}
                render={({ field }) => (
                  <select
                    {...field}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  >
                    <option value="">Select resource type</option>
                    {resourceTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                )}
              />
              {errors.resource_type && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.resource_type.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="new_value"
                className="block text-sm font-medium text-gray-700"
              >
                New Value
              </label>
              <input
                id="new_value"
                type="text"
                {...register("new_value", {
                  required: "New value is required",
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors.new_value && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.new_value.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                {...register("description", {
                  required: "Description is required",
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                rows={3}
              ></textarea>
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.description.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Update Resource
            </button>
          </form>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 w-[60%]">
          <h2 className="text-xl font-semibold mb-4">File Upload</h2>
          <input
            type="file"
            onChange={handleFileUpload}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
          />
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 w-[80%]">
          <h2 className="text-xl font-semibold mb-4">Resource Overview</h2>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={graphData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="current" fill="#82ca9d" name="Current Value" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
