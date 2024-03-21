import React, { useState } from "react";
import SearchForm from "../components/SearchForm";
import BookList from "../components/BookList";

export default function Home (){
  const [title, setTitle] = useState("서울시");
  const [libraryList, setLibraryList] = useState([]);

  const onSearch = (newLibrarySet)=>{
    setLibraryList(newLibrarySet)

  }

  return(
    <>
    <h2 className="home-title">검색</h2>
      <div className="search-background">
        <div className="search-wrap">
          <h1><span className="search-title">{title}</span><br/>우리동네 도서관 베스트 도서</h1>
          <SearchForm setTitle={setTitle} setLibraryList={setLibraryList} onSearch={onSearch} />
        </div>
        <div className="notice">현재 서울시에 '-구'만 검색 가능합니다. <br/>예시) 종로구, 성동구 등</div>
      </div>

      <div className="content" >
        {libraryList && <BookList libraryList={libraryList} title={title} /> }
      </div>
    </>
  )
}