import React from "react";
import { FaSearch, FaBell, FaUserCircle, FaChevronDown } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="flex  items-end justify-end bg-white gap-60 py-4 px-6 top-0 ">
      {/* Left section (Logo and branding) */}

      {/* Center section (Search bar) */}
      {/* <div className="flex items-center bg-gray-200 rounded-full px-6 py-3 w-2/3">
        <FaSearch className="text-gray-700 text-lg" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent border-none outline-none px-4 w-full text-lg"
        />
      </div> */}

      {/* Right section (Notifications and User profile) */}
      <div className="flex items-center justify-end  gap-6 ">
        <div className="bg-blue-700 p-2 rounded-full">
          <FaBell
            className="text-white cursor-pointer  rounded-md "
            size={24}
          />
        </div>

        {/* User profile section */}
        <div className="flex items-center justify-between cursor-pointer">
  {/* Avatar and Name */}
  <div className="flex items-center space-x-2">
    <FaUserCircle className="text-gray-500" size={36} />
    {/* <span className="text-gray-600">Muthu</span> */}
  </div>

  {/* Arrow */}
  {/* <FaChevronDown className="text-gray-500 ml-2" /> */}
</div>

      </div>
    </div>
  );
};

export default Navbar;
