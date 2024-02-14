import { useEffect, useState, useContext } from "react";
import { useLocation, useParams } from "react-router-dom"
import { NavigateContext } from "./WithNavigate";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';


ChartJS.register(ArcElement, Tooltip, Legend);

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

      const bookDetailUrl = new URL(`http://data4library.kr/api/srchDtlList?`);
      bookDetailUrl.search = bookDetailUrlParams.toString();

      const response = await fetch(bookDetailUrl.toString());
      console.log("Book Detail URL with queris has been sented")
      if(!response.ok){
        throw new Error (`Book Detail API failed ${response.status}`)
      }

      const data = await response.json();
    
      console.log("Book Detail data done", data)
      console.log("Book Detail data.response.loanInfo[2] done", data.response.loanInfo[2])

      const detail = data.response.detail[0].book;
      const loanInfo = data.response.loanInfo[2].ageResult;
  
  
      console.log("book Detail",detail);
      console.log("age [0]", loanInfo);
      setBookInfo(detail);
      setLoanInfo(loanInfo);


    } catch (error) {
      console.error("Book Detail API failed", error);
    }
  }

  useEffect(()=>{
    libraryBookDetail();
    
  }, [])





  // const data = {
  //   labels: [
  //     `${loanInfo[0].age.name}`, 
  //     `${loanInfo[1].age.name}`, 
  //     `${loanInfo[2].age.name}`, 
  //     `${loanInfo[3].age.name}`, 
  //     `${loanInfo[4].age.name}`, 
  //     `${loanInfo[5].age.name}`, 
  //     `${loanInfo[6].age.name}`, 
  //   ],
  //   datasets: [
  //     {
  //       label: 'My Chart',
  //       data: [
  //         loanInfo[0].age.loanCnt, 
  //         loanInfo[1].age.loanCnt, 
  //         loanInfo[2].age.loanCnt, 
  //         loanInfo[3].age.loanCnt,
  //         loanInfo[4].age.loanCnt,
  //         loanInfo[5].age.loanCnt,
  //         loanInfo[6].age.loanCnt,
  //       ],
  //       backgroundColor: [
  //         'red', 
  //         'blue',
  //         'yellow', 
  //         'green',
  //         'black',
  //         'grey',
  //         'teal'
  //       ],
  //     },
  //   ],
  // };


  const MyDoughnutChart = () => {
    return (
      <Doughnut data={data} options={{}}  />
    );
  };
  


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

        <button className="detail-button" onClick={handleGoBack}>뒤로가기</button>

        <div className="detail-body">
          <div>차트</div>
          <div className="chart1">
            {/* {(loanInfo && <Doughnut data={data} options={{}} style={{ width: '400px', height: '400px'}}/>)  } */}

          </div>
          </div>



    </>
  )
}