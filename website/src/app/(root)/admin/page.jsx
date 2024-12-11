"use client";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Navbar1 from "@/app/Components/NavbarAdmin";
import Footer from "@/app/Components/Footer";
import Chatbot from "@/app/Components/Chatbot";
import { AnimatedPinDemo } from "@/app/components/model";
import Navbar from "@/app/Components/NavbarAdmin";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function AdminPage() {
  const featureRefs = useRef([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState(null);

  useEffect(() => {
    // Hero animations
    gsap.fromTo(
      "#heroHeadline",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.2, ease: "power4.out" }
    );

    gsap.fromTo(
      "#heroDescription",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.4, ease: "power4.out" }
    );

    gsap.fromTo(
      "#ctaButton",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.6, ease: "power4.out" }
    );
  }, []);

  useEffect(() => {
    // Animate features on scroll
    featureRefs.current.forEach((feature, index) => {
      gsap.fromTo(
        feature,
        { opacity: 0, y: 100, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: feature,
            start: "top 90%",
            end: "top 70%",
            scrub: true,
          },
        }
      );
    });
  }, []);

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
      if (responseData.flag === false) {
        alert("Data already exists");
      } else if (responseData.flag === true) {
        alert("Data added successfully");
      } else {
        alert("Error uploading data");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const features = [
    {
      imageSrc: "/img7.jpg",
      headline: "Check Structure",
      href: "/admin/school-structure",
      description:
        "Check School Structure feature leverages a machine learning model to analyze and categorize schools into two distinct categories: Odd and Standard. This categorization is based on various critical parameters such as the total number of classrooms, teacher-student ratio, library and drinking water availability,  The ML model processes the data to identify schools that deviate significantly from typical structural (Odd) . This feature enables education administrators to pinpoint schools needing immediate attention and make data-driven decisions to improve infrastructure, resource allocation.",
    },
    {
      imageSrc: "/img8.jpg",
      headline: "Review Updates",
      href: "/admin/updates",
      description:
        " Staying informed about ongoing changes and updates is crucial for effective school management. This feature allows administrators to review all submitted updates related to infrastructure, resource requirements, or operational changes. It ensures that schools remain transparent and accountable while giving administrators a comprehensive view of ongoing activities..",
    },
    {
      imageSrc: "/img9.jpg",
      headline: "Allocate Resources",
      href: "/admin/allocate",
      description:
        "With real-time data and analytics, this feature allows administrators to quickly allocate requested resources to schools. It prioritizes resource distribution based on immediate needs, ensuring that schools in critical need receive timely assistance. This functionality minimizes delays and maximizes the impact of resource allocation efforts.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="min-h-screen px-8 py-12 mt-4">
        {/* Hero Section */}
        <section
          id="heroSection"
          className="relative bg-gradient-to-r from-purple-100 to-blue-100 text-white py-20 px-8 rounded-lg shadow-xl overflow-hidden"
        >
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-92 h-68 bg-purple-200 rounded-full blur-[100px] opacity-30"></div>
            <div className="absolute bottom-0 right-0 w-72 h-58 bg-blue-200 rounded-full blur-[80px] opacity-20"></div>
          </div>

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <h1
              id="heroHeadline"
              className="ubuntu-bold-italic text-6xl mb-6 leading-tight tracking-wide text-blue-950"
            >
              Welcome to the <br />
              <span className="text-blue-950 ubuntu-bold-italic">
                Admin Dashboard
              </span>
            </h1>
            <p
              id="heroDescription"
              className="work-sans-text text-xl max-w-3xl mx-auto leading-relaxed mb-8 text-blue-400 font-semibold"
            >
              A robust platform to manage resources, review updates, and make
              impactful decisions for schools.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section id="featuresSection" className="mt-16 space-y-12">
          {features.map((feature, i) => (
            <div
              key={i}
              ref={(el) => (featureRefs.current[i] = el)}
              className="bg-white rounded-lg shadow-lg p-6 max-w-6xl max-h-[450px] mx-auto flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 transform transition-transform duration-300 hover:scale-105 shadow-md shadow-violet-300"
            >
              {/* Image with navigation indicator */}
              <div className="relative group">
                <AnimatedPinDemo
                  title={feature.title}
                  href={feature.href}
                  imageSrc={feature.imageSrc}
                  className="transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Title, Description, and Button */}
              <div className="max-w-md">
                {/* Feature Headline */}
                <h2 className="text-2xl ml-24 ubuntu-bold-italic font-semibold text-blue-950 mb-2 border-b-4 border-black pb-2 inline-block">
                  {feature.headline}
                </h2>

                {/* Feature Description */}
                <p className="text-gray-700 text-sm ml-24 justify-left text-left">
                  {feature.description}
                </p>

                {/* Button Below the Description */}
                <div className="mt-4 ml-24">
                  <button
                    className="btn btn-primary w-[150px]"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Check Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>

      {/* File Upload Modal */}
      {isModalOpen && (
        <dialog className="modal" open>
          <div className="modal-box">
            <h3 className="font-bold text-lg">Submit Report</h3>
            <input
              type="file"
              className="file-input file-input-bordered w-full max-w-xs mt-4"
              onChange={handleFileChange}
            />
            <div className="modal-action">
              <button className="btn" onClick={handleSubmit}>
                Submit
              </button>
              <button className="btn" onClick={() => setIsModalOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}

      <Chatbot />
      <Footer />
    </div>
  );
}
