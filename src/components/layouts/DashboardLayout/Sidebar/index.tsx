import React, { useState } from 'react';
import "./index.scss"
import { NavLink } from "react-router-dom"
import Logo from "../../../../assets/icons/logo.svg"
import DashboardIcon from "../../../../assets/icons/dashboard.svg"
import AnalysisIcon from "../../../../assets/icons/analysis.svg"
import ClubLibrary from "../../../../assets/icons/club-library.svg"
import Admins from "../../../../assets/icons/admin.svg"
import SettingIcon from "../../../../assets/icons/settings.svg"
import ReelIconBlack from "../../../../assets/icons/hightlight.svg"
import LogoutIcon from "../../../../assets/icons/logout.svg"
import { logOut} from "../../../../utils"

export interface CardProps {
  number?: number;
  desc?: string;
  image?: string;
  charts?: any;
}

const Home = () => {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const menu = [
    {
      id: 1,
      icon: DashboardIcon,
      title: "Dashboard",
      link: "/app/dashboard",
    },
    {
      id: 2,
      icon: ClubLibrary,
      title: "Club Library",
      link: "/app/clubs",
    },
    {
      id: 3,
      icon: Admins,
      title: "Co-Admins",
      link: "/app/admins",
    },
  ]

  return (
    <div className="sidebar">
      <div className="logo">
        <img src={Logo} alt="" />
      </div>
      <ul>
        {
          menu.map((item,index)=>(
            <li>
              <NavLink to={item.link} className="menu" activeClassName="active">

              <img src={item.icon} alt="logout" /> <div>{item.title}</div>
              </NavLink>
            </li>
          ))
        }
      </ul>
      <div className="logout-div" >
        <img src={SettingIcon} alt="logout" /> <div>Settings</div>
      </div>
      <div className="logout-div log" onClick={logOut}>
        <img src={LogoutIcon} alt="logout" /> <div>Logout</div>
      </div>
    </div>

  );
};

export default Home