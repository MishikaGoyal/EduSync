"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/app/Components/NavbarAdmin";

const Page = () => {
  const [expandedSchool, setExpandedSchool] = useState(null);
  const [schools, setSchools] = useState([]);
  const [filteredSchools, setFilteredSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    state: "",
    category: "",
    schoolType: "",
    search: "",
  });

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
        setFilteredSchools(data.schools || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllSchoolData();
  }, []);

  useEffect(() => {
    const filterSchools = () => {
      let filtered = schools;

      if (filters.state) {
        filtered = filtered.filter(
          (school) => school.State.toLowerCase() === filters.state.toLowerCase()
        );
      }

      if (filters.category) {
        filtered = filtered.filter(
          (school) =>
            school.School_Category.toLowerCase() ===
            filters.category.toLowerCase()
        );
      }

      if (filters.schoolType) {
        filtered = filtered.filter(
          (school) =>
            school.School_Type.toLowerCase() ===
            filters.schoolType.toLowerCase()
        );
      }

      if (filters.search) {
        filtered = filtered.filter((school) =>
          school.UDISE_CODE.toString()
            .toLowerCase()
            .includes(filters.search.toLowerCase())
        );
      }

      setFilteredSchools(filtered);
    };

    filterSchools();
  }, [filters, schools]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
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

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <div>
            <select
              name="state"
              value={filters.state}
              onChange={handleFilterChange}
              className="px-4 py-2 border rounded-md text-gray-600"
            >
              <option value="">Filter by State</option>
              {[...new Set(schools.map((school) => school.State))].map(
                (state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                )
              )}
            </select>
          </div>
          <div>
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="px-4 py-2 border rounded-md text-gray-600"
            >
              <option value="">Filter by Category</option>
              {[
                ...new Set(schools.map((school) => school.School_Category)),
              ].map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              name="schoolType"
              value={filters.schoolType}
              onChange={handleFilterChange}
              className="px-4 py-2 border rounded-md text-gray-600"
            >
              <option value="">Filter by School Type</option>
              {[...new Set(schools.map((school) => school.School_Type))].map(
                (type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                )
              )}
            </select>
          </div>

          {/* Search */}
          <div className="relative">
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Search by UDISE Code"
              className="px-4 py-2 border rounded-md text-gray-600"
            />
            <span className="absolute top-2 right-3 text-gray-400">🔍</span>
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
                  State
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-indigo-800 uppercase tracking-wider">
                  School Category
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-indigo-800 uppercase tracking-wider">
                  School Type
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-indigo-800 uppercase tracking-wider">
                  Total Classrooms
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
                    {school.School_Type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-950">
                    {school.Total_Class_Rooms}
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
