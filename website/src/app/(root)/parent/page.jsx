"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MessageCircle, FileText, LogOut } from "lucide-react";
import Footer from "@/app/Components/Footer";

export default function TeacherDashboard() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-indigo-600">
              Parent Dashboard
            </h1>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors duration-200"
          >
            <LogOut className="mr-2" size={20} />
            Logout
          </motion.button>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/parent/discussion">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center h-full border-t-4 border-teal-500 transition-all duration-200 hover:shadow-xl"
              >
                <MessageCircle size={48} className="text-teal-500 mb-4" />
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  Discussion
                </h2>
                <p className="text-gray-600 text-center">
                  Engage in meaningful conversations with students and
                  colleagues.
                </p>
              </motion.div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link href="/parent/form">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center h-full border-t-4 border-indigo-500 transition-all duration-200 hover:shadow-xl"
              >
                <FileText size={48} className="text-indigo-500 mb-4" />
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  Feedback
                </h2>
                <p className="text-gray-600 text-center">
                  Provide and receive constructive feedback to improve learning
                  outcomes.
                </p>
              </motion.div>
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link href="/parent/structure">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center h-full border-t-4 border-blue-200 transition-all duration-200 hover:shadow-xl"
              >
                <FileText size={48} className="text-indigo-500 mb-4" />
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  School Structure
                </h2>
                <p className="text-gray-600 text-center">
                  Check Structure of school
                </p>
              </motion.div>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8"
        ></motion.div>
      </main>

      <Footer />
    </div>
  );
}
