import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { FaSchool } from "react-icons/fa";
import SignoutButton from "./SignoutButton";
export default function Navbar() {
  const menuItems = [
    { name: "Know Structure", href: "/principal/structure", icon: <FaHome /> },
    { name: "Make Updates", href: "/principal/Progress" },
    { name: "Check Resources", href: "/principal/algorithm" },
    { name: "Guidelines", href: "/principal/Guidelines" },
    { name: "Request Resources", href: "/principal/request" },
  ];

  return (
    <nav className="bg-gray-100 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/principal"
          className="text-blue-950 text-2xl font-extrabold tracking-wide hover:text-gray-200 transition-all duration-300"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-purple-200 to-purple-300">
            <FaHome className="text-blue-950" />
          </span>
        </Link>

        {/* Navigation Links */}
        <ul className="flex space-x-8">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className="relative work-sans-text  text-blue-950 font-semibold text-lg transition-all duration-300 group"
              >
                {/* Gradient Effect on Hover */}

                <span className="group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r from-purple-200 via-pink-300 to-blue-400">
                  {item.name}
                </span>
                {/* Underline Animation */}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-blue-400 to-pink-300 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          ))}
          <div>
            <SignoutButton />
          </div>
        </ul>
      </div>
    </nav>
  );
}
