import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="h-screen py-20 bg-white text-black">
      <div className="flex flex-col items-start px-2 gap-10">
        {/* Home */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex justify-start gap-2 text-2xl font-bold p-2 rounded-lg ${
              isActive ? "bg-blue-500 text-white" : "hover:bg-blue-200"
            }`
          }
        >
          <div className="mt-1"></div>
          <div>Home</div>
        </NavLink>

        {/* Create Events */}
        <NavLink
          to="/create-event"
          className={({ isActive }) =>
            `flex justify-start gap-2 text-2xl font-bold p-2 rounded-lg ${
              isActive ? "bg-blue-500 text-white" : "hover:bg-blue-200"
            }`
          }
        >
          <div className="mt-1"></div>
          <div>Create Events</div>
        </NavLink>

        {/* Find Events */}
        <NavLink
          to="/Output"
          className={({ isActive }) =>
            `flex justify-start gap-2 text-2xl font-bold p-2 rounded-lg ${
              isActive ? "bg-blue-500 text-white" : "hover:bg-blue-200"
            }`
          }
        >
          <div className="mt-1"></div>
          <div>Find Events</div>
        </NavLink>

        {/* Events List */}
        <NavLink
          to="/eventlist"
          className={({ isActive }) =>
            `flex justify-start gap-2 text-2xl font-bold p-2 rounded-lg ${
              isActive ? "bg-blue-500 text-white" : "hover:bg-blue-200"
            }`
          }
        >
          <div className="mt-1"></div>
          <div>Events List</div>
        </NavLink>

        {/* Settings */}
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex justify-start gap-2 text-2xl font-bold p-2 rounded-lg ${
              isActive ? "bg-blue-500 text-white" : "hover:bg-blue-200"
            }`
          }
        >
          <div className="mt-1"></div>
          <div>Settings</div>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;