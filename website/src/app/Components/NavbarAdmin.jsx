import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { FaSchool } from "react-icons/fa";
import SignoutButton from "./SignoutButton";

export default function Navbar() {
  const menuItems = [
    {
      name: "Schools",
      href: "/admin/schools",
      icon: <FaHome />,
    },
    { name: "Check  Updates", href: "/admin/updates" },
    { name: "Allocate Resource", href: "/admin/allocate" },
    {name :"Dashboard", href: "/admin/dashboard"}
  ];

  return (
    <nav className="bg-gray-100 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/admin"
          className="flex items-center space-x-2 text-blue-950 text-2xl font-extrabold tracking-wide hover:text-gray-200 transition-all duration-300"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-purple-200 to-purple-300">
            <FaHome className="text-blue-950" />
          </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500"></span>
        </Link>

        {/* Navigation Links */}
        <ul className="flex space-x-8 items-center">
          {menuItems.map((item, index) => (
            <li key={index} className="group">
              <Link
                href={item.href}
                className="relative text-blue-950 font-semibold text-lg transition-all duration-300"
              >
                {/* Gradient Text */}
                <span className="group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r from-purple-200 via-pink-300 to-blue-400">
                  {item.name}
                </span>
                {/* Underline Animation */}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-blue-400 to-pink-300 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          ))}
          {/* Signout Button */}
          <div className="ml-6">
            <SignoutButton />
          </div>
        </ul>
      </div>
    </nav>
  );
}
