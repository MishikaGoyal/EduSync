"use client";

import React, { useEffect, useState } from "react";
import Message from "@/app/Components/Message";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Chat() {
  const [userId, setUserId] = useState();
  const [isClient, setIsClient] = useState(false);
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const response = await fetch("/api/all-messages", {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });
      const resData = await response.json();
      console.log(resData);
      setMessages(resData);
    } catch (error) {
      console.log("Error in fetching messages");
    }
  };

  useEffect(() => {
    // Mark the component as mounted to avoid hydration issues
    setIsClient(true);

    setUserId(sessionStorage.getItem("userId")); // Fallback for SSR
    fetchMessages();
  }, []);

  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    console.log(userId);
    const newMsg = {
      loginId: userId,
      userRole: "Principal", // Replace dynamically if needed
      text: newMessage,
      displayName: "",
      timestamp: new Date().toISOString(),
    };

    const request = await fetch("/api/send-message", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newMsg),
    });

    const resData = await request.json();

    setMessages((prevMessages) => [...prevMessages, newMsg]);
    setNewMessage("");
  };

  if (!isClient) {
    // Prevent rendering until the component is mounted
    return null;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100 px-[15%]">
      {/* Message List */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/parent">
              {" "}
              <h1 className="text-2xl font-bold text-indigo-600">
                Parent Dashboard
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
      <div className="flex-1 overflow-y-auto space-y-4 bg-[rgba(0,0,0,0.07)] px-5 pt-[2rem] mb-[4rem] pb-[2rem]">
        {messages.map((msg, index) => (
          <Message
            key={index}
            userId={msg.loginId}
            userRole={msg.role}
            text={msg.text}
            timestamp={msg.timestamp}
          />
        ))}
      </div>

      {/* Input Box */}
      <div className="flex items-center gap-2 fixed bottom-5 w-[70%]">
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300 resize-none h-12"
          rows="1"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}
