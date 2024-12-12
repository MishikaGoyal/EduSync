import React, { useState, useMemo } from "react";
import DatamapsIndia from "react-datamaps-india";
import { aggregateSchoolData } from "../lib/aggregateSchoolData";
import { new_SSData } from "../lib/new_SS";

const IndiaMapDatamaps = () => {
  const [selectedStateData, setSelectedStateData] = useState(null);

  // Aggregate school data
  const aggregatedData = useMemo(() => aggregateSchoolData(new_SSData), [new_SSData]);

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

  return (
    <div style={{ width: "60%", margin: "0 auto", maxWidth: "500px" }}>
      <DatamapsIndia
        regionData={regionData} // Pass the aggregated data
        hoverComponent={({ value }) => {
          const tooltip = value.tooltip ? value.tooltip.body : [];

          return (
            <div>
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
      />

      {/* Display the clicked state data */}
      {selectedStateData && (
        <div style={{ marginTop: "20px", padding: "20px", border: "1px solid #ccc" }}>
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
