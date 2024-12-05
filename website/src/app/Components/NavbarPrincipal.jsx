import Link from "next/link";

import { FaHome } from "react-icons/fa";
import SignoutButton from "./SignoutButton";

function Navbar() {
  return (
    <navbar className="">
      <div className="bg-gray-800  font-semibold text-lg text-white h-[70px]  ">
        <ul className="flex space-x-6 px-3 h-full first-letter:h-full justify-between ">
          <div className="w-[20%] mt-3 ">
            <Link href="/principal">
              {" "}
              <li className=" py-2  ">
                <FaHome className="text-2xl ml-[10px]" />
              </li>
            </Link>
          </div>
          <div className="flex w-[60%]  px-3  justify-between">
            <Link href="/principal/structure">
              {" "}
              <li className="mt-[10px] hover:bg-blue-700 py-2 px-2 rounded-md ">
                Know Structure
              </li>
            </Link>
            <Link href="/principal/Progress">
              <li className="mt-[10px] hover:bg-blue-700 py-2 px-2 rounded-md ">
                Make Updates
              </li>
            </Link>
            <Link href="/principal/algorithm">
              {" "}
              <li className="mt-[10px]  hover:bg-blue-700 py-2 px-2 rounded-md ">
                Check Resources
              </li>
            </Link>
            <Link href="/principal/Guidelines">
              <li className="mt-[10px]  hover:bg-blue-700 py-2 px-2 rounded-md ">
                Guidelines
              </li>
            </Link>
            <Link href="/principal/request">
              <li className="mt-[10px]  hover:bg-blue-700 py-2 px-2 rounded-md ">
                Request
              </li>
            </Link>
          </div>
          <div className="w-[20%] flex justify-end pr-5 py-2">
            <Link href="/">
              <li className="">
                {" "}
                <SignoutButton />
              </li>
            </Link>
          </div>
        </ul>
      </div>
    </navbar>
  );
}

export default Navbar;
