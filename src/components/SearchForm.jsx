import React, { useRef, useState } from "react";

export default function SearchForm ({ setTitle, setLibraryList, onSearch }) {
  const [ inputKeyword, setInputKeyword ] = useState("");
  
  const inputRef = useRef();
  // const library =[
  //   {id : 1, value : 11010 , libName : "종로구" },
  //   {id : 2, value : 11020, libName : "중구" },
  //   {id : 3, value : 11030, libName : "용산구" },
  //   {id : 4, value : 11040, libName : "성동구" },
  //   {id : 5, value : 11050, libName : "광진구" },
  //   {id : 6, value : 11060, libName : "동대문구" },
  //   {id : 7, value : 11070, libName : "중랑구" },
  //   {id : 8, value : 11080, libName : "성북구" },
  //   {id : 9, value : 11090, libName : "강북구" },
  //   {id : 10, value : 11100, libName : "도봉구" },
  //   {id : 11, value : 11110, libName : "노원구" },
  //   {id : 12, value : 11120, libName : "은평구" },
  //   {id : 13, value : 11130, libName : "서대문구" },
  //   {id : 14, value : 11140, libName : "마포구" },
  //   {id : 15, value : 11150, libName : "양천구" },
  //   {id : 16, value : 11160, libName : "강서구" },
  //   {id : 17, value : 11170, libName : "구로구" },
  //   {id : 18, value : 11180, libName : "금천구" },
  //   {id : 19, value : 11190, libName : "영등포구" },
  //   {id : 20, value : 11200, libName : "동작구" },
  //   {id : 21, value : 11210, libName : "관악구" },
  //   {id : 22, value : 11220, libName : "서초구" },
  //   {id : 23, value : 11230, libName : "강남구" },
  //   {id : 24, value : 11240, libName : "송파구" },
  //   {id : 25, value : 11250, libName : "강동구" },
  // ];

  const handleOnChange = ()=>{
    setInputKeyword(inputRef.current.value);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const keyword = inputRef.current.value;
    setTitle(keyword);

    const options ={
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body:JSON.stringify ({
        keyword,
      })
    }
    try{
      const response = await fetch("/library", options);

      if(!response.ok){
        throw new Error("Fetch failed");
      }

      const data = await response.json();
      onSearch(data)
      console.log("Fetch data",data)

    }
    catch(error) {
      console.error("Fetch function failed", error.message)
    }
  };


  // 공공 도서관 지역별 베스트 도서 API 함수 시작
  const fetchData = async (keyword)=>{
    try{
      for(var i =0; i < library.length; i++){
        if  (keyword==library[i].libName){
          const selectedCode = library[i].value;

          const libraryApi = new URL('https://data4library.kr/api/loanItemSrchByLib?');
          libraryApi.searchParams.set('authKey', '43d7efdc5d7f99a3be907ecac62d3212026fb810e793f19e56fb0b5a390c93f8')
          libraryApi.searchParams.set('dtl_region', selectedCode)
          libraryApi.searchParams.set('startDt', '2023-01-01')
          libraryApi.searchParams.set('endDt', '2023-12-31')
          libraryApi.searchParams.set('pageSize', '20')
          libraryApi.searchParams.set('format', 'json')

          const response = await fetch(libraryApi.toString())
          if(!response.ok){
            throw new Error (`Public Library API failed ${response.status}`);
          }

          const data = await response.json();
          const jsonData = data.response.docs;
          const stringifiedData = JSON.stringify(jsonData);
          sessionStorage.setItem(`${keyword}`, stringifiedData )
          setLibraryList(jsonData);
            }
          }
      } 
    catch(error) {
      throw new Error (`PUBLIC FETCH faied ${error}`)
    } 
    finally{
      setInputKeyword("");
    }
  }



  return(
    <form className="form" onSubmit={handleOnSubmit}>
      <input 
        type="text"
        ref={inputRef}
        value={inputKeyword}
        onChange={handleOnChange}
      />
      <button type="submit" >검색</button>
    </form>
  );
}