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

  // call data from sessionStorage

const sessionDataString = sessionStorage.getItem(`${title}`);
const sessionDatas = JSON.parse(sessionDataString);

  return (
    <>
      {(sessionDatas &&
        sessionDatas.map((book) => {
          const data = book.doc;
          return (
            <div className="book-wrap" key={data.no}>
              <img src={data.bookImageURL} />
              {/* <NaverApi book={data}/> */}
              <div className="book-brief" >
                <div className="name">책 이름 : {data.bookname}</div>
                <div className="author">{data.authors}</div>
                <div className="class">{data.class_nm}</div>
                <div className="isbn13">{data.isbn13}</div>
                <button type="button"  onClick={()=>{handleOnClickDetail(data)}}>상세보기</button>
              </div>
            </div>
          );
        })) || <div>검색된 결과가 없습니다. 서울시 '-구' 검색해 보세요.</div>}
    </>
  )
}