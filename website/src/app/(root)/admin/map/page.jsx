"use client";
import IndiaMapDatamaps from "@/app/Components/IndiaMapDatamaps";
import Navbar from "@/app/Components/NavbarAdmin";
import React from "react";

function page() {
  return (
    <div>
      <Navbar />
      <div className="w-full max-w-4xl space-y-4">
        <div className="map-section">
          <IndiaMapDatamaps />
        </div>
      </div>
    </div>
  );
}

export default page;
