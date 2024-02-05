import { useState } from "react";
import logo from '../logo.svg';
import { SearchForm } from "./searchForm";

export default function Home() {

  const [ libraryList, setLibraryList ] =useState([]);
  const [ title, setTitle ] = useState("서울시");


  return (
    <>
    
    <div className="search-background">
        <h1><span className="title">{title}</span> 우리동네 도서관 베스트 도서목록!</h1>
      <div className="search-wrap">
        <div className="logo-wrap">
        <img src={logo} alt="logo" />
        </div>
        <SearchForm setLibraryList={setLibraryList} setTitle={setTitle}/>
      </div>
    </div>

    <div className="data-wrap">
    { (libraryList) && 
      libraryList.map((book)=>{
        return(
          <div className="book-wrap">
            <img src={book.doc.bookImageURL} alt={book.doc.bookname} />
            <div className="book-info">
            <div key={book.doc.no}>{book.doc.bookname}</div>
              <div className="authors">{book.doc.authors}</div>
              <div className="genres">{book.doc.class_nm}</div>
              <div className="isbn13">{book.doc.isbn13}</div>
            </div>
          </div>
        )
      })
    }
    </div>

    </>


  );
}
