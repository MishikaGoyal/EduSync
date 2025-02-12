"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import Navbar from "@/app/Components/NavbarPrincipal";
export default function SchoolDashboard() {
  const [schoolData, setSchoolData] = useState(null);
  const [reason, setReason] = useState(null);
  const [suggestions, setSuggestions] = useState(null);
  const [loading, setLoading] = useState(true);

  const generateReason = useCallback(async () => {
    try {
      const response = await fetch("/api/reasons", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(schoolData),
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error("Error in fetching reasons");
      }
      const resData = await response.json();
      setReason(resData);
    } catch (error) {
      console.error("Error generating reasons:", error);
    }
  }, [schoolData]);
  const generateSuggestions = useCallback(async () => {
    try {
      const response = await fetch("/api/suggestions", {
        headers: {
          "Content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(schoolData),
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error("Error in generating suggestions");
      }
      const resData = await response.json();
      setSuggestions(resData);
    } catch (error) {
      console.error("Error generating suggestions:", error);
    }
  }, [schoolData]);

  useEffect(() => {
    const fetchAllData = async () => {
      const id = sessionStorage.getItem("udiseId");
      if (id) {
        await fetchSchoolData(id);
      }
      setLoading(false);
    };

    fetchAllData();
  }, []);

  useEffect(() => {
    if (schoolData) {
      generateReason();
      generateSuggestions();
    }
  }, [schoolData, generateReason, generateSuggestions]);
  const formatText = (text) => {
    if (typeof text !== "string") return null; // Safeguard for non-string inputs
    return text.split("\n\n").map((paragraph, index) => (
      <p key={index} className="mb-4 text-gray-700 leading-relaxed">
        {paragraph}
      </p>
    ));
  };

  const fetchSchoolData = async (id) => {
    try {
      const response = await fetch("/api/school-data", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ udiseId: id }),
      });
      if (!response.ok) {
        throw new Error("Error in fetching school data");
      }
      const data = await response.json();
      setSchoolData(data.data);
    } catch (error) {
      console.error("Error fetching school data:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="animate-pulse">
            <div className="h-32 bg-gray-200 rounded-lg mb-8"></div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(9)].map((_, index) => (
                <div key={index} className="h-24 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="mb-8 bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-blue-500 text-white p-4">
                <h2 className="text-2xl font-bold">School Dashboard</h2>
              </div>
              <div className="p-6">
                <div className="mb-4 flex justify-between">
                  <h2 className="text-2xl font-bold text-blue-500">
                    {schoolData?.School_Name}
                  </h2>
                  <h2 className="text-2xl font-bold text-blue-500">
                    {schoolData?.UDISE_CODE}
                  </h2>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <StatCard
                    title="State"
                    value={schoolData?.State}
                    color="text-blue-500"
                  />
                  <StatCard
                    title="Teachers"
                    value={schoolData?.Total_Teachers}
                    color="text-blue-500"
                  />
                  <StatCard
                    title="Students"
                    value={schoolData?.Total_Students}
                    color="text-green-500"
                  />
                  <StatCard
                    title="Classrooms"
                    value={schoolData?.Total_Class_Rooms}
                    color="text-blue-500"
                  />
                  <StatCard
                    title="Grades"
                    value={schoolData?.Grade_Configuration}
                    color="text-blue-500"
                  />
                  <FacilityCard
                    title="Library"
                    available={schoolData?.Library_Available === "1"}
                  />
                  <FacilityCard
                    title="Drinking Water"
                    available={schoolData?.Drinking_Water_Available === "1"}
                  />
                  <FacilityCard
                    title="Playground"
                    available={schoolData?.Playground_Available === "1"}
                  />
                  <FacilityCard
                    title="Electricity"
                    available={schoolData?.Electricity_Availability === "1"}
                  />
                  <FacilityCard
                    title="Boundary Wall"
                    available={schoolData?.Boundary_Wall === "1"}
                  />
                  <StatCard
                    title="Male-Female Washrooms"
                    value={schoolData?.Total_Washrooms}
                    color="text-blue-500"
                  />

                  <StatCard
                    title="Severity"
                    value={schoolData?.Severity}
                    color="text-blue-500"
                  />
                </div>
              </div>
              <div
                className={`${
                  schoolData?.Result === "ODD"
                    ? "text-red-500"
                    : " text-green-500"
                } font-bold text-2xl text-center border py-5 px-2 m-5 rounded-lg shadow-md`}
              >
                Your School is {schoolData?.Result}
              </div>
            </div>

            <div className="mb-8 bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 border-b">
                <h3 className="text-xl font-bold text-blue-700">Analysis</h3>
              </div>
              <div className="p-4">
                {!reason || !suggestions ? (
                  <div className="animate-pulse space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                ) : (
                  <>
                    {reason && (
                      <div className="mb-6">
                        <h3 className="mb-2 text-lg font-semibold text-gray-700">
                          Reasons for Classification:
                        </h3>
                        <ul className="list-inside list-disc space-y-2 text-gray-600">
                          {reason.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {suggestions && (
                      <div>
                        <h3 className="mb-2 text-lg font-semibold text-gray-700">
                          Suggestions for Improvement:
                        </h3>
                        <div className="text-gray-600">
                          {formatText(suggestions)}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

function StatCard({ title, value, color }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
      <h3 className="mb-2 text-lg font-semibold text-gray-600">{title}</h3>
      {value === undefined ? (
        <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
      ) : (
        <span className={`text-4xl font-bold ${color}`}>{value}</span>
      )}
    </div>
  );
}

function FacilityCard({ title, available }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
      <h3 className="mb-2 text-lg font-semibold text-gray-600">{title}</h3>
      {available === undefined ? (
        <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
      ) : (
        <div className="flex items-center">
          <span
            className={`mr-2 text-lg font-semibold ${
              available ? "text-green-500" : "text-red-500"
            }`}
          >
            {available ? "Available" : "Not Available"}
          </span>
          <div className="w-16 bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${
                available ? "bg-green-500" : "bg-red-500"
              }`}
              style={{ width: available ? "100%" : "0%" }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}
