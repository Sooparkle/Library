import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {ReaderRecBooks} from "./ReaderRecBooks";



export const BookDetail = ()=>{
  const [ bookinfo, setBookInfo ] = useState([]);
  const { state } = useLocation();
  const navigate = useNavigate();


  console.log("BookDetail state", state)
  const  isbn = state?.state.doc.isbn13;
  const bookDesc = bookDetail?.response.book.description.replace("&lt;", '(').replace("&gt;", ")")




    const detailFetch= async () =>{

      try{
        const response = await 
        fetch(`http://data4library.kr/api/usageAnalysisList?authKey=${process.env.REACT_APP_LIBRARY}&isbn13=${isbn}&format=json`)
    // fetch("https://jsonplaceholder.typicode.com/todos/")

        if(!response.ok){
          throw new Error('상세 정보를 받아오는데 실패하였습니다.', response.status)
        }
        const data = await response.json()
        console.log("Detail DATA",data)
        return data
      }
      catch(error){
        console.error("상세 페이지를 가져오는데 문게가 생겼습니다.", error)
      }
  
    }

  const { data:bookDetail } = useQuery({
    queryKey : ["detail"],
    queryFn: detailFetch
  })


  console.log("react Query Deatil page", bookDetail)



  return(

    <div className="detail-wrap">
      <section className="detail-book">
        <img src={state?.state.doc.bookImageURL} alt={state?.state.doc.bookname}></img>
        <div className="detail-info">
          <div  className="detail-name">{state?.state.doc.ranking}. {state?.state.doc.bookname}</div>
          <div className="">{state?.state.doc.authors}</div>
          <div className="">분류 : {state?.state.doc.class_nm}</div>
          <div className="">ISBN : {state?.state.doc.isbn13}</div>
        </div>
      </section>

      <h3>작품소개</h3>
      <div className="detail-description">
        <div >
          {
            bookDetail ? bookDesc
          : <span>현재 제공하는 데이터가 없습니다.</span>
          }
        </div>

        <div className="detail-keyword-wrap">
          {
            bookDetail && bookDetail?.response.keywords.slice(0, 10).map((item, index) => (
              <span 
                className='detail-keyword' 
                key={index}>{item.keyword.word}</span>
            ))
          }
          </div>
      </div>
      
      <section>
        <ul>
          {
            bookDetail?.response.loanGrps.slice(0,5).map((group, idx) =>{
              return <ReaderRecBooks group={group} idx={idx+1} />
            })
          }
        </ul>
      </section>

      <button className="detail-button" onClick={()=>navigate(-1)}>뒤로가기</button>

    </div>

  )
}