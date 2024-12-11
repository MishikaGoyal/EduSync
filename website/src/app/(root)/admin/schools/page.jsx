"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/app/Components/NavbarAdmin";

const Page = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterState, setFilterState] = useState(""); // State for filtering
  const [filteredSchools, setFilteredSchools] = useState([]); // State for filtered schools

  useEffect(() => {
    const fetchAllSchoolData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/all-school-data",
          {
            method: "GET",
          }
        );
        if (
          !response.ok ||
          !response.headers.get("content-type")?.includes("application/json")
        ) {
          throw new Error("Invalid response");
        }

        const data = await response.json();
        setSchools(data.schools || []);
        setFilteredSchools(data.schools || []); // Initialize filtered schools
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllSchoolData();
  }, []);

  // Filter schools by state
  const handleFilterChange = (state) => {
    setFilterState(state);
    if (state) {
      const filtered = schools.filter((school) =>
        school.State.toLowerCase().includes(state.toLowerCase())
      );
      setFilteredSchools(filtered);
    } else {
      setFilteredSchools(schools); // Reset to all schools when filter is cleared
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data: {error}</p>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
        <motion.h1
          className="text-4xl font-bold text-center text-indigo-600 mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          School Information
        </motion.h1>

        {/* Filter Section */}
        <div className="mb-8 flex justify-center">
          <input
            type="text"
            value={filterState}
            onChange={(e) => handleFilterChange(e.target.value)}
            placeholder="Filter by State"
            className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="overflow-x-auto shadow-2xl rounded-lg">
          <motion.table
            className="min-w-full bg-white rounded-lg border border-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <thead className="bg-gradient-to-r from-indigo-200 to-purple-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-indigo-800 uppercase tracking-wider">
                  UDISE Code
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-indigo-800 uppercase tracking-wider">
                  State
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-indigo-800 uppercase tracking-wider">
                  School Category
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-indigo-800 uppercase tracking-wider">
                  School Management
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-indigo-800 uppercase tracking-wider">
                  School Type
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-indigo-800 uppercase tracking-wider">
                  Year of Establishment
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-indigo-800 uppercase tracking-wider">
                  Total Classrooms
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-indigo-800 uppercase tracking-wider">
                  Library Available
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-indigo-800 uppercase tracking-wider">
                  Drinking Water
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-indigo-800 uppercase tracking-wider">
                  Playground
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-indigo-800 uppercase tracking-wider">
                  Electricity
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-indigo-800 uppercase tracking-wider">
                  Total Teachers
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-indigo-800 uppercase tracking-wider">
                  Total Students
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-indigo-800 uppercase tracking-wider">
                  Result
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredSchools.map((school, index) => (
                <motion.tr
                  key={index}
                  className="hover:bg-indigo-50 transition duration-300 border-b border-black"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-950">
                    {school.UDISE_CODE}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-950">
                    {school.State}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-950">
                    {school.School_Category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-950">
                    {school.School_Management}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-950">
                    {school.School_Type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-950">
                    {school.Year_of_Establishment}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-950">
                    {school.Total_Class_Rooms}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-950">
                    {school.Library_Available ? "Yes" : "No"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-950">
                    {school.Drinking_Water_Available ? "Yes" : "No"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-950">
                    {school.Playground_Available ? "Yes" : "No"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-950">
                    {school.Electricity_Availability ? "Yes" : "No"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-950">
                    {school.Total_Teachers}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-950">
                    {school.Total_Students}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm font-bold ${
                      school.Result.toLowerCase() === "odd"
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {school.Result}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </motion.table>
        </div>
      </div>
    </>
  );
};

export default Page;
