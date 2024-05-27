import { NavLink, Outlet, ScrollRestoration, useNavigate } from "react-router-dom";
import logo from '../assets/Logo.svg';
import React, {useState, } from "react";

export const Header =  () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView ] = useState(false);


  const handleMaintenace = () =>{
    navigate('/')
    window.alert("유지보수 중입니다.")
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsMobileView(!isMobileView);

  };



  return(
    <>
      <header className={`header-wrap`}>
        <div className={`header`}>
          <div className={`header-left `}>
            <div className="logo"
              onClick={()=>navigate('/',{replace:true})}
              >
                <img className="logo" src={logo} alt="로고" />
              </div>
          </div>
          <nav className={`nav-menu `}>
            <ul>
              <li>
              {/* <NavLink to='/'>
                <img className="logo" src={logo} alt="로고" />
              </NavLink> */}
              </li>
              <li>
                <NavLink 
                preventScrollReset
                to="/" onClick={toggleMenu}>검색</NavLink>
              </li>
              {/* <li>
                <NavLink 
                preventScrollReset
                onClick={handleMaintenace} to="/local">지역모임</NavLink>
              </li> */}
            </ul>
          </nav>
        </div>
      </header>

      <ScrollRestoration getKey={(location) =>{
      return location.key}} 
      />
      <Outlet />
      <ScrollRestoration />

    </>
  );
};

export default Header