import { useState } from "react";
import BookList from "../components/BookList";
import SearchForm from "../components/SearchForm";

export default function Home () {
  const [ title, setTitle ] = useState("");
  const [ libraryList, setLibraryList ] = useState([]);

  return(
    <>
      <div className="search-background">
        <div className="search-wrap">
          <h1><span>{title}</span> 우리동네 도서관 베스트 도서</h1>
        </div>
        <SearchForm setLibraryList={setLibraryList} setTitle={setTitle}/>
      </div>

      <div className="book-wrap">
        {
          libraryList && <BookList libraryList={libraryList} title={title} />
        }
      </div>
    </>
  )
}