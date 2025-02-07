import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { CiLogout } from "react-icons/ci";

const Navigation = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <nav className="flex bg-[#182229] p-4 md:justify-around items-center justify-between">
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
          <Link to="/">
          <img className="w-[50px] h-[50px] rounded-full object-contain" src="https://scontent.fktm3-1.fna.fbcdn.net/v/t39.30808-6/456430359_484335661016328_3546235393355045369_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=vjdPWoj0f44Q7kNvgElBfRU&_nc_oc=Adgbh63HEG9O_TzwvCezhUoLUskF9E5OD4edMQAm4GWcD5pq4QQkoUpBLSsalQG83kU_hjRyMlsqY1Wsn4nhiz0F&_nc_zt=23&_nc_ht=scontent.fktm3-1.fna&_nc_gid=AA7yXxjHt35j6e08pU1M9tr&oh=00_AYCUoVwCD_LlTc_ISEBoKB8Qw47U9DFFilGis-eGiAGkgg&oe=67A97661" alt="" />
          </Link>
        </div>

        {/* Desktop Navigation (Hidden on Small Screens) */}
        <div className="hidden md:flex gap-6">
          {[
            "गृहपृष्ठ",
            "राजनीति",
            "बजार अर्थतन्त्र ",
            "विचार",
            "नेपाली ब्रान्ड ",
            " समाज",
            "कला",
            "खेलकुद",
            "ब्लग ",
            "ग्लोबल ",
          ].map((item) => (
            <NavLink
              key={item}
              to={`/${item.toLowerCase()}`}
              className="text-white text-[0.937rem] font-bold lg:text-lg text-md"
            >
              {item}
            </NavLink>
          ))}
        </div>

        {/* Right Side Navigation */}
        <div className="hidden md:flex gap-6 items-center">
          <div className="hidden lg:flex">
            {["भिडियो हेर्नुस्", "लाईभ हेर्नुस्"].map((item) => (
              <NavLink
                key={item}
                to={`/${item.toLowerCase()}`}
                className="text-white text-[0.937rem] font-bold mr-4 lg:text-lg text-md"
              >
                {item}
              </NavLink>
            ))}
          </div>
          <div className="text-white cursor-pointer">
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
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={() => setIsSidebarOpen(false)}
        >
          <div
            className="fixed top-0 left-0 h-full w-52   shadow-lg transform transition-transform bg-[#182229]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <div className="flex justify-end mr-4 mt-3">
              <button
                className="text-white text-xl mb-4"
                onClick={() => setIsSidebarOpen(false)}
              >
                ✕
              </button>
            </div>

            {/* Sidebar Links */}
            <div className="flex flex-col">
              {[
                "गृहपृष्ठ",
                "राजनीति",
                "बजार अर्थतन्त्र ",
                "विचार",
                "नेपाली ब्रान्ड ",
                " समाज",
                "कला",
                "खेलकुद",
                "ब्लग ",
                "ग्लोबल ",
              ].map((item) => (
                <NavLink
                  key={item}
                  to={`/${item.toLowerCase()}`}
                  className="text-white text-lg font-semibold pl-5 py-3 hover:bg-[#202C33]"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  {item}
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
