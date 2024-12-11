"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "@/app/Components/Footer";
import Navbar from "@/app/Components/NavbarPrincipal";

function Page() {
  const [inputData, setInputData] = useState(null); // For storing fetched school data
  const [result, setResult] = useState(null);
  const [udiseId, setUdiseId] = useState(null);
  const [loadingData, setLoadingData] = useState(true);
  const [loadingResult, setLoadingResult] = useState(false);

  // Get the UDISE ID from session storage and fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      const id = sessionStorage.getItem("udiseId");
      if (id) {
        console.log("Fetched UDISE ID:", id); // Log UDISE ID
        setUdiseId(id);
        try {
          console.log("Sending request with UDISE ID:", id); // Log request body
          const response = await fetch("/api/school-data", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({ udiseId: id }), // Ensure this is correct
          });

          if (!response.ok) {
            console.error(
              "Error in fetching school data:",
              response.statusText
            );
          } else {
            const data = await response.json();
            setInputData(data);
          }
        } catch (error) {
          console.error("Error during fetch:", error);
        } finally {
          setLoadingData(false);
        }
      } else {
        console.error("No UDISE ID found in session storage.");
        setLoadingData(false);
      }
    };

    fetchData();
  }, []);

  // Function to handle algorithm calculation
  const handleAlgorithm = async () => {
    if (!inputData || !inputData.data) {
      alert("Fetch the school data first");
      console.error("No data available to pass to the algorithm.");
      return;
    }

    setLoadingResult(true);
    try {
      const response = await axios.post("/api/algorithm", inputData.data); // Pass only the `data` part of the fetched data
      setResult(response.data);
      console.log(response.data); // Log response data directly
    } catch (error) {
      console.error("Error sending data:", error);
    } finally {
      setLoadingResult(false);
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
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Main content area */}
      <div className="flex flex-col items-center flex-grow mt-4 p-6">
        <h1 className="text-3xl font-bold text-gray-700 mb-4">
          Grant Calculation Page
        </h1>

        {/* Button for algorithm */}
        <div className="flex space-x-4 mt-4 mb-6">
          <button
            onClick={handleAlgorithm}
            className="px-4 py-2 bg-blue-500 text-white rounded shadow-md hover:bg-blue-600 transition"
            disabled={loadingResult}
          >
            {loadingResult ? "Calculating..." : "Calculate Output"}
          </button>
        </div>

        {/* Display fetched school data */}
        {loadingData ? (
          <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-4 mb-6">
            <h2 className="text-xl font-semibold mb-2 text-gray-600">
              Loading School Data...
            </h2>
            <div className="animate-pulse">
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
            </div>
          </div>
        ) : (
          inputData && (
            <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-4 mb-6">
              <h2 className="text-xl font-semibold mb-2 text-gray-700">
                School Data
              </h2>
              <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 bg-gray-100">
                      Property
                    </th>
                    <th className="border border-gray-300 px-4 py-2 bg-gray-100">
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(inputData.data)
                    .filter(([key]) => !excludeKeys.includes(key)) // Filter out excluded keys
                    .map(([key, value]) => (
                      <tr key={key}>
                        <td className="border border-gray-300 px-4 py-2 text-gray-600">
                          {key}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-gray-600">
                          {String(value)}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )
        )}

        {/* Display result from the algorithm */}
        {loadingResult ? (
          <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-4 mb-6">
            <h2 className="text-xl font-semibold mb-2 text-gray-600">
              Calculating Grants...
            </h2>
            <div className="animate-pulse">
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
            </div>
          </div>
        ) : (
          result && (
            <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-4 mb-6">
              <h2 className="text-xl font-semibold mb-2 text-gray-700">
                Grants
              </h2>
              {typeof result.eligible === "string" ? (
                <div className="text-red-500 font-bold">{result.eligible}</div>
              ) : (
                <table className="table-auto w-full border-collapse border border-gray-300">
                  <thead>
                    <tr>
                      <th className="border border-gray-300 px-4 py-2 bg-gray-100">
                        Grant Type
                      </th>
                      <th className="border border-gray-300 px-4 py-2 bg-gray-100">
                        Details
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(result).map(([key, value]) => (
                      <tr key={key}>
                        <td className="border border-gray-300 px-4 py-2 text-gray-600">
                          {key}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-gray-600">
                          {String(value)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )
        )}
      </div>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
}

export default Page;
