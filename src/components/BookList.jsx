import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function BookList ({item}) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const location =  useLocation();
  // const dataOn = useSelector(state => state)


  // const libraryData = item?.doc

  // console.log("item", item)
  // console.log("libraryData", libraryData)

  // console.log("BookList", libraryQuery)

  // const todoPoldeer = useGetQuery(queryBoolean);
  // console.log("useCallQuery : BookList", todoPoldeer.data)
  

  const handleOnClickDetail = (data)=>{
    navigate (
      `book:/${data.isbn13}`, 
      { state :{
          state : data,
          from : location.pathname,
        }
      }
    );
  }




  return (
    <div>
          <div className="book-wrap" key={item?.doc.no}>
            <img src={item?.doc.bookImageURL} alt={item?.doc.bookname} />
            <div className="book-brief">
              <div className="name">{item?.doc.bookname}</div>
              <div className="author">저자: {item?.doc.authors}</div>
              <div className="class">분류: {item?.doc.class_nm}</div>
              <div className="isbn13">ISBN: {item?.doc.isbn13}</div>
            <button type="button" onClick={() => handleOnClickDetail(item)}>
              상세보기</button>
          </div>
        </div>


    {/* 
      {!data && !state && (
        <div>검색된 결과가 없습니다. 서울시 '-구' 검색해 보세요.</div>
      )} */}
    </div>
  );
}