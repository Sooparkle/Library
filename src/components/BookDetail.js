import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom"


export const BookDetail = ()=>{
const [ bookinfo, setBookInfo ] = useState([]);
const { state } = useLocation();
const { navigate } = useNavigate();
const [ loanInfo, setLoanInfo ] =useState([])

const handleGoBack = () => {
  navigate(-1);
};



  return(
    <>
      <div className="detail-header">
        <div  className="detail-name">{state?.ranking}. {state?.bookname}</div>
          <div className="detail-book">
            <img src={state?.bookImageURL} alt={state?.bookname}></img>
            <div className="detail-info">
              <div className="">{state?.authors}</div>
              <div className="">분류 : {state?.class_nm}</div>
              <div className="">ISBN : {state?.isbn13}</div>
              <div className="detail-description">
                <h3>작품소개</h3>
                <div>{bookinfo.description}</div>
                </div>
            </div>
          </div>
        </div>

        <button className="detail-button" onClick={handleGoBack}>뒤로가기</button>

    </>
  )
}