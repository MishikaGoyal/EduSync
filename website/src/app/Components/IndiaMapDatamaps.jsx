import React, { useState, useMemo, useEffect } from "react";
import DatamapsIndia from "react-datamaps-india";
import { aggregateSchoolData } from "../lib/aggregateSchoolData"; // Assuming aggregateSchoolData is a utility function for aggregation

const IndiaMapDatamaps = () => {
  const [selectedStateData, setSelectedStateData] = useState(null);
  const [schoolData, setSchoolData] = useState([]); // State to store fetched data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Store hover state for the map (to stop flickering)
  const [hoverState, setHoverState] = useState(null);

  // Fetch school data from the API
  useEffect(() => {
    const fetchSchoolData = async () => {
      try {
        const response = await fetch("/api/dashboard-schools");
        const result = await response.json();

        if (result.success) {
          setSchoolData(result.data); // Store the fetched data
        } else {
          setError("Failed to fetch school data.");
        }
      } catch (err) {
        setError("An error occurred while fetching school data.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchSchoolData();
  }, []);

  // Aggregate school data once the data is fetched
  const aggregatedData = useMemo(() => {
    if (schoolData.length > 0) {
      return aggregateSchoolData(schoolData);
    }
    return {}; // Return empty object if no data is available
  }, [schoolData]);

  // Memoize the regionData to avoid recalculating on every render
  const regionData = useMemo(() => {
    return Object.keys(aggregatedData).reduce((acc, state) => {
      const { ODD, STANDARD } = aggregatedData[state];
      acc[state] = {
        value: ODD + STANDARD, // Total number of schools
        tooltip: {
          body: [
            `${state}`, // Display the state name
            `ODD Schools: ${ODD}`,
            `STANDARD Schools: ${STANDARD}`,
          ],
        },
      };
      return acc;
    }, {});
  }, [aggregatedData]);

  // Handle state click
  const handleStateClick = (state) => {
    const stateData = aggregatedData[state];
    setSelectedStateData({
      state: state,
      total: stateData.ODD + stateData.STANDARD,
      odd: stateData.ODD,
      standard: stateData.STANDARD,
    });
  };

  const handleMouseEnter = (state) => {
    setHoverState(state); // Set the hovered state
  };

  const handleMouseLeave = () => {
    setHoverState(null); // Reset hover state
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ width: "60%", margin: "0 auto", maxWidth: "500px" }}>
      <DatamapsIndia
        regionData={regionData} // Pass the aggregated data
        hoverComponent={({ value, mouseX, mouseY }) => {
          const tooltip = value.tooltip ? value.tooltip.body : [];
          return (
            <div
              className="HoverInfo"
              style={{
                position: "absolute",
                left: `${mouseX + 5}px`, // Adjust offset (e.g., +5px for closer positioning)
                top: `${mouseY + 5}px`, // Adjust offset similarly
                pointerEvents: "none", // Ensure it doesn’t interfere with hover events
                zIndex: 1000,
              }}
            >
              <div>{value.name}</div>
              {tooltip.length > 1 && (
                <>
                  <div>{tooltip[1]}</div>
                  <div>{tooltip[2]}</div>
                </>
              )}
            </div>
          );
        }}
        mapLayout={{
          colors: ["#008000", "#FFFF00", "#0000FF"],
          hoverTitle: "Count",
          noDataColor: "#e6f0ed",
          borderColor: "black",
          height: 50,
          weight: 50,
        }}
        onClick={handleStateClick}
        onMouseEnter={handleMouseEnter} // Handle hover enter
        onMouseLeave={handleMouseLeave} // Handle hover leave
      />

      {/* Hover info styling */}
      {hoverState && (
        <div
          className="HoverInfo"
          style={{
            position: "fixed",
            top: "222px", // You can dynamically set the position based on mouse position
            left: "307px", // Dynamically set this as well
            display: hoverState ? "block" : "none", // Show or hide based on hoverState
          }}
        >
          <div>
            <div>{hoverState}</div> {/* Dynamically display state name */}
            {/* Additional info can go here */}
          </div>
          <style>
            {`
              .HoverInfo {
                position: fixed;
                min-width: 8ch;
                background-color: white;
                box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.3);
                padding: 7px;
                border-radius: 4px;
              }
              .HoverInfo p {
                margin: 0;
                font-size: 0.9em;
              }
            `}
          </style>
        </div>
      )}

      {/* Display the clicked state data */}
      {selectedStateData && (
        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            border: "1px solid #ccc",
          }}
        >
          <h2>{selectedStateData.state}</h2>
          <p>{`Total Schools: ${selectedStateData.total}`}</p>
          <p>{`ODD Schools: ${selectedStateData.odd}`}</p>
          <p>{`STANDARD Schools: ${selectedStateData.standard}`}</p>
        </div>
      )}
    </div>
  );
};

export default IndiaMapDatamaps;
