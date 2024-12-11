"use client";
import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/app/Components/NavbarPrincipal";
import Footer from "@/app/Components/Footer";
import dynamic from "next/dynamic";
// Static Data
const data = {
  infrastructurePlanning: [
    {
      title: "Samagra Siksha Education",
      description:
        "Guidelines for optimizing classroom layouts to support new standards.",
      pdfLink: "https://samagra.education.gov.in/docs/ss_implementation.pdf",
    },
    {
      title: "Rashtriya Madhyamik Shiksha Abhiyan",
      description:
        "Best practices for upgrading facilities during the transition.",
      pdfLink: "https://www.education.gov.in/rmsa",
    },
  ],
  gradeReconfiguration: [
    {
      title: "Teacher Education",
      description:
        "Preparation of Teachers to face the challenges of the dynamic society",
      pdfLink:
        "https://ncert.nic.in/pdf/shikshak-parv/TeacherandTeacherEducation.pdf",
    },
    {
      title: "UDISE Plus",
      description:
        "Strategies for reallocating teachers and providing necessary training.",
      pdfLink: "https://www.education.gov.in/udise-report-2021-22",
    },
  ],
  communityEngagement: [
    {
      title: "National Education Policy",
      description:
        "Education Policy lays particular emphasis on the development of the potential of each individual",
      pdfLink:
        "https://www.education.gov.in/sites/upload_files/mhrd/files/NEP_Final_English.pdf",
    },
    {
      title: "Right To Education",
      description: "THE RIGHT OF CHILDREN TO FREE AND COMPULSORY EDUCATION",
      pdfLink:
        "https://www.indiacode.nic.in/bitstream/123456789/13682/1/rte_act_2009.pdf",
    },
  ],
};

const TransitionPlatform = () => {
  return (
    <div>
      <main className="bg-gradient-to-r from-purple-100 to-blue-100">
        <Navbar />
        <motion.header
          className="bg-gradient-to-r from-purple-100 to-blue-100 py-8 shadow-md mt-[10px]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-blue-950">
              School Transition Platform
            </h1>
            <p className="text-xl text-blue-950 mt-2">
              Guidelines, best practices, and resources for schools
              transitioning from odd to standard structures.
            </p>
          </div>
        </motion.header>

        {/* Section 1: Infrastructure Planning */}
        {data.infrastructurePlanning && (
          <Section
            title="Infrastructure Planning"
            items={data.infrastructurePlanning}
          />
        )}

        {/* Section 2: Grade Reconfiguration */}
        {data.gradeReconfiguration && (
          <Section
            title="Grade Reconfiguration"
            items={data.gradeReconfiguration}
          />
        )}

        {/* Section 3: Community Engagement */}
        {data.communityEngagement && (
          <Section
            title="Community Engagement Strategies"
            items={data.communityEngagement}
          />
        )}
      </main>

      <Footer />
    </div>
  );
};

const Section = ({ title, items }) => {
  return (
    <motion.section
      className="bg-gradient-to-r from-purple-100 to-blue-100 py-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">{title}</h2>
        <ul className="space-y-6">
          {items.map((item, index) => (
            <motion.li
              key={index}
              className="bg-white p-6 shadow-md rounded-md"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold text-gray-800">
                {item.title}
              </h3>
              <p className="text-blue-950 mt-2">{item.description}</p>
              <a
                href={item.pdfLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 bg-blue-950 text-white hover:text-white px-4 py-2 rounded hover:bg-black transition"
              >
                Download PDF
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
};

export default TransitionPlatform;
