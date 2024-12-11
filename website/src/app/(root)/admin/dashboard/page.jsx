"use client";

import BarGraphContainer from "@/app/Components/BarGraphContainer";
import DoughNutContainer from "@/app/Components/DoughNutContainer";
import Footer from "@/app/Components/Footer";
import Navbar from "@/app/Components/NavbarAdmin";
import TeacherStudentRatioChart from "@/app/Components/TeacherStudentRatioChart";

export default function Page() {
    return (
        <div>
            <Navbar />
            <div className="flex flex-col items-center justify-center mt-10 mb-10 px-4 space-y-6">
                {/* Container for multiple charts */}
                <div className="w-full max-w-5xl space-y-4">
                    {/* Bar Graph */}
                    <div className="w-full">
                        <BarGraphContainer />
                    </div>
                    <div className="w-full">
                        <DoughNutContainer />
                    </div>
                    <div className="w-full">
                        <TeacherStudentRatioChart />
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
