import React from "react";
import { NavLink, Outlet, ScrollRestoration, useNavigate } from "react-router-dom";
import logo from '../assets/Logo.svg';
import { LuSearch } from "react-icons/lu";
import { GoQuestion } from "react-icons/go";


export const Header:React.FC =  () => {
  const navigate = useNavigate();

  return(
    <>
      <header className={`header-wrap`}>
        <div className={`header`}>
          <div className={`header-left `}>
            <div
              tabIndex={-1}
                onClick={()=>navigate('/ ',{replace:true})}
              >
                <img className="logo" src={logo} alt="로고" />
              </div>
          </div>
          <nav className={`nav-menu `}>
            <ul>
              <li
              >
                <NavLink
                preventScrollReset
                to="/" ><LuSearch />{" "}<span>검색</span></NavLink>
              </li>
              <li
              >
                <NavLink
                preventScrollReset
                to="/faq"><GoQuestion />{" "}<span>FAQ</span></NavLink>
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