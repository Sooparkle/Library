import { useState } from "react";
import SearchForm from "../components/SearchForm";
import BookList from "../components/BookList";

export default function Home (){
  const [title, setTitle] = useState("서울시");
  const [libraryList, setLibraryList] = useState([]);

  return(
    <>
      <div className="search-background">
        <div className="search-wrap">
          <h1><span>{title}</span>우리동네 도서관 베스트 도서</h1>
          <SearchForm setTitle={setTitle} setLibraryList={setLibraryList} />
        </div>
      </div>

      <div className="book-wrap" >
        {libraryList && <BookList libraryList={libraryList} /> }
      </div>
    </>
  )
}