import React, { useEffect, useState, useContext } from "react";
import { useLocation, useParams } from "react-router-dom"
import { NavigateContext } from "./WithNavigate";


export const BookDetail = ()=>{
const [ bookinfo, setBookInfo ] = useState([]);
const { state } = useLocation();
const { navigate } = useContext(NavigateContext);
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

        <div className="detail-body">
          <div>차트</div>
          <div className="chart1">
          {(loanInfo && 
                  <Chart
                  chartType="PieChart"
                  data={data}
                  options={options}
                  width={"100%"}
                  height={"400px"}
                />) }
                {!chartData && <div>로딩중 입니다...</div> }
          </div>
          </div>



    </>
  )
}