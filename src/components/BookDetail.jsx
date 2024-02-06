import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom"

export const BookDetail = ()=>{

const { state } = useLocation();

// useEffect(()=>{
//   const url = `http://data4library.kr/api/srchDtlList?authKey=43d7efdc5d7f99a3be907ecac62d3212026fb810e793f19e56fb0b5a390c93f8&isbn13=${isbn13}&loaninfoYN=Y&displayInfo=age&format=json`
//   fetch(url)
//   .then((response)=>{
//     if(!response.ok){
//       console.log("서버 통신 실패");
//     } else {
//       return response.json();
//     }
//   })
//   .then((data)=>{
//     console.log(data);
//   })
// }, [])


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
          </div>
        </div>
      </div>

      <div className="detail-body">
        
      </div>
    </>
  )
}