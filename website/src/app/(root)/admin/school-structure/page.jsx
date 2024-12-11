import Navbar from "@/app/Components/NavbarAdmin";
import React from "react";

function page() {
  return (
    <div>
      <Navbar />
      <input
        type="file"
        className="file-input file-input-bordered w-full max-w-xs"
      />
    </div>
  );
}

export default page;
