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
  const [filterUDISE, setFilterUDISE] = useState([]);
  const [filterResult, setFilterResult] = useState([]);
  const [filters, setFilters] = useState([]);

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
        setFilteredSchools(sortSchools(data.schools) || []); // Initialize filtered schools
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllSchoolData();
  }, []);
  const sortSchools = (schools) => {
    return schools.sort((a, b) => {
      // First compare by state
      const stateComparison = a.State.localeCompare(b.State);
      if (stateComparison !== 0) return stateComparison;

      // If states are the same, compare by school name
      return a.School_Name.localeCompare(b.School_Name);
    });
  };
  const handleFilterChange = () => {
    let filtered = schools;

    // Filter by state
    if (filterState) {
      filtered = filtered.filter((school) =>
        school.State.toLowerCase().includes(filterState.toLowerCase())
      );
    }

    // Filter by UDISE code (ignoring spaces)
    if (filterUDISE) {
      const udiseFilter = filterUDISE.toString().replace(/\s+/g, ""); // Convert to string and remove spaces
      filtered = filtered.filter((school) =>
        school.UDISE_CODE.toString().replace(/\s+/g, "").includes(udiseFilter)
      );
    }

    // Filter by result
    if (filterResult && typeof filterResult === "string") {
      filtered = filtered.filter(
        (school) => school.Result.toLowerCase() === filterResult.toLowerCase()
      );
    }

    // Filter by checkboxes (Playground, Electricity, Drinking Water)
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        filtered = filtered.filter((school) => school[key] === true);
      }
    });
    filtered = sortSchools(filtered);
    setFilteredSchools(filtered);
  };

  useEffect(() => {
    handleFilterChange();
  }, [filterState, filterUDISE, filterResult, filters]);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: checked,
    }));
    handleFilterChange(); // Call to update filtered schools immediately
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
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <input
              type="text"
              value={filterState}
              onChange={(e) => setFilterState(e.target.value)}
              placeholder="Filter by State"
              aria-label="Filter by State"
              className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <input
              type="text"
              value={filterUDISE}
              onChange={(e) => setFilterUDISE(e.target.value)}
              placeholder="Filter by UDISE Code"
              aria-label="Filter by UDISE Code"
              className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <input
              type="text"
              value={filterResult}
              onChange={(e) => setFilterResult(e.target.value)}
              placeholder="Filter by Result"
              aria-label="Filter by Result"
              className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-4 mt-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="Playground_Available"
                checked={filters.Playground_Available || false}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Playground
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="Electricity_Availability"
                checked={filters.Electricity_Availability || false}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Electricity
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="Drinking_Water_Available"
                checked={filters.Drinking_Water_Available || false}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Drinking Water
            </label>
          </div>
        </div>

        {/* Table */}
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
                  School Name
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
                  Teacher
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
                    {school.School_Name}
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
