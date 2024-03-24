import "./App.css";
import React, { useState } from "react";
import SearchForm from "./components/SearchForm";
import BookList from "./components/BookList";

function App() {
  const [title, setTitle] = useState("");
  const [libraryList, setLibraryList] = useState([]);

  const onSearch = (newLibraryList) => {
    console.log("Data onSearch", newLibraryList);
    setLibraryList(newLibraryList);
  };

  return (
    <>
      <div className="search-background">
        <div className="search-wrap">
          <h1>우리동네 도서관 베스트 도서</h1>
          {title ? (
          <p className="search-title">{title}</p>
        ) : (
          <p className="search-title">지역구를 선택해 보세요.</p>
        )}
          <SearchForm setTitle={setTitle} onSearch={onSearch} />
        </div>
      </div>

      <div className="content">
        {
          title && <p className="search-title"> 선택한 지역구 : {title}</p>
        }
        {libraryList && <BookList libraryList={libraryList} />}
      </div>
    </>
  );
}

export default App;
