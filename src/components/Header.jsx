import { Link } from "react-router-dom";
import logo from '../assets/logo.svg';
import React from "react";

export const Header =  () => {

  return(
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
            <Link to="/local">지역모임</Link>
          </li>
        </ul>
      </div>
    </div>
  )
};

export default Header