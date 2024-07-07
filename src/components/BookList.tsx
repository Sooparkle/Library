import React from "react";
import { useLocation, useNavigate } from "react-router-dom";



interface Item {
  doc : {
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
}

interface ItemsProps{
  item : Item
}


const BookList : React.FC<ItemsProps> =  ( { item }) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const location =  useLocation();
  

  const handleOnClickDetail =()=>{
    
    // console.log("item", item)
    navigate (
      `book/${item?.doc.isbn13}`, 
      { state :{
          doc : item.doc,
          from : location.pathname,
        }
      }
    );
  }



  return (
    <div>

      <div className="book-wrap" key={item.doc.no}>
        <img src={item.doc.bookImageURL} alt={item.doc.bookname} />
        <div className="book-brief">
          <div className="name">{item.doc.no}. {item.doc.bookname}</div>
          <div className="author">저자: {item.doc.authors}</div>
          <div className="class">분류: {item.doc.class_nm}</div>
          <div className="isbn13">ISBN: {item.doc.isbn13}</div>
        <button type="button" onClick={handleOnClickDetail}>
          상세보기</button>
        </div>
      </div>

    </div>
  );
}

export default BookList