"use client";

import { useEffect, useState } from "react";
import UpdatesDisplay from "../../../Components/UpdatesDisplay";

const Page = () => {
  const [updatesData, setUpdatesData] = useState([]);

  useEffect(() => {
    fetchRequestData();
  }, []);

  const fetchRequestData = async () => {
    const response = await fetch("/api/admin-update-data", {
      method: "GET",
      headers: { "content-type": "application/json" },
    });

    const resData = await response.json();
    console.log(resData);
    setUpdatesData(resData);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <UpdatesDisplay updatesData={updatesData} />
    </div>
  );
};

export default Page;
