import React from 'react';
//import Head from 'next/head';
import Navbar from '@/app/Components/NavbarPrincipal';
import Footer from '@/app/Components/Footer';

// Static Data
const data = {
  infrastructurePlanning: [
    {
      title: 'Samagra Siksha Education',
      description: 'Guidelines for optimizing classroom layouts to support new standards.',
      pdfLink: 'https://samagra.education.gov.in/docs/ss_implementation.pdf',
    },
    {
      title: 'Rashtriya Madhyamik Shiksha Abhiyan',
      description: 'Best practices for upgrading facilities during the transition.',
      pdfLink: 'https://www.education.gov.in/rmsa',
    },
  ],
  gradeReconfiguration: [
    {
      title: 'Teacher Education',
      description: 'Preparation of Teachers to face the challenges of the dynamic society',
      pdfLink: 'https://ncert.nic.in/pdf/shikshak-parv/TeacherandTeacherEducation.pdf',
    },
    {
      title: 'UDISE Plus ',
      description: 'Strategies for reallocating teachers and providing necessary training.',
      pdfLink: 'https://www.education.gov.in/udise-report-2021-22',
    },
  ],
  communityEngagement: [
    {
      title: 'National Education Policy',
      description: 'Education Policy lays particular emphasis on the development of the potential of each individual',
      pdfLink: 'https://www.education.gov.in/sites/upload_files/mhrd/files/NEP_Final_English.pdf',
    },
    {
      title: 'Right To Education',
      description: 'THE RIGHT OF CHILDREN TO FREE AND COMPULSORY EDUCATION ',
      pdfLink: 'https://www.indiacode.nic.in/bitstream/123456789/13682/1/rte_act_2009.pdf',
    },
  ],
};

const TransitionPlatform = () => {
  return (
    <div>
      <main >
        <Navbar />
        <header className="bg-slate-100 py-8 shadow-md mt-[10px]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-black">School Transition Platform</h1>
            <p className="text-xl text-black mt-2">
              Guidelines, best practices, and resources for schools transitioning from odd to standard structures.
            </p>
          </div>
        </header>

        {/* Section 1: Infrastructure Planning */}
        {data.infrastructurePlanning && (
          <Section title="Infrastructure Planning" items={data.infrastructurePlanning} />
        )}

        {/* Section 2: Grade Reconfiguration */}
        {data.gradeReconfiguration && (
          <Section title="Grade Reconfiguration" items={data.gradeReconfiguration} />
        )}

        {/* Section 3: Community Engagement */}
        {data.communityEngagement && (
          <Section title="Community Engagement Strategies" items={data.communityEngagement} />
        )}
      </main>

  
      <Footer />
      </div>
  );
};

const Section = ({ title, items }) => (
  <section className="bg-slate-100 py-12">
    <div className="max-w-6xl mx-auto px-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">{title}</h2>
      <ul className="space-y-6">
        {items.map((item, index) => (
          <li key={index} className="bg-white p-6 shadow-md rounded-md">
            <h3 className="text-2xl font-semibold text-gray-800">{item.title}</h3>
            <p className="text-gray-700 mt-2">{item.description}</p>
            <a
              href={item.pdfLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 bg-gray-100 text-black hover:text-white px-4 py-2 rounded hover:bg-black transition"
            >
              Download PDF
            </a>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default TransitionPlatform;