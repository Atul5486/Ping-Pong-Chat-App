import { BellRing, Home, LogOutIcon, LucideMail } from "lucide-react";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import useAuthUser from "../hooks/useAuthUser";
import { Uselogout } from "../hooks/UseLogout";

const Sidebar = () => {

  const {authenticatedUser}=useAuthUser();
  const {logoutMutation}=Uselogout();


  const navItems = [
    {
      path: "/",
      name: "Dashboard",
      icon: <Home size={21} className="opacity-50" />,
    },
    {
      path: "/connections",
      name: "Connections",
      icon: <LucideMail size={21} className="opacity-50" />,
    },
    {
      path: "/notifications",
      name: "Notification",
      icon: <BellRing size={21} className="opacity-50" />,
    },
  ];
  return (
    <div className="flex min-h-full flex-col items-start bg-base-100 is-drawer-close:w-14 is-drawer-open:w-64 pt-3">
      <Link to="/" className="flex gap-1 pl-3">
        <img src="/logo.png" alt="logo" height={34} width={34} />
        <span className="is-drawer-close:hidden text-3xl font-bold">
          <span>ingpong</span>
        </span>
      </Link>
      {/* Sidebar content here */}
      <ul className="menu w-full grow space-y-3 pt-10">
        {/* List item */}
        {navItems.map((link) => (
          <li key={link.name}>
            <NavLink
              to={link.path}
              end={link.path === "/"}
              className={({ isActive }) =>
                `${isActive ? "is-drawer-open:bg-base-200 text-info" : ""} is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-3 `
              }
              data-tip={link.name}
            >
              <span className="mb-1 mr-1 inline-block size-4">{link.icon}</span>
              <span className="is-drawer-close:hidden font-semibold">
                {link.name}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>

      {/* User Profile */}
      <div className="dropdown dropdown-top dropdown-hover border border-base-300 bg-base-200 w-full">
        <div tabIndex={0} role="button" className="btn m-1 flex items-center gap-3 pl-1">
          <img
            src={authenticatedUser?.image}
            alt="User Avatar"
            height={43}
            width={43}
            className="size-8 rounded-full"
          /> 
          <h6 className="is-drawer-close:hidden capitalize">{authenticatedUser?.fullName}</h6>
        </div>
        <ul
          tabIndex="-1"
          className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
        >
          <li className="disabled capitalize font-bold">
            <a>{authenticatedUser?.fullName}</a>
          </li>
          <li onClick={logoutMutation}>
          <a>
            Logout
            <LogOutIcon size={11}/> 
          </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
