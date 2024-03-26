import React, { useRef, useState, useEffect } from "react";
import { DateRangePickers } from"./DateRangePickers";


export default function SearchForm ({ setTitle, onSearch }) {
  const [ selectValue, setSelectvalue ] = useState("");
  const [ sendStartDate, setSendStartDate ] = useState(null);
  const [ sendEndDate, setSendEndDate ] = useState(null);
  const [ isReset, setIsReset ] = useState(false);
  const inputRef = useRef();
  



  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const keyword = selectValue
    console.log("Fetch starts", keyword);

    const options ={
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body:JSON.stringify ({
        keyword,
        sendStartDate,
        sendEndDate
      })
    }
    try{

      const response = await fetch("https://port-0-pj3-server-dc9c2nlt7zv05q.sel5.cloudtype.app/library", options);
      // const response = await fetch("/library", options);

      if(!response.ok){
        throw new Error("Fetch failed", response.status);
      }

      const data = await response.json();

      
      onSearch(data)

    }
    catch(error) {
      console.error("Fetch function failed", error.message);
    }
    finally{
      setSelectvalue("");
    }
  };


  const onDates = ({startDate, endDate}) =>{
    const formattedStartDate = startDate?.toISOString().slice(0, 10); // Get YYYY-MM-DD
    const formattedEndDate = endDate?.toISOString().slice(0, 10);

    setSendStartDate(formattedStartDate);
    setSendEndDate(formattedEndDate);

  }

const handleValue=(e)=>{
  const selectedValue = e.target.value;
  setTitle(selectedValue);
  setSelectvalue(selectedValue);
}


const handleReset =() =>{
  setIsReset(!true);
}


  return(
    <form className="form" onSubmit={(e)=>handleOnSubmit(e)}>
      {/* <div>
        <label htmlFor="seoulArea">지역구를 선택하세요</label>
      </div> */}
      <select className="search-select"
        value={selectValue}
        onChange={(e)=>handleValue(e)}>
          <option value="">지역구 선택</option>
          <option value="종로구">종로구</option>
          <option value="중구">중구</option>
          <option value="용산구">용산구</option>
          <option value="성동구">성동구</option>
          <option value="광진구">광진구</option>
          <option value="동대문구">동대문구</option>
          <option value="중랑구">중랑구</option>
          <option value="성북구">성북구</option>
          <option value="강북구">강북구</option>
          <option value="도봉구">도봉구</option>
          <option value="노원구">노원구</option>
          <option value="은평구">은평구</option>
          <option value="서대문구">서대문구</option>
          <option value="마포구">마포구</option>
          <option value="양천구">양천구</option>
          <option value="강서구">강서구</option>
          <option value="구로구">구로구</option>
          <option value="금천구">금천구</option>
          <option value="영등포구">영등포구</option>
          <option value="동작구">동작구</option>
          <option value="관악구">관악구</option>
          <option value="서초구">서초구</option>
          <option value="강남구">강남구</option>
          <option value="송파구">송파구</option>
          <option value="강동구">강동구</option>
      </select>
      <DateRangePickers 
        onDates={onDates} 
        handleReset={handleReset}
        setIsReset={setIsReset}
        />
        

      <button 
        type="submit" 
        >
        검색
        </button>

    </form>
  );
}