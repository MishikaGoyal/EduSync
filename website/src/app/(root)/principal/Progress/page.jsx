"use client";

import Navbar from "@/app/Components/NavbarPrincipal";
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
  const [formData, setFormData] = useState({
    UDISE_CODE: "", // Pre-filled with the default UDISE code
    resource_type: "",
    new_value: "",
    url: "",
    description: "",
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  // Fetch school data on page load
  useEffect(() => {
    setFormData({
      ...formData,
      UDISE_CODE: sessionStorage.getItem("udiseId"),
    });
    console.log(sessionStorage.getItem("udiseId"));
    async function fetchSchoolData() {
      try {
        const response = await fetch("/api/school-data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ udiseId: sessionStorage.getItem("udiseId") }), // Replace with actual UDISE ID
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

  // Handle changes in form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Submit function to send data to API
  const onSubmit = async (data) => {
    console.log(data);
    try {
      // Construct the payload with all form data
      const payload = {
        UDISE_CODE: formData.UDISE_CODE,
        resource_type: data.resource_type,
        new_value: data.new_value,
        description: data.description,
      };

      // Send data to API endpoint
      const response = await fetch("/api/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to update resource");
      }

      // Optional: handle successful response
      const result = await response.json();
      console.log("Resource updated successfully:", result);

      // Reset the form after successful submission
      reset();
      setFormData({
        UDISE_CODE: "",
        resource_type: "",
        new_value: "",
        url: "",
        description: "",
      });
    } catch (error) {
      console.error("Error updating resource:", error);
      // Optional: add error handling (e.g., show error message to user)
    }
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
      current: parseFloat(resource.new_value) || 0,
    }));

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
          Resource Management Dashboard
        </h1>

        <div className="w-[100%] flex gap-8 flex-col justify-center items-center">
          <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl mx-auto transition-all duration-300 hover:shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
              Update Resource
            </h2>
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
                      onChange={(e) => {
                        field.onChange(e);
                        handleChange(e);
                      }}
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 transition duration-150 ease-in-out"
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
                  onChange={(e) => {
                    register("new_value").onChange(e);
                    handleChange(e);
                  }}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 transition duration-150 ease-in-out"
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
                  onChange={(e) => {
                    register("description").onChange(e);
                    handleChange(e);
                  }}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 transition duration-150 ease-in-out"
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
                className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out transform hover:scale-105"
              >
                Update Resource
              </button>
            </form>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl mx-auto transition-all duration-300 hover:shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
              File Upload
            </h2>
            <input
              type="file"
              onChange={handleFileUpload}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 focus:outline-none cursor-pointer border border-gray-300 rounded-md transition duration-150 ease-in-out"
            />
          </div>

          <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl mx-auto mt-12 transition-all duration-300 hover:shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
              Resource Overview
            </h2>
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
      <style jsx global>{`
        h2 {
          @apply text-2xl font-bold mb-6 text-gray-800 border-b pb-2;
        }
      `}</style>
    </>
  );
}
