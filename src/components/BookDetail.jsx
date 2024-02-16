import { useEffect, useState, useContext } from "react";
import { useLocation, useParams } from "react-router-dom"
import { NavigateContext } from "./WithNavigate";
import { Chart } from "react-google-charts";


export const BookDetail = ()=>{
const [ bookinfo, setBookInfo ] = useState([]);
const { state } = useLocation();
const { navigate } = useContext(NavigateContext);
const [ loanInfo, setLoanInfo ] =useState([])

const handleGoBack = () => {
  navigate(-1);
};

  const libraryBookDetail = async () =>{
    try{
      const isbn13 = state.isbn13;

      const bookDetailUrlParams = new URLSearchParams({
        authKey : '43d7efdc5d7f99a3be907ecac62d3212026fb810e793f19e56fb0b5a390c93f8',
        isbn13 : isbn13,
        loaninfoYN : 'Y',
        displayinfo : 'age',
        format : 'json'
      });

      const bookDetailUrl = new URL(`https://data4library.kr/api/srchDtlList?`);
      bookDetailUrl.search = bookDetailUrlParams.toString();

      const response = await fetch(bookDetailUrl.toString());
      console.log("Book Detail URL with queris has been sented")

      if(!response.ok){
        throw new Error (`Book Detail API failed ${response.status}`)
      }

      const data = await response.json();
    
      console.log("Book Detail data done", data.response.datail)
      console.log("Book Detail data.response.loanInfo[2] done", data.response.loanInfo[2])

      const detail = data.response.detail[0].book;
      const loanInfo = data.response.loanInfo[2].ageResult;
  
        
      const t = sessionStorage.setItem(`${state.bookname}`, JSON.stringify(loanInfo));
      // Later when retrieving:
      const storedObject = JSON.parse(sessionStorage.getItem(state.bookname));
      

      setBookInfo(detail);
      setLoanInfo(storedObject);

      console.log("book Detail",detail.description);
      console.log("age [0]", loanInfo);


    } catch (error) {
      console.error("Book Detail API failed", error);
    }
  }

  useEffect(()=>{
    libraryBookDetail();
  }, [])


  console.log("OUTSIDE", )

  return(
    <>
      <div className="detail-header">
        <div  className="detail-name">{state.ranking}. {state.bookname}</div>
          <div className="detail-book">
            <img src={state.bookImageURL} alt={state.bookname}></img>
            <div className="detail-info">
              <div className="">{state.authors}</div>
              <div className="">분류 : {state.class_nm}</div>
              <div className="">ISBN : {state.isbn13}</div>
              <div className="detail-description">
                <h3>작품소개</h3>
                <div>{bookinfo.description}</div>
                </div>
            </div>
          </div>
        </div>
        <hr/>
        <button className="detail-button" onClick={handleGoBack}>다시 검색하기</button>

        <div className="detail-body">
          <div className="chart1">

            {/* {(loanInfo && 
                  <Chart
                  chartType="PieChart"
                  data={datas}
                  options={options}
                  width={"100%"}
                  height={"400px"}
                />)  } */}

          </div>
          </div>



    </>
  )
}
