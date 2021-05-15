import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="fixed bg-transparent py-4 z-50" style={{ width: "100vw" }}>
      <div className="grid text-base font-semibold text-white  justify-items-end px-8 ">
        <div className="grid w-auto grid-flow-col gap-x-4 ">
          <Link to="/area120">
            <span className="cursor-pointer"> Area120</span>
          </Link>
          <Link to="/web">
            <span className="cursor-pointer"> Web</span>
          </Link>
          <Link to="/app">
            <span className="cursor-pointer"> App</span>
          </Link>
          <Link to="/">
            <span className="cursor-pointer"> Dev</span>
          </Link>
          <Link to="/">
            <span className="cursor-pointer"> Home</span>
          </Link>
          <Link to="/signin">
            <span className="cursor-pointer"> Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
