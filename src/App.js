import "./App.css";
import React, { useState } from "react";
import SearchForm from "./components/SearchForm";
import BookList from "./components/BookList";

function App() {
  const [title, setTitle] = useState("");
  const [libraryList, setLibraryList] = useState(null);

  const onSearch = (newLibraryList) => {
    console.log("Data onSearch", newLibraryList);
    setLibraryList(newLibraryList);
  };


  return (
    <>
      <div className="search-background">
        <div className="search-wrap">
          <h1>우리동네 도서관 베스트 도서 <span>검색</span></h1>
          {title ? (
          <p className="search-title">{title}</p>
          ) : (
          <p className="search-title">지역구를 선택해 보세요.</p>
        )}
          <SearchForm setTitle={setTitle} onSearch={onSearch} />
          <p>공공데이터에서 정보를 받아오는 데 <span>5초~10초</span> 시간이 걸립니다.<br />10초가 넘었음에도 정보가 출력되지 않으면 다시 시도해보시기 바랍니다.</p>
        </div>
      </div>

      <div className="content">
        {
          libraryList && (
          <p className="search-title"> 선택한 지역구 : {title}</p>
          ) 
        }
        {
          libraryList ? (
          libraryList && <BookList libraryList={libraryList} />)
          : <p>아직 공공데이터로부터 들어온 데이터가 없습니다.</p>
        }
      </div>
      <div
        className="ppt"
        onClick={()=>{window.open('https://docs.google.com/presentation/d/1EDLgsa5C0gUm0vAPXyOkXXidjDJ1kSwUmXckX7GExx0/edit?usp=sharing', '_blank')}}
      > PPT확인
      </div>
        </>
  );
}

export default App;
