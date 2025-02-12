"use client";

import ResourceComponent from "@/app/Components/ResourceComponent";
import { useEffect, useState } from "react";
const Page = () => {
  const [updateData, setUpdateData] = useState([]);
  const fetchUpdateData = async () => {
    const response = await fetch("/api/update", {
      headers: { "Content-Type": "application/json" },
      method: "GET",
      cache: "no-store",
    });

    let resData = await response.json();
    setUpdateData(resData);
  };

  useEffect(() => {
    fetchUpdateData();
  }, []);

  return (
    <section className="px-[10%]">
      <div className="grid grid-cols-7 w-full border-2 rounded-lg bg-blue-600 font-bold text-white my-5 py-5 px-5">
        <div className="col-span-2">School Name</div>
        <div>UDISE CODE</div>
        <div>
          Requested <br /> Amount
        </div>
        <div>Status</div>
        <div>Approve</div>
        <div>Reject</div>
      </div>
      <div>
        {updateData.map((item, index) => {
          return <ResourceComponent data={item} key={index} />;
        })}
      </div>
    </section>
  );
};

export default Page;
