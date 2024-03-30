import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { resultList } from "../store/searchSlice";


const useFetchBookList = ({selectValue, sendEndDate, sendStartDate}) => {
  const [ bookList, setBookList ] = useState([]);
  const dispatch = useDispatch();



useEffect(()=>{
  console.log("useFetchBookList 자동 실행?")
  const fetchLocalBookList = async () =>{
    try{
      const options={
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body:JSON.stringify({
          keyword : selectValue,
          sendStartDate,
          sendEndDate
        })
      };

      const response = await fetch("https://port-0-pj3-server-dc9c2nlt7zv05q.sel5.cloudtype.app/library", options);

      if(!response.ok){
        console.log("Fetch failed", response.status);
        // window.alert(`데이터가 들어오지 못했습니다. ${response.status}`)
      };

      const data = await response.json();

      setBookList(data)
    }
    catch(error){
      console.error("Server or DB has got an issue", error.message);
      // window.alert(`서버에 이슈간 있는 것 같습니다. ${error.message}`)
    }
  }

  fetchLocalBookList();

}, [dispatch, sendEndDate])
  return{}
}

// export default useFetchBookList