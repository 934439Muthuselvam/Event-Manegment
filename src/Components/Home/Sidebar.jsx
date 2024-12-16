import React from "react";
import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaFileAlt, FaUserFriends } from "react-icons/fa";
import { RiMessage2Line } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";

const Sidebar = () => {
  return (
    <div className="h-screen py-20  bg-white   text-Black">
      {/* Sidebar Top Image */}

      {/* Sidebar Links */}
      <div className="flex flex-col items-start px-2 mt-10 gap-10">
        <Link
          to={"/"}
          className="flex justify-start gap-2 text-2xl font-bold   p-2 rounded-lg"
          >
          <div className="mt-1">
            {/* <MdDashboard /> */}
          </div>
          <div>Home</div>
        </Link>

        <Link
          to={"/"}
          className="flex justify-start gap-2 text-2xl font-bold  p-2 rounded-lg"
          >
          <div className="mt-1">
            {/* <MdDashboard /> */}
          </div>
          <div>Create Events</div>
        </Link>


        <Link
          to={"/"}
          className="flex justify-start gap-2 text-2xl font-bold  p-2 rounded-lg"
          >
          <div className="mt-1">
            {/* <MdDashboard /> */}
          </div>
          <div>Find Events</div>
        </Link>

        
    

        
        <Link
          to={"/"}
          className="flex justify-start gap-2 text-2xl font-bold  p-2 rounded-lg"
          >
          <div className="mt-1">
            {/* <MdDashboard /> */}
          </div>
          <div>Events List</div>
        </Link>

          
        <Link
          to={"/"}
          className="flex justify-start gap-2 text-2xl font-bold  p-2 rounded-lg"
          >
          <div className="mt-1">
            {/* <MdDashboard /> */}
          </div>
          <div>Settings</div>
        </Link>


      </div>


    </div>
  );
};

export default Sidebar;
