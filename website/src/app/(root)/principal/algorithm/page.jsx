"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "@/app/Components/Footer";
import Navbar from "@/app/Components/NavbarAdmin";

function Page() {
  const [inputData, setInputData] = useState(null); // For storing fetched school data
  const [result, setResult] = useState(null);
  const [udiseId, setUdiseId] = useState(null);

  // Get the UDISE ID from session storage on component mount
  useEffect(() => {
    const id = sessionStorage.getItem("udiseId");
    if (id) {
      console.log("Fetched UDISE ID:", id); // Log UDISE ID
      setUdiseId(id);
    } else {
      console.error("No UDISE ID found in session storage.");
    }
  }, []);

  // Function to fetch new data based on the UDISE ID
  const getNewData = async () => {
    if (!udiseId) {
      console.error("No UDISE ID found.");
      return;
    }

    try {
      console.log("Sending request with UDISE ID:", udiseId); // Log request body
      const response = await fetch("/api/school-data", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ udiseId: udiseId }), // Ensure this is correct
      });

      if (!response.ok) {
        console.error("Error in fetching school data:", response.statusText);
      } else {
        const data = await response.json();
        setInputData(data);
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  // Function to handle algorithm calculation
  const handleAlgorithm = async () => {
    if (!inputData || !inputData.data) {
      alert("Fetch the school data first");
      console.error("No data available to pass to the algorithm.");
      return;
    }

    try {
      const response = await axios.post("/api/algorithm", inputData.data); // Pass only the `data` part of the fetched data
      setResult(response.data);
      console.log(response.data); // Log response data directly
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  // Define the keys you want to exclude for inputData
  const excludeKeys = [
    "id",
    "Library_Available",
    "Separate_Room_for_HM",
    "Drinking_Water_Available",
    "Playground_Available",
    "Electricity_Availability",
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Main content area */}
      <div className="flex flex-col items-center flex-grow mt-4 p-6">
        <h1 className="text-2xl font-bold mb-4">Grant Calculation Page</h1>

        {/* Align buttons in a row with some space between them */}
        <div className="flex space-x-4 mt-4 mb-6">
          {/* Button for algorithm */}
          <button onClick={handleAlgorithm} className="btn btn-outline">
            Calculate Output
          </button>

          {/* Button for fetching new data */}
          <button className="btn btn-outline" onClick={getNewData}>
            Fetch School Data
          </button>
        </div>

        {/* Display fetched school data */}
        {inputData && (
          <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-4 mb-6">
            <h2 className="text-xl font-semibold mb-2">School Data</h2>
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Property</th>
                  <th className="border border-gray-300 px-4 py-2">Value</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(inputData.data)
                  .filter(([key]) => !excludeKeys.includes(key)) // Filter out excluded keys
                  .map(([key, value]) => (
                    <tr key={key}>
                      <td className="border border-gray-300 px-4 py-2">
                        {key}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {String(value)}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Display result from the algorithm */}
        {result && (
          <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-4 mb-6">
            <h2 className="text-xl font-semibold mb-2">Grants</h2>
            {typeof result.eligible === "string" ? (
              <div className="text-red-500 font-bold">{result.eligible}</div>
            ) : (
              <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">
                      Grant Type
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(result).map(([key, value]) => (
                    <tr key={key}>
                      <td className="border border-gray-300 px-4 py-2">
                        {key}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {String(value)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
}

export default Page;
