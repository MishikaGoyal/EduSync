"use client";
import Navbar from "@/app/Components/NavbarAdmin";
import UpdateComponent from "@/app/Components/UpdateComponent";
import { useEffect, useState } from "react";
const page = () => {
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
      <Navbar />
      <div className="grid grid-cols-5 w-full border-2 rounded-lg bg-blue-600 font-bold text-white my-5 py-5 px-5">
        <div className="col-span-2">School Name</div>
        <div>UDISE CODE</div>
        <div>Status</div>
        <div></div>
      </div>
      <div>
        {updateData.map((item, index) => {
          return <UpdateComponent data={item} key={index} />;
        })}
      </div>
    </section>
  );
};

export default page;
