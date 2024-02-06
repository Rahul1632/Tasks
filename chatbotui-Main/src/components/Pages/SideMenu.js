import React, { useEffect, useState } from 'react';
import { AiOutlineHome, AiOutlineMessage, AiOutlineRobot } from 'react-icons/ai';

import { FiLogOut } from "react-icons/fi";
// import { BiUserCircle } from "react-icons/bi";
import { BsFileBarGraph } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import logo from "../../Images/brilworks-logo.png";
import LogOut from "../SignIn/LogOut";
import withRouter from "../WrapperComponents/withRouter";

const SideMenu = (props) => {
  const [activeLink, setActiveLink] = useState({ id: null, active: false });
  const splitCurrentParams = useLocation().pathname.split('/');
  const currentParams = splitCurrentParams[splitCurrentParams.length - 1];
  const [isLogOut, setIsLogOut] = useState(false);

  const data = [
    {
      id: 1,
      menu: 'Home',
      icon: AiOutlineHome,
      handleClickValue: '/dashboard',
    },
    {
      id: 2,
      menu: 'DashBoard',
      icon: AiOutlineRobot,
      handleClickValue: '/dashboard',
    },
    // {
      // id: 3,
      // menu: 'Create New Bot',
      // icon: AiOutlineMessage,
      // handleClickValue: '/chatbot',
    // },
    {
      id: 4,
      menu: "Metrics",
      icon: BsFileBarGraph,
      handleClickValue: "/metrics",
    },
  ];

  const toggleActiveLink = (id) => {
    setActiveLink({ id: id, active: true });
  };

  useEffect(() => {
    data?.filter((item) => {
      const splitData = item?.handleClickValue?.split('/');
      const activeLink = splitData[splitData?.length - 1];
      if (currentParams === activeLink) {
        return toggleActiveLink(item?.id);
      }
      return '';
    });
  }, []);

  const handleLogout = () => {
    props?.history('/login');
    localStorage.clear('token');
    setIsLogOut(false);
  };
  const logOut = React.createElement(FiLogOut, {
    className: 'sidemenu-icon',
  });
  // const userProfile = React.createElement(BiUserCircle, {
  //   className: "sidemenu-icon",
  // });

  return (
    <>
      <div className='sidemenu'>
        <div className='sidemenu-icon-list'>
          <div className='sidemenu-logo'>
            <img src={logo} alt='Brilbot' className='logo' />
          </div>
          <div className='flex-dir-col flex-1'>
            {data.map((data) => {
              const IconElement = React.createElement(data?.icon, {
                className: 'sidemenu-icon',
              });
              return (
                <Link
                  className={`sidebar-navlink ${activeLink.id === data?.id && activeLink.active ? 'active-menu' : ''}`}
                  to={data?.handleClickValue}
                  key={data.id}
                  onClick={() => toggleActiveLink(data?.id)}
                >
                  {IconElement}
                </Link>
              );
            })}
          </div>
          {/* <div className="sidebar-navlink ">{userProfile}</div> */}
          <div className="sidebar-navlink " onClick={() => setIsLogOut(true)}>
            {logOut}
          </div>
          {isLogOut && (
            <LogOut
              handleLogout={handleLogout}
              setIsOpen={setIsLogOut}
              isOpen={isLogOut}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default withRouter(SideMenu);
