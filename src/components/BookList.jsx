import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import NaverApi from "./NaverApi";

export default function BookList ({libraryList, title}) {

  const navigate = useNavigate();

  const handleOnClickDetail = (data)=>{
    navigate (
    `/home/${data.isbn13}`, 
    {state : data}
    );
  }

  return (
    <>
      {
      libraryList.map((book)=>{
        const data = book.doc
        return(
          <div className="book-wrap" key={data.no}>
            {/* <img src={data.bookImageURL} alt={data.bookname} /> */}
            <NaverApi book={book} title={title} />
            <div className="book-brief">
              <div className="name" onClick={()=> handleOnClickDetail(data)} >{data.no}. {data.bookname}</div>
              <div >{data.authors}</div>
              <div>{data.class_nm}</div>
              <div>{data.isbn13}</div>
              <button type="button">상세보기</button>
            </div>
          </div>
        )
      })
      }
    </>
    
  )
}