import "./App.css";
import React, { useEffect, useState } from "react";
import SearchForm from "./components/SearchForm";
import BookList from "./components/BookList";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { ReactComponent as DownAllow } from "./assets/DonwAllow.svg"


function App() {
  const [title, setTitle] = useState("");
  const [libraryList, setLibraryList] = useState(null);
  const [ scrollPosition, setScrollPosition ] = useState();

  const location =useLocation()
  const fetchBookList = useSelector(state => state.searchList)
  
  
  const onSearch = (newLibraryList) => {
    setLibraryList(newLibraryList);
  };

  useEffect(()=>{
      setLibraryList(fetchBookList?.dataList)
  },[location.pathname])


  useEffect(()=>{
    const handelScroll = () =>{
      setScrollPosition(window.scrollY);
  }
  window.addEventListener("scroll",handelScroll)

  return() => window.removeEventListener("scroll", handelScroll);

},[])

useEffect(() => {
  window.scrollTo(0, scrollPosition);
}, [location.pathname]);

  return (
    <>
      <div className="search-background">
        <div className="search-wrap">
          <h1>우리동네 도서관 베스트 <br />도서 <span>검색</span></h1>
          {title ? (
          <p className="search-title">{title}</p>
          ) : (
          <p className="search-title">지역구를 선택해 보세요.</p>
        )}
          <SearchForm setTitle={setTitle} onSearch={onSearch} />
          <p>공공데이터에서 정보를 받아오는 데 <span>5초~10초</span> 시간이 걸립니다.<br />10초가 넘었음에도 정보가 출력되지 않으면 다시 시도해보시기 바랍니다.</p>
        </div>
        <div className="search-down-allow">
          {libraryList &&  <DownAllow />}
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
          libraryList && <BookList  libraryList={libraryList}/>)
          : <p>아직 공공데이터로부터 들어온 데이터가 없습니다.</p>
        }
      </div>
        </>
  );
}

export default App;
