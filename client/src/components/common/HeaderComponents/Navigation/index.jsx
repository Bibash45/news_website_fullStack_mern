import { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

const Navigation = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchState, setSearchState] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const navLinks = [
    { nav: "गृहपृष्ठ", link: "/" },
    { nav: "राजनीति", link: "/politics" },
    { nav: "बजार अर्थतन्त्र", link: "/marketeconomy" },
    { nav: "विचार", link: "/idea" },
    { nav: "नेपाली ब्रान्ड", link: "/nepalbrand" },
    { nav: "समाज", link: "/society" },
    { nav: "कला", link: "/art" },
    { nav: "खेलकुद", link: "/sports" },
    { nav: "ब्लग", link: "/blog" },
    { nav: "ग्लोबल", link: "/global" },
  ];

  return (
    <>
      <div>
        <nav className="flex bg-[#182229] px-4 pt-4 pb-2 md:justify-around items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Menu Icon (Visible on Small Screens) */}
            <div
              className="md:hidden cursor-pointer text-white"
              onClick={() => setIsSidebarOpen(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </div>

            {/* Logo */}
            {/* <Link to="/">
              <img
                className="w-[50px] h-[50px] rounded-full object-contain"
                src="https://scontent.fktm3-1.fna.fbcdn.net/v/t39.30808-6/456430359_484335661016328_3546235393355045369_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=jd937vpI-uIQ7kNvgF6Kakb&_nc_oc=AdixKPpOGV_4BduEtDYulnwBtagtCbpJaRdG5R2pspSfa7GO3Wz8Ob9GlMXUHAGAs6S0DfrYdKmxnJPc8XuWRpGs&_nc_zt=23&_nc_ht=scontent.fktm3-1.fna&_nc_gid=Agb0orSQw81xUVdoVg04y_g&oh=00_AYCWN8rBYx0WK4VwMzXHGO4wyz_KOhWGe-rkknYc2dFDpw&oe=67B472E1"
                alt=""
              />
            </Link> */}
            <Link
              to="/"
              className="font-bold text-2xl bg-gradient-to-r from-amber-500 to-white bg-clip-text text-transparent"
            >
              भण्डाफोर
            </Link>
          </div>

          {/* Desktop Navigation (Hidden on Small Screens) */}
          <div className="hidden md:flex gap-6">
            {navLinks.map(({ nav, link }) => (
              <Link
                key={nav}
                to={`${link.toLowerCase()}`}
                className={`text-white text-[0.937rem]  lg:text-lg text-md ${
                  pathname === link && "font-bold border-b border-amber-400"
                }`}
              >
                {nav}
              </Link>
            ))}
          </div>

          {/* Right Side Navigation */}
          <div className="hidden md:flex gap-6 items-center">
            <div className="hidden lg:flex">
              {[
                // "भिडियो हेर्नुस्",
                "लाईभ हेर्नुस्",
              ].map((item, index) => (
                <NavLink
                  key={index}
                  to={`/${item.toLowerCase()}`}
                  className="text-white text-[0.937rem] font-bold mr-4 lg:text-lg text-md"
                >
                  {item}
                </NavLink>
              ))}
            </div>
            <div className="text-white cursor-pointer">
              {searchState ? (
                <button
                  className="hover:bg-gray-300 text-gray-400 text-xl rounded px-1 pt-[3px]"
                  onClick={() => setSearchState(false)}
                >
                  ✕
                </button>
              ) : (
                <svg
                  onClick={() => setSearchState(true)}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              )}
            </div>
          </div>

          {/* search */}
          <div className="flex md:hidden bg-[#182229] items-center justify-end gap-x-1 p-2 shadow-md w-full flex-nowrap">
            {/* Search Input */}
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="px-2 py-2 border border-gray-500 bg-[#1f2a30] text-white rounded-md w-1/2 text-xs "
              placeholder="Search..."
            />

            {/* Search Button */}
            <button
              onClick={() => {
                navigate(
                  `/search?keyword=${searchValue}&fromDate=${fromDate}&toDate=${toDate}`
                );
                setFromDate("");
                setToDate("");
                setSearchValue("");
              }}
              className="py-1 px-[2px] bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md text-xs"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>
          </div>
        </nav>

        {/* Search */}
        {searchState && (
          <div className="hidden md:flex bg-[#182229]  md:flex-row items-center gap-4 justify-center p-4 shadow-md">
            {/* From Date (English) */}
            <div className="flex flex-col">
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="form-control px-4 py-2 border border-gray-500 bg-[#1f2a30] text-white w-full md:w-40 lg:w-48"
                placeholder="from"
              />
            </div>

            {/* To Date (English) */}
            <div className="flex flex-col">
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="form-control px-4 py-2 rounded-lg border border-gray-500 bg-[#1f2a30] text-white w-full md:w-40 lg:w-48"
                placeholder="to"
              />
            </div>

            {/* Search Input */}
            <div className="flex flex-col w-full md:w-1/3">
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-500 bg-[#1f2a30] text-white w-full"
                placeholder="Search news..."
              />
            </div>

            {/* Search Button */}
            <button
              onClick={() => {
                navigate(
                  `/search?keyword=${searchValue}&fromDate=${fromDate}&toDate=${toDate}`
                );
                setFromDate("");
                setToDate("");
              }}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
            >
              Search
            </button>
          </div>
        )}
      </div>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={() => setIsSidebarOpen(false)}
        >
          <div
            className="fixed top-0 left-0 h-full w-52 shadow-lg transform transition-transform bg-[#182229]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <div className="flex justify-between mx-4 mt-4">
              <Link
                to="/"
                className="font-bold text-2xl bg-gradient-to-r from-amber-500 to-white bg-clip-text text-transparent"
              >
                भण्डाफोर
              </Link>
              <button
                className="text-white text-xl mb-4"
                onClick={() => setIsSidebarOpen(false)}
              >
                ✕
              </button>
            </div>

            {/* Sidebar Links */}
            <div className="flex flex-col">
              {navLinks.map(({ nav, link }) => (
                <NavLink
                  key={nav}
                  to={`${link}`}
                  className={`text-white text-lg font-semibold pl-5 py-3 ${
                    pathname === link && "bg-[#202C33]"
                  }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  {nav}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
