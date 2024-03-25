import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from '../assets/Logo.svg';
import React from "react";

export const Header =  () => {
  const navigate = useNavigate();

  const maintenace =  true

  const handleMaintenace = () =>{
    navigate('/')
    window.alert("유지보수 중입니다.")
  }

  return(
    <>
      <div className="header-wrap">
        <div className="header" >
          <div className="header-left">
            <Link to='/'>
              <img className="logo" src={logo} alt="로고" />
            </Link>
          </div>
          <ul>
            <li>
              <Link to="/">검색</Link>
            </li>
            <li>
              <Link 
                onClick={handleMaintenace}
                to="/local">지역모임</Link>
            </li>
          </ul>
        </div>
      </div>
      
      <Outlet />
    </>
  )
};

export default Header