import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";

interface ApiResponse {
  response : BookResponse;
}

interface BookResponse {
  request : BookRequest;
  book : BookDetails;
  keywords : Keyword[];
}

interface BookRequest {
  isbn13: string;
}

interface BookDetails {
  bookname: string;
  authors: string;
  publisher: string;
  bookImageURL: string;
  description: string;
  publication_year: string;
  isbn13: string;
  vol: string;
  class_no: string;
  class_nm: string;
  loanCnt: number;
}

interface Keyword {
  keyword :{
    word:string;
  }
}


interface LocationState {
    doc: {
      isbn13: string;
      bookImageURL: string;
      bookname: string;
      ranking: number;
      authors: string;
      class_nm: string;
    };
}




export const BookDetail :React.FC = ()=>{
  const location = useLocation()
  const state = location.state as LocationState;
  const navigate = useNavigate();


  const  isbn = state?.doc.isbn13;
  const bookDesc = bookDetailInfoData?.response.book.description.replace("&lt;", '(').replace("&gt;", ")")




    const detailFetch= async () : Promise<ApiResponse | undefined> =>{

      try{
        const response = await 
        fetch(`http://data4library.kr/api/usageAnalysisList?authKey=${process.env.REACT_APP_LIBRARY}&isbn13=${isbn}&format=json`)
    // fetch("https://jsonplaceholder.typicode.com/todos/")

        if(!response.ok){
          throw new Error('상세 정보를 받아오는데 실패하였습니다.')
        }
        const data : ApiResponse = await response.json()
        return data
      }
      catch(error){
        console.error("상세 페이지를 가져오는데 문게가 생겼습니다.", error)
      }
  
    }

  const { data:bookDetailInfoData } = useQuery<ApiResponse | undefined>({
    queryKey : ["detail"],
    queryFn: detailFetch
  })




  return(

    <div className="detail-wrap">
      <section className="detail-book">
        <img src={state?.doc.bookImageURL} alt={state?.doc.bookname}></img>
        <div className="detail-info">
          <div  className="detail-name">{state?.doc.ranking}. {state?.doc.bookname}</div>
          <div className="">{state?.doc.authors}</div>
          <div className="">분류 : {state?.doc.class_nm}</div>
          <div className="">ISBN : {state?.doc.isbn13}</div>
        </div>
      </section>

      <h3>작품소개</h3>
      <div className="detail-description">
        <div >
          {
            bookDetailInfoData ? bookDesc
          : <span>현재 제공하는 데이터가 없습니다.</span>
          }
        </div>

        <div className="detail-keyword-wrap">
          {
            bookDetailInfoData && bookDetailInfoData?.response.keywords.slice(0, 10).map((item, index) => (
              <span 
                className='detail-keyword' 
                key={index}>{item.keyword.word}</span>
            ))
          }
          </div>
      </div>
      

      <button className="detail-button" onClick={()=>navigate(-1)}>뒤로가기</button>

    </div>

  )
}