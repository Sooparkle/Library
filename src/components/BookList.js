import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"

export default function BookList ({libraryList}) {
  const [ bookData, setBookDate ] = useState([]);
  const navigate = useNavigate();
  const { state } = useLocation();

  console.log("BookList STATE", state)

  const handleOnClickDetail = (data)=>{
    navigate (`/${data.isbn13}`, {state : data}
    );
  }


  const renderBookList = (list) => {
    return list.map((book) => {
      const data = book.doc;
      return (
        <div className="book-wrap" key={data?.no}>
          <img src={data?.bookImageURL} alt={data?.bookname} />
          <div className="book-brief">
            <div className="name">책 이름: {data?.bookname}</div>
            <div className="author">저자: {data?.authors}</div>
            <div className="class">분류: {data?.class_nm}</div>
            <div className="isbn13">ISBN: {data?.isbn13}</div>
            <button type="button" onClick={() => handleOnClickDetail(data)}>
              상세보기
            </button>
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      {libraryList && renderBookList(libraryList)}
      {!libraryList && state && renderBookList(state)}
      {!libraryList && !state && (
        <div>검색된 결과가 없습니다. 서울시 '-구' 검색해 보세요.</div>
      )}
    </div>
  );
}