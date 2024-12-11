"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

export default function FeedbackPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000); // Reset after 3 seconds
  };

  return (
    <div>
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/forum">
              {" "}
              <h1 className="text-2xl font-bold text-indigo-600">
                Teacher Dashboard
              </h1>
            </Link>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors duration-200"
          ></motion.button>
        </div>
      </header>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md border-t-4 border-indigo-500"
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl font-bold text-indigo-600 mb-6 text-center"
          >
            We Value Your Feedback
          </motion.h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-gray-700">
                Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Your Name"
                required
                className="w-full mt-1 border-teal-300 focus:border-teal-500 focus:ring-teal-500"
              />
            </div>
            <div>
              <Label htmlFor="organization" className="text-gray-700">
                Name of Organization
              </Label>
              <Input
                id="organization"
                type="text"
                placeholder="Your Organization"
                required
                className="w-full mt-1 border-teal-300 focus:border-teal-500 focus:ring-teal-500"
              />
            </div>
            <div>
              <Label htmlFor="role" className="text-gray-700">
                Role
              </Label>
              <Select required>
                <SelectTrigger className="w-full mt-1 border-teal-300 focus:border-teal-500 focus:ring-teal-500">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="principal">Principal</SelectItem>
                  <SelectItem value="teacher">Teacher</SelectItem>
                  <SelectItem value="parent">Parent</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="headline" className="text-gray-700">
                Problem Headline
              </Label>
              <Input
                id="headline"
                type="text"
                placeholder="Brief description of the issue"
                required
                className="w-full mt-1 border-teal-300 focus:border-teal-500 focus:ring-teal-500"
              />
            </div>
            <div>
              <Label htmlFor="description" className="text-gray-700">
                Problem Description
              </Label>
              <Textarea
                id="description"
                placeholder="Please provide more details about your feedback..."
                required
                className="w-full mt-1 border-teal-300 focus:border-teal-500 focus:ring-teal-500"
                rows={4}
              />
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:-translate-y-1"
              >
                Submit Feedback
              </Button>
            </motion.div>
          </form>
          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 p-2 bg-green-100 text-green-700 rounded text-center"
            >
              Thank you for your feedback!
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
