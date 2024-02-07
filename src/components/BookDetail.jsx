import { useEffect, useState, useContext } from "react";
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


// useEffect(()=>{
//   const url = `http://data4library.kr/api/srchDtlList?authKey=43d7efdc5d7f99a3be907ecac62d3212026fb810e793f19e56fb0b5a390c93f8&isbn13=${state.isbn13}&loaninfoYN=Y&displayInfo=age&format=json`
//   fetch(url)
//   .then((response)=>{
//     if(!response.ok){
//       console.log("서버 통신 실패");
//     } else {
//       return response.json();
//     }
//   })
//   .then((data)=>{
//     const detail = data.response.detail[0].book;
//     const loanInfo = data.response;
//     console.log(detail);
//     console.log(loanInfo);
//     setBookInfo(detail);
//     setLoanInfo(loanInfo);

//   })
// }, [])
console.log(state.bookname);


  setTimeout(() => {
    const options = {
      method : 'GET',
      headers :{
        'Authorization' : 'KakaoAK 789e892b35aeb0184de0c86cfe742650'
      },
      document :[]
    }
    const toStringBookName = `${state.bookname}`.toString()
    const toStringBookIsbn13 = `${state.isbn13}`.toString()
    console.log("string Book", typeof toStringBookName)
    console.log("Book", typeof state.bookname)
    const url = `https://dapi.kakao.com/v3/search/book?target=title`;
  
    fetch(url, options)
    .then((response)=> {
      return response.json()
    })
    .then((data)=>{
      console.log("kakao", data);
    })
  }, "2000")

  

  return(
    <>
      <div className="detail-header">
        <div>{state.bookname} 상세 페이지</div>
          <div className="book">
            <img src={state.bookImageURL} alt={state.bookname}></img>
            <div className="">
              <div className="">{state.bookname}</div>
              <div className="">{state.class_nm}</div>
              <div className="">{state.isbn13}</div>
              <div className="">{state.ranking}</div>
              <div className="">{bookinfo.description}</div>
            </div>
          </div>
        </div>

        <div className="detail-body">
          <div></div>
        </div>

        <button onClick={handleGoBack}>뒤로가기</button>
    </>
  )
}