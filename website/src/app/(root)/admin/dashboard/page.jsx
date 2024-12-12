"use client";

import BarGraphContainer from "@/app/Components/BarGraphContainer";
import DoughNutContainer from "@/app/Components/DoughNutContainer";
import Footer from "@/app/Components/Footer";
import Navbar from "@/app/Components/NavbarAdmin";
import TeacherStudentRatioChart from "@/app/Components/TeacherStudentRatioChart";
import { useEffect, useState } from "react";

export default function Page() {
  const [schoolData, setSchoolData] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const responseData = await fetch("/api/dashboard-schools");

        if (!responseData.ok) {
          throw new Error(
            `Failed to get school data: ${responseData.statusText}`
          );
        }

        const schools = await responseData.json();
        setSchoolData(schools.data);
      } catch (error) {
        console.error("Error fetching school data:", error);
      }
    };

    fetchdata(); // Call the function
  }, []);

  useEffect(() => {
    console.log(schoolData); // Log the fetched schools
  }, [schoolData]); // Log when schoolData changes

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center mt-10 mb-10 px-4 space-y-6">
        <div className="w-full max-w-5xl space-y-4">
          <div className="w-full">
            <BarGraphContainer schoolData={schoolData} />
          </div>
          <div className="w-full">
            <DoughNutContainer schoolData={schoolData} />
          </div>
          <div className="w-full">
            <TeacherStudentRatioChart schoolData={schoolData} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
