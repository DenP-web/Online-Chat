import React from "react";
import { BiLogOut } from "react-icons/bi";

const LogoutButton = () => {
  return (
    <div className="mt-auto">
      <button className="w-6 h-6 cursor-pointer text-white">
        <BiLogOut />
      </button>
    </div>
  );
};

export default LogoutButton;
