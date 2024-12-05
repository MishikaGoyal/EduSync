"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { AnimatedPinDemo } from "@/app/Components/model";
import Navbar from "@/app/Components/NavbarPrincipal";
import Footer from "@/app/Components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function Page() {
  const featureRefs = useRef([]);

  useEffect(() => {
    // Animate hero section
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

  const scrollToFeatures = () => {
    const featureSection = document.getElementById("featuresSection");
    featureSection.scrollIntoView({ behavior: "smooth" });
  };

  const features = [
    {
      imageSrc: "/img11.jpg",
      title: "Check School Structure",
      href: "/principal/structure",
      headline: "Check Structure",
      description:
        "Gain a comprehensive overview of your school's infrastructure with this feature. It provides detailed information about key elements such as the number of classrooms, teacher availability, and essential facilities. With an easy-to-navigate interface, principals can ensure that resources are allocated effectively and identify any gaps in infrastructure that might require attention. This helps streamline decision-making and maintain an optimal learning environment for students.",
    },
    {
      imageSrc: "/img13.jpg",
      title: "Submit Updates",
      href: "/principal/progress",
      headline: "Submit Updates",
      description:
        "Keep all stakeholders informed by submitting timely updates about the school. Whether it’s about upcoming events, achievements, or ongoing infrastructure improvements, this feature ensures that vital information reaches everyone quickly and efficiently. By fostering transparency and communication, it strengthens trust and collaboration among teachers, students, parents, and administrators.",
    },
    {
      imageSrc: "/img12.jpg",
      title: "Request Resources",
      href: "/principal/resources",
      headline: "Request Resources",
      description:
        "Ensure your school is equipped with all the necessary supplies to enhance the learning experience. This feature allows you to raise requests for additional resources, such as books, furniture, or technology. With a streamlined request process, you can address shortages effectively and create an environment that supports both students and teachers in achieving their best.",
    },
    {
      imageSrc: "/img6.jpg",
      title: "Guidelines",
      href: "/principal/guidelines",
      headline: "Guidelines",
      description:
        "Stay aligned with educational standards and policies through the Guidelines feature. This section provides access to up-to-date, structured guidance on administrative processes, compliance with regulatory frameworks, and best practices for effective school management. Designed to assist principals in making informed decisions, this feature ensures that your school operates within the required protocols while fostering a safe, inclusive, and high-performing educational environment.",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen px-8 py-12 mt-4 ">
        {/* Hero Section */}
        <section
          className="relative bg-gradient-to-r from-purple-100 to-blue-100 text-white py-20 px-8 rounded-lg shadow-xl overflow-hidden"
          id="heroSection"
        >
          {/* Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-92 h-68 bg-purple-200 rounded-full blur-[100px] opacity-30"></div>
            <div className="absolute bottom-0 right-0 w-72 h-58 bg-blue-200 rounded-full blur-[80px] opacity-20"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <h1
              id="heroHeadline"
              className="ubuntu-bold-italic text-6xl mb-6 leading-tight tracking-wide text-blue-950"
            >
              Welcome to the <br />
              <span className="text-blue-950 ubuntu-bold-italic">
                Principal Dashboard
              </span>
            </h1>
            <p
              id="heroDescription"
              className="work-sans-text text-xl max-w-3xl mx-auto leading-relaxed mb-8 text-blue-400 font-semibold"
            >
              An intelligent platform empowering school principals to manage,
              update, and optimize school operations efficiently.
            </p>
            <button
              id="ctaButton"
              className="inline-block px-8 py-4 text-lg font-medium bg-gray-100 text-black rounded-full shadow-lg hover:bg-gray-100 transform transition-transform hover:scale-105 border-2 border-violet-300"
              onClick={scrollToFeatures}
            >
              Explore Features
            </button>
          </div>
        </section>

        <section id="featuresSection" className="mt-16 space-y-12">
          {features.map((feature, i) => (
            <div
              key={i}
              ref={(el) => (featureRefs.current[i] = el)}
              className="bg-white rounded-lg shadow-lg p-6 max-w-6xl max-h-[450px] mx-auto flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 transform transition-transform duration-300 hover:scale-105 shadow-md shadow-violet-300"
            >
              {/* Image with navigation indicator and tooltip */}
              <div className="relative group">
                <AnimatedPinDemo
                  title={feature.title}
                  href={feature.href}
                  imageSrc={feature.imageSrc}
                  className="transition-transform duration-300 hover:scale-105"
                />
                {/* Tooltip */}
              </div>

              {/* Title and Description */}
              <div className="max-w-md ">
                <h2 className="text-2xl ml-24  ubuntu-bold-italic font-semibold text-blue-950 mb-2 border-b-4 border-black pb-2 inline-block">
                  {feature.headline}
                </h2>

                <p className="text-gray-700 text-sm ml-24 justify-left text-left">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
