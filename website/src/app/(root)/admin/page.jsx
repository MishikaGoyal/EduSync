"use client";
import { useState } from "react";
import Navbar1 from "@/app/Components/NavbarAdmin";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/app/Components/Footer";
import Chatbot from "@/app/Components/Chatbot";

export default function AdminPage() {
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [file, setFile] = useState(null);

  const handleFileChange = (event) => setFile(event.target.files[0]);

  const handleSubmit = async () => {
    if (!file) {
      alert("You need to upload a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/result", {
        cache: "no-store",
        method: "POST",
        body: formData,
      });
      const responseData = await response.json();
      setIsModalOpen(false);
      console.log(responseData);
      if (responseData.flag === false) {
        alert("Data already exists");
      } else if (responseData.flag === true) {
        alert("Data added succesfully");
      } else {
        alert("Error is uploading data");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="min-w-max">
      <div>
        <Navbar1 text={"ADMIN"} />
        <div className="flex flex-col md:flex-row items-center justify-evenly mt-12 space-y-4 md:space-y-0 md:space-x-8">
          <h1 className="tracking-in-expand-fwd text-xl font-extrabold text-center md:text-left">
            Manage School Resources & Requests Efficiently
          </h1>
          <Image
            src="/img11.jpg"
            width={400}
            height={200}
            className="rounded-xl shadow-black"
          />
        </div>

        {/* School Structure Section */}
        <div
          id="structure"
          className="flex flex-col md:flex-row items-start justify-evenly mt-8 mb-4 p-4 bg-gray-200 shadow-lg rounded-lg border border-gray-200 w-[90%] mx-auto"
        >
          <div className="card bg-base-100 image-full w-full md:w-[400px] h-[280px] shadow-xl rounded-lg">
            <figure className="relative w-full h-full">
              <img
                src="/img7.jpg"
                alt="School Structure"
                className="w-full h-full object-cover rounded-t-lg"
              />
            </figure>
            <div className="card-body p-4">
              <h2 className="card-title text-xl font-semibold">
                Check School Structure
              </h2>
              <button
                className="btn btn-primary mt-4 w-[150px]"
                onClick={() => setIsModalOpen(true)}
              >
                Check Now
              </button>
            </div>
          </div>

          <div className="w-full md:w-[600px] p-4">
            <p className="text-md text-left leading-relaxed">
              This section allows admins to review the overall structure of each
              school, including classroom facilities, infrastructure, and other
              key attributes. Keeping track of these details helps ensure each
              school is up to standard.
            </p>
          </div>
        </div>

        {/* File Upload Modal */}
        {isModalOpen && (
          <dialog className="modal" open>
            <div className="modal-box">
              <h3 className="font-bold text-lg">Submit Report</h3>
              <input
                type="file"
                className="file-input file-input-bordered w-full max-w-xs mt-[20px]"
                onChange={handleFileChange}
              />
              <div className="modal-action">
                <Link href="/admin/schools">
                  {" "}
                  <button className="btn" onClick={handleSubmit}>
                    Submit
                  </button>
                </Link>
                <button className="btn" onClick={() => setIsModalOpen(false)}>
                  Close
                </button>
              </div>
            </div>
          </dialog>
        )}

        {/* Review Updates Section */}
        <div
          id="updates"
          className="flex flex-col md:flex-row items-center justify-evenly p-4 mb-4 shadow-lg rounded-lg bg-gray-200 w-[90%] mx-auto"
        >
          <div className="w-full md:w-[600px] p-4">
            <p className="text-md leading-relaxed">
              The "Review Updates" feature lets admins oversee changes submitted
              by school principals, including updates to infrastructure, staff,
              and facilities. These changes are critical for maintaining
              up-to-date records.
            </p>
          </div>

          <div className="card bg-base-100 image-full w-full md:w-[400px] h-[280px] shadow-xl rounded-xl">
            <figure>
              <img
                src="/img8.jpg"
                alt="Review Updates"
                className="w-full h-full object-cover"
              />
            </figure>
            <div className="card-body flex flex-col justify-between h-1/3 p-4">
              <h2 className="card-title text-xl font-semibold">View Updates</h2>
              <p className="mt-2 text-sm">
                Stay updated on the latest changes made by principals and
                approve or review them accordingly.
              </p>
              <div className="card-actions mt-auto flex justify-end">
                <Link href="/admin/updates">
                  <button className="btn btn-primary">Review Now</button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Allocate Resources Section */}
        <div
          id="resources"
          className="flex flex-col md:flex-row items-start justify-evenly p-4 mb-4 bg-gray-200 shadow-lg rounded-lg border border-gray-200 w-[90%] mx-auto"
        >
          <div className="card bg-base-100 image-full w-full md:w-[400px] h-[280px] shadow-xl rounded-xl overflow-hidden">
            <figure className="relative w-full h-full">
              <img
                src="/img9.jpg"
                alt="Allocate Resources"
                className="w-full h-[150px] object-cover"
              />
            </figure>
            <div className="card-body flex flex-col h-full p-4">
              <h2 className="card-title text-xl font-semibold">
                Allocate Resources
              </h2>
              <p className="mt-4 text-sm">
                Manage and allocate resources based on requests from schools to
                ensure they get what they need.
              </p>
              <div className="card-actions mt-auto flex justify-end">
                <Link href="/admin/resource-allocation">
                  <button className="btn btn-primary">Allocate Now</button>
                </Link>
              </div>
            </div>
          </div>

          <div className="w-full md:w-[600px] p-4">
            <p className="text-md text-left leading-relaxed">
              The resource allocation tool helps admins distribute essential
              materials and resources to schools based on their needs and
              requests. This ensures transparency and efficient management of
              resources.
            </p>
          </div>
        </div>

        {/* View Requests Section */}
        <div
          id="requests"
          className="flex flex-col md:flex-row items-center justify-evenly p-4 mb-4 shadow-lg rounded-lg bg-gray-200 w-[90%] mx-auto"
        >
          <div className="w-full md:w-[600px] flex items-center">
            <p className="text-md leading-relaxed">
              The "Show School Data" feature enables admins to monitor all the
              schools added in the database previously.
            </p>
          </div>

          <div className="card bg-base-100 image-full w-full md:w-[400px] h-[280px] shadow-xl rounded-xl overflow-hidden">
            <figure>
              <img
                src="/img10.jpg"
                alt="View Requests"
                className="w-full h-full object-cover"
              />
            </figure>
            <div className="card-body flex flex-col justify-between h-1/3 p-4">
              <h2 className="card-title text-xl font-semibold">
                All School Data
              </h2>
              <p className="mt-2 text-sm">
                See The Data of All Schools in the Database
              </p>
              <div className="card-actions mt-auto flex justify-end">
                <Link href="/admin/schools">
                  <button className="btn btn-primary">View Now</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Chatbot />
      <Footer className="mt-[10px]" />
    </div>
  );
}
