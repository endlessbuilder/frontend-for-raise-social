"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = ({ navItems }) => {
  const pathname = usePathname();

  const handleLogout = async () => {
    // try{
    //   // await fetch(`${SERVER_IP}/api/logout`, {
    //   //   method: "POST",
    //   //   headers: {
    //   //     "Content-Type": "application/json",
    //   //   }
    //   // });
      // localStorage.clear();
      window.location.href = "/";
    // } catch (error) {
    //   console.error(err);
    //   setError(msg);
    // }
  }

  return (
    <aside className="w-[250px] bg-brand-lemon-yellow sticky top-0 pt-[140px] pb-8 h-screen pl-6 overflow-auto flex flex-col justify-between">
      <div className="flex flex-col gap-4">
        {navItems?.map((item, i) => (
          <Link
            href={item.link}
            key={i}
            className={`flex gap-2.5 items-center ${item.link === pathname ? "opacity-100" : "opacity-70"}`}>
            {pathname === item.link && (
              <div className="w-3 h-3 rounded-full bg-brand-dark mb-2"></div>
            )}
            <p className="font-heading font-bold uppercase text-3xl text-brand-dark">
              {item.label}
            </p>
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-2.5 text-red-700 cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 mb-2">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75"
          />
        </svg>
        <p className="font-heading font-bold uppercase text-3xl" onClick={handleLogout}>Logout</p>
      </div>
    </aside>
  );
};

export default Sidebar;