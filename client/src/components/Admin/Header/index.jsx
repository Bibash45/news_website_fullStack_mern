import React from "react";
import { useSelector } from "react-redux";

const Header = () => {
  const { username } = useSelector(
    (state) => state.auth.userInfo.userInfo || {}
  );

  return (
    <div className="bg-white w-full pl-64 pt-5 pr-8 pb-5 fixed top-0 left-0 drop-shadow-md z-10">
      <div className="flex items-center justify-end">
        <div className="flex items-center text-gray-900 text-semibold">
          स्वागत छ, &nbsp;
          <span className="text-gray-900 mr-4 font-[550]">
            {username.toUpperCase()}!
          </span>
          {/* <img
            src="/images/Header/avatar-black.png"
            className="h-8 w-8 rounded-full"
            alt=""
          /> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
