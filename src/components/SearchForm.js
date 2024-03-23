import React, { useRef, useState } from "react";

export default function SearchForm ({ setTitle, onSearch }) {
  const [ inputKeyword, setInputKeyword ] = useState("");
  
  const inputRef = useRef();

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
        throw new Error("Fetch failed", response.status);
      }

      const data = await response.json();
      onSearch(data)
      console.log("Fetch data",data)

    }
    catch(error) {
      console.error("Fetch function failed", error.message)
    }
    finally{
      setInputKeyword("");
    }
  };


  // 공공 도서관 지역별 베스트 도서 API 함수 시작



  return(
    <form className="form" onSubmit={(e)=>handleOnSubmit(e)}>
      <input 
        type="text"
        ref={inputRef}
        value={inputKeyword}
        onChange={()=> handleOnChange()}
      />
      <button type="submit" >검색</button>
    </form>
  );
}