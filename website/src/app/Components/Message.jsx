import React from "react";
import Image from "next/image";

export default function Message({ userId, userRole, text, timestamp }) {
  return (
    <div
      className="flex items-start gap-4 mb-4 border py-3 px-5 rounded-lg text-gray-800 bg-gray-100"
      suppressHydrationWarning
    >
      {/* Profile Icon */}

      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold">
        A
      </div>

      {/* Message Content */}
      <div className="flex flex-col  w-[100%]">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-gray-900">{userId}</span>
          <span className="text-xs text-gray-500">
            {new Date(timestamp).toLocaleString()}
          </span>
        </div>
        <div className="text-sm ">{text}</div>
      </div>
    </div>
  );
}
