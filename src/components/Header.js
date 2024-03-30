import { Link, NavLink, Outlet, ScrollRestoration, useNavigate } from "react-router-dom";
import logo from '../assets/Logo.svg';
import React, {useState, useEffect} from "react";

export const Header =  () => {
  const navigate = useNavigate();


  // useEffect(()=>{
  //   const handleWidth = () => {
  //     if(window.innerWidth < 768){
  //       setIsMobileView(true);
  //     } else {
  //       setIsMobileView(false);
  //       setIsMenuOpen(false)
  //     }
  //   }

  //   window.addEventListener("resize", handleWidth);

  //   return() => window.removeEventListener("resize", handleWidth);

  // },[])

  const handleMaintenace = () =>{
    navigate('/')
    window.alert("유지보수 중입니다.")
  }

  // const toggleMenu = () => {
  //   setIsMenuOpen(!isMenuOpen);
  //   setIsMobileView(!isMobileView);

  // };



  return(
    <>
      <div className={`header-wrap`}>
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
                to="/" >검색</NavLink>
              </li>
              <li>
                <NavLink 
                preventScrollReset
                onClick={handleMaintenace} to="/local">지역모임</NavLink>
              </li>
            </ul>
          </nav>
          {/* <div className="hamburger-icon" onClick={toggleMenu}>
            <div className={`hamburger-line ${isMenuOpen ? 'open' : ''}`} />
            <div className={`hamburger-line ${isMenuOpen ? 'open' : ''}`} />
            <div className={`hamburger-line ${isMenuOpen ? 'open' : ''}`} />
          </div> */}
        </div>
      </div>

      <Outlet />
      <ScrollRestoration getKey={(location) =>{
      return location.key}} 
      />

    </>
  );
};

export default Header