
import React, { useState } from "react";
import "./index.scss"
// import { NavLink } from "react-router-dom"
// import Logo from "../../assets/icons/logo.svg"
// import Facebook from "../../assets/icons/facebook.svg"
// import Twitter from "../../assets/icons/twitter.svg"
// import LinkedIn from "../../assets/icons/LinkedIn.svg"
import Sidebar from "./Sidebar"
import TopNav from "./Top"

export interface CardProps {
  number?: number;
  desc?: string;
  image?: string;
  charts?: any;
}

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="layout">
      <div>

      <Sidebar/>
      </div>
      
      <div className="left-menu">
      <TopNav/>
      {props.children}
      </div>


    </div>
  );
};

export default NavBar