"use client";

import { useRouter } from "next/navigation";

export default function SignoutButton() {
  const router = useRouter();

  const handleSignout = async () => {
    try {
      const response = await fetch("/api/signout", {
        method: "POST",
      });

      if (response.ok) {
        router.push("/login"); // Redirect to login page
      } else {
        console.error("Failed to sign out:", await response.json());
      }
    } catch (err) {
      console.error("Error during signout:", err);
    }
  };

  return (
    <li>
      <button
        onClick={handleSignout}
        className="relative work-sans-text text-blue-950 font-semibold text-lg transition-all duration-300 group"
      >
        {/* Gradient Effect on Hover */}
        <span className="group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r from-purple-200 via-pink-300 to-blue-400">
          Sign Out
        </span>
        {/* Underline Animation */}
        <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-blue-400 to-pink-300 transition-all duration-300 group-hover:w-full"></span>
      </button>
    </li>
  );
}
