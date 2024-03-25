import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

export default function BookList ({libraryList}) {
  const [ bookData, setBookDate ] = useState([]);
  const navigate = useNavigate();

  const handleOnClickDetail = (data)=>{
    navigate (`/${data.isbn13}`, {state : data}
    );
  }


  return (
    <>
      {
      libraryList ?
      (libraryList &&
      libraryList?.map((book) => {
        const data = book.doc;
        return (
          <div className="book-wrap" key={data?.no}>
            <img src={data?.bookImageURL} />
            <div className="book-brief" >
              <div className="name">책 이름 : {data?.bookname}</div>
              <div className="author">{data?.authors}</div>
              <div className="class">{data?.class_nm}</div>
              <div className="isbn13">{data?.isbn13}</div>
              <button type="button" onClick={()=>handleOnClickDetail(data)}>상세보기</button>
            </div>
          </div>
        );
      }
        )) : <div>검색된 결과가 없습니다. 서울시 '-구' 검색해 보세요.</div>
      } 
    </>
  )

}