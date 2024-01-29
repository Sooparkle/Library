import { useState, useEffect } from 'react';
import './App.css';
import react from "@vitejs/plugin-react-swc";
import {BrowserRouter, Link, Route} from 'React-Router-dom';
import Youtube from './component/Youtube';



function App() {

  const [title, setTitle] = useState('서울시');

  const [searchKeyword, setSearchKeyword] = useState("");
  const [formResult, setFormResult] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [count, setCount] = useState(0);
  const [newLibrary, setNewLibrary] = useState([]);
  const library =[
    {id : 1, value : 11010 , libName : "종로구" },
    {id : 2, value : 11020, libName : "중구" },
    {id : 3, value : 11030, libName : "용산구" },
    {id : 4, value : 11040, libName : "성동구" },
    {id : 5, value : 11050, libName : "광진구" },
    {id : 6, value : 11060, libName : "동대문구" },
    {id : 7, value : 11070, libName : "중랑구" },
    {id : 8, value : 11080, libName : "성북구" },
    {id : 9, value : 11090, libName : "강북구" },
    {id : 10, value : 11100, libName : "도봉구" },
    {id : 11, value : 11110, libName : "노원구" },
    {id : 12, value : 11120, libName : "은평구" },
    {id : 13, value : 11130, libName : "서대문구" },
    {id : 14, value : 11140, libName : "마포구" },
    {id : 15, value : 11150, libName : "양천구" },
    {id : 16, value : 11160, libName : "강서구" },
    {id : 17, value : 11170, libName : "구로구" },
    {id : 18, value : 11180, libName : "금천구" },
    {id : 19, value : 11190, libName : "영등포구" },
    {id : 20, value : 11200, libName : "동작구" },
    {id : 21, value : 11210, libName : "관악구" },
    {id : 22, value : 11220, libName : "서초구" },
    {id : 23, value : 11230, libName : "강남구" },
    {id : 24, value : 11240, libName : "송파구" },
    {id : 25, value : 11250, libName : "강동구" },
  ]

// 슬라이더
// https://www.youtube.com/watch?v=iyj3TZXg2gQ


  //https://velog.io/@jahommer/React-Top%EB%B2%84%ED%8A%BC-scroll-to-top%EB%A7%8C%EB%93%A4%EA%B8%B0

//input 정보 변경 및 저장하기
  const handleChangeInput = (e)=>{
    const inputKeyValue = e.target.value;
    setSearchKeyword(inputKeyValue);
  };

// form 으로 검색 값 submit 하기 
  const handleResult = (e)=>{
    e.preventDefault();
    setFormResult(searchKeyword);
    searchLibDatas(searchKeyword);
  };

// Library API 정보  fetch로 data 가져오기 
  const searchLibDatas = (keyword)=>{
    for ( var i= 0 ; i < library.length; i++){
      if(keyword == library[i].libName){
        setTitle(library[i].libName)
        const selectedLib = library[i].value
        const url = `http://data4library.kr/api/loanItemSrchByLib?authKey=43d7efdc5d7f99a3be907ecac62d3212026fb810e793f19e56fb0b5a390c93f8&dtl_region=${selectedLib}&startDt=2023-01-01&endDt=2023-12-31&format=json`
        fetch(url).then((response)=>{
          if(response.status !== 200){
            console.log("서버 통신 실패!");
          } else {
            return response.json();
          }
        }).then((data) => {
          console.log(data)
          const jsonData = data.response.docs
          setNewLibrary(jsonData);
          console.log(jsonData);
        })
      }
    }
    };

// scroll Top button 
    const handleScroll = () =>{
      window.scroll({top:0, behavior:'smooth'});
    }

  return (
    <>
      <div className="search-background">
        <h1><span className="lib-title">{title}</span> 우리 동네 도서관 <br/>대출 베스트 200</h1>
        <div className="search-wrap">
          <div><span className='logo'>LOGO</span></div>
          <form onSubmit={handleResult}>
            <input value={searchKeyword} onChange={handleChangeInput}></input>
          </form>
          <button type="submit">검색</button>
        </div>
      </div>
      <Youtube/>

      <div className="data-wrap">
      {
        newLibrary.map((item) => {
          const dataBook=item.doc;
          return (
            <div className="book-wrap" key={dataBook.no}>
              <img src={dataBook.bookImageURL} alt={dataBook.bookname} />
              <div className="detail">
                <div className="name-ranking"><Link to="/detail">{dataBook.no}. {dataBook.bookname}</Link></div>
                <div className="author">{dataBook.authors}</div>
                <div className="genres">{dataBook.class_nm}</div>
                <div className="isbn13">{dataBook.isbn13}</div>
              </div>
          </div>
        )
        })
      }
      </div>
      <div>
        {/* <Route  path='"/detail' Component={detail} /> */}
      </div>
      <button className="top-scroll-btn" onClick={handleScroll} type="button" >TOP</button>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </>
  )
}

export default App
