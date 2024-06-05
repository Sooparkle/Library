import React from "react";
import { useLocation, useNavigate } from "react-router-dom";



interface Item {
  addition_symbol: string;
  authors: string;
  bookDtlUrl: string;
  bookImageURL: string;
  bookname: string;
  class_nm: string;
  class_no: string;
  isbn13: string;
  loan_count: string;
  no: number;
  publication_year: string;
  publisher: string;
  ranking: string;
  vol: string;
}

interface ItemsProps{
  doc : Item
}


const BookList : React.FC<ItemsProps> =  ( { doc }) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const location =  useLocation();
  
  const handleOnClickDetail =()=>{
    navigate (
      `book:/${doc.isbn13}`, 
      { state :{
          state : doc,
          from : location.pathname,
        }
      }
    );
  }



  return (
    <div>

      <div className="book-wrap" key={doc.no}>
        <img src={doc.bookImageURL} alt={doc.bookname} />
        <div className="book-brief">
          <div className="name">{doc.bookname}</div>
          <div className="author">저자: {doc.authors}</div>
          <div className="class">분류: {doc.class_nm}</div>
          <div className="isbn13">ISBN: {doc.isbn13}</div>
        <button type="button" onClick={handleOnClickDetail}>
          상세보기</button>
        </div>
      </div>

    </div>
  );
}

export default BookList