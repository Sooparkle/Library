import {useState, useEffect, useRef } from 'react';
import { BookList } from './BookList';


export const SearchForm = ({setLibraryList, setTitle}) => {

  const [ inputResult, setInputResult ] = useState("");
  const [ formResult, setFormResult ] = useState("");
  const inputRef = useRef("");

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
  ];

  const handleOnChange =(e) => {
    setInputResult(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setFormResult(inputRef.current.value);
    setInputResult("");
    setTitle(inputRef.current.value)
    fetchCall(inputRef.current.value);
  };

  // 검색을 잘못 했을 때, 노출되야 할 정보값 출력 방법 확인 필요.
  // 한번도 검색해보지 않은 도서관 code로 최초 통신시 약 13초 걸림.

const fetchCall = (keyword)=>{
  for(var i = 0; i < library.length; i++){
    if(keyword == library[i].libName){
      const selectedCode =  library[i].value;
      const url = `http://data4library.kr/api/loanItemSrchByLib?authKey=43d7efdc5d7f99a3be907ecac62d3212026fb810e793f19e56fb0b5a390c93f8&dtl_region=${selectedCode}&startDt=2023-01-01&endDt=2023-12-31&pageSize=50&format=json`
      fetch(url)
      .then((response)=>{
        if(!response.ok){
          console.log("연결에 실패하였습니다!");
        } else {
          console.log("데이터 다운로드중");
          return response.json();
        }
      })
      .then((data)=>{
        const jsonData = data.response.docs;
        setLibraryList(jsonData);
        setFormResult(null);
        console.log(jsonData);
      });
    } 
  }
};


  return(
    <>
      <form onSubmit={handleOnSubmit}>
        <input 
        type="text" 
        value={inputResult}
        onChange={handleOnChange}
        ref={inputRef}  />
      </form>
      <button type='submit'>검색</button>
    </>
  );
}