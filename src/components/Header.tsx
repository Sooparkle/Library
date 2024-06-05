import React from "react";
import { NavLink, Outlet, ScrollRestoration, useNavigate } from "react-router-dom";
import logo from '../assets/Logo.svg';

export const Header:React.FC =  () => {
  const navigate = useNavigate();

  return(
    <>
      <header className={`header-wrap`}>
        <div className={`header`}>
          <div className={`header-left `}>
            <div className="logo"
              tabIndex={-1}
                onClick={()=>navigate('/',{replace:true})}
              >
                <img className="logo" src={logo} alt="로고" />
              </div>
          </div>
          <nav className={`nav-menu `}>
            <ul>
              <li
                tabIndex={0}
              >
                <NavLink
                preventScrollReset
                to="/" >검색</NavLink>
              </li>
              <li
                tabIndex={0}
              >
                <NavLink
                preventScrollReset
                to="/faq">FAQ</NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <ScrollRestoration getKey={(location) =>location.key} />
      <Outlet />
      <ScrollRestoration />

    </>
  );
};

export default Header