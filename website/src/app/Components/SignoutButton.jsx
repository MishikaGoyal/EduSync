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
    <button
      onClick={handleSignout}
      className="text-white  px-4 py-2 rounded hover:bg-blue-700"
    >
      Sign Out
    </button>
  );
}
