import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useLogoutMutation } from "../../../features/usersApiSlice";
import { useDispatch } from "react-redux";
import { flogout } from "../../../features/authSlice";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [accordion, setAccordion] = useState({
    newsAccordion: false,
    userAccordion: false,
  });

  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await logout();
      console.log(response);

      dispatch(flogout());
      navigate("/xyz/xyz/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <aside className="fixed bg-[#182229] text-white w-64 min-h-screen h-auto pl-4 pr-4 z-40">
      <div className=" flex items-center fixed pt-4 left-5 bg-[#182229] z-20">
        <img
          className="w-[50px] h-[50px] object-contain rounded-full "
          src="https://scontent.fktm3-1.fna.fbcdn.net/v/t39.30808-6/456430359_484335661016328_3546235393355045369_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=vjdPWoj0f44Q7kNvgElBfRU&_nc_oc=Adgbh63HEG9O_TzwvCezhUoLUskF9E5OD4edMQAm4GWcD5pq4QQkoUpBLSsalQG83kU_hjRyMlsqY1Wsn4nhiz0F&_nc_zt=23&_nc_ht=scontent.fktm3-1.fna&_nc_gid=AA7yXxjHt35j6e08pU1M9tr&oh=00_AYCUoVwCD_LlTc_ISEBoKB8Qw47U9DFFilGis-eGiAGkgg&oe=67A97661"
          alt=""
        />
        <h2 className="text-2xl font-bold pl-2">Admin Panel</h2>
      </div>
      <nav className="pt-5">
        <ul>
          <li className="mb-4 mt-16 hover:bg-gray-500 p-1 transition duration-300 ease-in-out">
            <Link to="/admin/" className="  flex transition text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 pr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                />
              </svg>
              <span className="font-bold">Dashboard</span>
            </Link>
          </li>

          <li className="mb-4 ">
            <div
              onClick={() => {
                setAccordion((prev) => ({
                  ...prev,
                  newsAccordion: !prev.newsAccordion,
                }));
              }}
              className="  flex  cursor-pointer items-center hover:bg-gray-500 p-1 transition duration-300 ease-in-out"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 pr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
                />
              </svg>
              <span className="font-bold pr-2">News Management</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`w-6 h-6 pr-1 transform ${
                  accordion.newsAccordion ? "rotate-180" : ""
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>
            {accordion.newsAccordion && (
              <ul className="ml-4">
                <li className="mt-2 hover:bg-gray-500 p-1 transition duration-300 ease-in-out">
                  <Link
                    to="/admin/createnews"
                    className="text-gray-400 hover:text-gray-100 transition"
                  >
                    Create
                  </Link>
                </li>
                <li className="mt-2 hover:bg-gray-500 p-1 transition duration-300 ease-in-out">
                  <Link
                    to="/admin/newslist"
                    className="text-gray-400 hover:text-gray-100 transition"
                  >
                    NewsList
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li className="mb-4  hover:bg-gray-500 p-1 transition duration-300 ease-in-out">
            <Link to="/admin/politics" className="  flex transition text-center">
              <span className="font-bold"> राजनीति</span>
            </Link>
          </li>
          <li className="mb-4  hover:bg-gray-500 p-1 transition duration-300 ease-in-out">
            <Link to="/admin/marketeconomy" className="  flex transition text-center">
              <span className="font-bold"> बजार अर्थतन्त्र</span>
            </Link>
          </li>
          <li className="mb-4  hover:bg-gray-500 p-1 transition duration-300 ease-in-out">
            <Link to="/admin/idea" className="  flex transition text-center">
              <span className="font-bold"> विचार</span>
            </Link>
          </li>
          <li className="mb-4  hover:bg-gray-500 p-1 transition duration-300 ease-in-out">
            <Link to="/admin/nepalbrand" className="  flex transition text-center">
              <span className="font-bold"> नेपाली ब्रान्ड</span>
            </Link>
          </li>
          <li className="mb-4  hover:bg-gray-500 p-1 transition duration-300 ease-in-out">
            <Link to="/admin/society" className="  flex transition text-center">
              <span className="font-bold"> समाज</span>
            </Link>
          </li>
          <li className="mb-4  hover:bg-gray-500 p-1 transition duration-300 ease-in-out">
            <Link to="/admin/art" className="  flex transition text-center">
              <span className="font-bold"> कला</span>
            </Link>
          </li>
          <li className="mb-4  hover:bg-gray-500 p-1 transition duration-300 ease-in-out">
            <Link to="/admin/sports" className="  flex transition text-center">
              <span className="font-bold"> खेलकुद</span>
            </Link>
          </li>
          <li className="mb-4  hover:bg-gray-500 p-1 transition duration-300 ease-in-out">
            <Link to="/admin/blog" className="  flex transition text-center">
              <span className="font-bold"> ब्लग</span>
            </Link>
          </li>
          <li className="mb-4  hover:bg-gray-500 p-1 transition duration-300 ease-in-out">
            <Link to="/admin/global" className="  flex transition text-center">
              <span className="font-bold"> ग्लोबल</span>
            </Link>
          </li>
      

          <li
            className="mb-8 hover:bg-gray-500 pl-1 py-1 transition duration-300 ease-in-out hover:text-white"
            onClick={handleLogout}
          >
            <Link className="  flex text-center transition items-center gap-1">
              <RiLogoutBoxLine size={20} />
              <span className="font-bold">Logout</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
