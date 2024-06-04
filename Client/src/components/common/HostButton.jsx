import React from "react";
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const HostButton = () => {
const navigate = useNavigate();
    return (
    <div
      onClick={() => {
        navigate("/signup");
      }}
      className="text-[#303030] hover:scale-90 transition-all duration-120 text-center text-sm py-3 px-6 capitalize bg-[#484848] rounded-full text-white hover:cursor-pointer "
    >
      Become a host
    </div>
  );
};

export default HostButton;
