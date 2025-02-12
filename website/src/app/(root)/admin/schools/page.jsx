"use client";
import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/app/Components/NavbarAdmin";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
  InputBase,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

import { useTheme } from "@emotion/react";
import IconButton from "@mui/material";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
// Previous TablePaginationActions component remains the same

const Page = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Extended filter states
  const [filterState, setFilterState] = useState("");
  const [filterSchoolCategory, setFilterSchoolCategory] = useState("");
  const [filterBoundaryWall, setFilterBoundaryWall] = useState("");
  const [filterLibrary, setFilterLibrary] = useState("");
  const [filterDrinkingWater, setFilterDrinkingWater] = useState("");
  const [filterPlayground, setFilterPlayground] = useState("");
  const [filterElectricity, setFilterElectricity] = useState("");
  const [filterCWSN, setFilterCWSN] = useState("");
  const [searchSchoolName, setSearchSchoolName] = useState(""); // New state for searching school by name

  const [filteredSchools, setFilteredSchools] = useState([]);
  const [sortType, setSortType] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isAlphabeticallySorted, setIsAlphabeticallySorted] = useState(false); // For alphabetical sorting

  useEffect(() => {
    const fetchAllSchoolData = async () => {
      try {
        const response = await fetch("/api/all-school-data", {
          method: "GET",
        });
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

  // Comprehensive filter function
  const applyFilters = useCallback(() => {
    let result = schools;

    // Apply each filter conditionally
    if (filterState) {
      result = result.filter((school) =>
        school.State.toLowerCase().includes(filterState.toLowerCase())
      );
    }

    if (filterSchoolCategory) {
      result = result.filter(
        (school) => school.School_Category === filterSchoolCategory
      );
    }

    if (filterBoundaryWall !== "") {
      result = result.filter(
        (school) => school.Boundary_Wall.toString() === filterBoundaryWall
      );
    }

    if (filterLibrary !== "") {
      result = result.filter(
        (school) => school.Library_Available.toString() === filterLibrary
      );
    }

    if (filterDrinkingWater !== "") {
      result = result.filter(
        (school) =>
          school.Drinking_Water_Available.toString() === filterDrinkingWater
      );
    }

    if (filterPlayground !== "") {
      result = result.filter(
        (school) => school.Playground_Available.toString() === filterPlayground
      );
    }

    // Search by school name
    if (searchSchoolName) {
      result = result.filter((school) =>
        school.School_Name.toLowerCase().includes(
          searchSchoolName.toLowerCase()
        )
      );
    }

    if (filterElectricity !== "") {
      result = result.filter(
        (school) =>
          school.Electricity_Availability.toString() === filterElectricity
      );
    }

    if (filterCWSN !== "") {
      result = result.filter((school) => school.CWSN.toString() === filterCWSN);
    }
    // Sorting based on odd or standard (even)
    if (sortType === "odd") {
      result = result.filter((school) => school.Result === "ODD");
    } else if (sortType === "standard") {
      result = result.filter((school) => school.Result === "Standard");
    }

    if (isAlphabeticallySorted) {
      result = result.sort((a, b) =>
        a.School_Name.localeCompare(b.School_Name)
      );
    }
    setFilteredSchools(result);
    setPage(0);
  }, [
    schools,
    filterState,
    filterSchoolCategory,
    filterBoundaryWall,
    filterLibrary,
    filterDrinkingWater,
    filterPlayground,
    filterElectricity,
    filterCWSN,
    searchSchoolName,
    sortType,
    isAlphabeticallySorted,
  ]);

  // Run filters whenever any filter changes
  useEffect(() => {
    applyFilters();
  }, [
    filterState,
    filterSchoolCategory,
    filterBoundaryWall,
    filterLibrary,
    filterDrinkingWater,
    filterPlayground,
    filterElectricity,
    filterCWSN,
    searchSchoolName,
    sortType, // Add sortType to dependency array
    isAlphabeticallySorted,
    applyFilters,
  ]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Reset all filters
  const resetFilters = () => {
    setFilterState("");
    setFilterSchoolCategory("");
    setFilterBoundaryWall("");
    setFilterLibrary("");
    setFilterDrinkingWater("");
    setFilterPlayground("");
    setFilterElectricity("");
    setFilterCWSN("");
    setSortType(""); // Reset sort type
    setFilteredSchools(schools);
    setIsAlphabeticallySorted(false);
    setSearchSchoolName(""); // Reset search term
  };

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

        {/* Advanced Filter Section */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* State Filter */}
          <InputBase
            value={filterState}
            onChange={(e) => setFilterState(e.target.value)}
            placeholder="Filter by State"
            sx={{
              px: 2,
              py: 1,
              border: "1px solid gray",
              borderRadius: "4px",
            }}
          />

          <InputBase
            value={searchSchoolName}
            onChange={(e) => setSearchSchoolName(e.target.value)}
            placeholder="Search by School Name"
            sx={{
              px: 2,
              py: 1,
              border: "1px solid gray",
              borderRadius: "4px",
            }}
          />

          {/* School Category Filter */}
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Structure</InputLabel>
            <Select
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
              label="Sort by Structure"
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="odd">Odd </MenuItem>
              <MenuItem value="standard">Standard</MenuItem>
            </Select>
          </FormControl>

          {/* Boolean Filters */}
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Boundary Wall</InputLabel>
            <Select
              value={filterBoundaryWall}
              onChange={(e) => setFilterBoundaryWall(e.target.value)}
              label="Boundary Wall"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="true">Yes</MenuItem>
              <MenuItem value="false">No</MenuItem>
            </Select>
          </FormControl>

          <FormControl variant="outlined" fullWidth>
            <InputLabel>Library</InputLabel>
            <Select
              value={filterLibrary}
              onChange={(e) => setFilterLibrary(e.target.value)}
              label="Library"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="true">Available</MenuItem>
              <MenuItem value="false">Not Available</MenuItem>
            </Select>
          </FormControl>

          <FormControl variant="outlined" fullWidth>
            <InputLabel>Drinking Water</InputLabel>
            <Select
              value={filterDrinkingWater}
              onChange={(e) => setFilterDrinkingWater(e.target.value)}
              label="Drinking Water"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="true">Available</MenuItem>
              <MenuItem value="false">Not Available</MenuItem>
            </Select>
          </FormControl>

          <FormControl variant="outlined" fullWidth>
            <InputLabel>Playground</InputLabel>
            <Select
              value={filterPlayground}
              onChange={(e) => setFilterPlayground(e.target.value)}
              label="Playground"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="true">Available</MenuItem>
              <MenuItem value="false">Not Available</MenuItem>
            </Select>
          </FormControl>

          {/* Reset Filters Button */}
          <button
            onClick={resetFilters}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
          >
            Reset Filters
          </button>
        </div>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 1200 }} aria-label="school information table">
            <thead className="bg-gradient-to-r from-indigo-200 to-purple-200">
              <tr>
                <th className="pr-[6rem] pl-[1rem]  py-2 text-left text-sm font-medium text-indigo-800 uppercase">
                  UDISE Code
                </th>
                <th className="pr-[10rem] pl-[1rem] w-[12rem] py-2 text-left text-sm font-medium text-indigo-800 uppercase">
                  School Name
                </th>
                <th className="pr-[6rem] pl-[1rem] w-[10rem] py-2 text-left text-sm font-medium text-indigo-800 uppercase">
                  State
                </th>
                <th className="px-6 w-[10rem] py-2 text-left text-sm font-medium text-indigo-800 uppercase">
                  Category
                </th>
                <th className="px-6 w-[10rem] py-2 text-left text-sm font-medium text-indigo-800 uppercase">
                  Boundary Wall
                </th>
                <th className="px-6 w-[10rem] py-2 text-left text-sm font-medium text-indigo-800 uppercase">
                  Library
                </th>
                <th className="px-6 w-[12rem] py-2 text-left text-sm font-medium text-indigo-800 uppercase">
                  Total Classrooms
                </th>
                <th className="px-6 w-[12rem] py-2 text-left text-sm font-medium text-indigo-800 uppercase">
                  Drinking Water
                </th>
                <th className="px-6 w-[12rem] py-2 text-left text-sm font-medium text-indigo-800 uppercase">
                  Playground
                </th>
                <th className="px-6 w-[12rem] py-2 text-left text-sm font-medium text-indigo-800 uppercase">
                  Electricity
                </th>
                <th className="px-6 w-[12rem] py-2 text-left text-sm font-medium text-indigo-800 uppercase">
                  Total Teachers
                </th>
                <th className="px-6 w-[12rem] py-2 text-left text-sm font-medium text-indigo-800 uppercase">
                  CWSN
                </th>
                <th className="px-6 w-[12rem] py-2 text-left text-sm font-medium text-indigo-800 uppercase">
                  Total Students
                </th>
                <th className="px-6 w-[12rem] py-2 text-left text-sm font-medium text-indigo-800 uppercase">
                  Result
                </th>
              </tr>
            </thead>

            <TableBody>
              {filteredSchools
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((school, index) => (
                  <motion.tr
                    key={index}
                    className={`transition duration-300 border-b border-gray-200`}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <TableCell sx={{ width: 200 }}>
                      {school.UDISE_CODE}
                    </TableCell>{" "}
                    {/* Increase width of UDISE Code */}
                    <TableCell>{school.School_Name}</TableCell>
                    <TableCell>{school.State}</TableCell>
                    <TableCell>{school.School_Category}</TableCell>
                    <TableCell>{school.Boundary_Wall ? "Yes" : "No"}</TableCell>
                    <TableCell>
                      {school.Library_Available ? "Yes" : "No"}
                    </TableCell>
                    <TableCell>{school.Total_Class_Rooms}</TableCell>
                    <TableCell>
                      {school.Drinking_Water_Available ? "Yes" : "No"}
                    </TableCell>
                    <TableCell>
                      {school.Playground_Available ? "Yes" : "No"}
                    </TableCell>
                    <TableCell>
                      {school.Electricity_Availability ? "Yes" : "No"}
                    </TableCell>
                    <TableCell>{school.Total_Teachers}</TableCell>
                    <TableCell>{school.CWSN ? "Yes" : "No"}</TableCell>
                    <TableCell>{school.Total_Students}</TableCell>
                    <TableCell>
                      <div
                        className={`${
                          school.Result === "ODD"
                            ? "text-red-500"
                            : "text-green-500"
                        } font-bold`}
                      >
                        {school.Result}
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={14}
                  count={filteredSchools.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default Page;
