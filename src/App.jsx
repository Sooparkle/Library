import "./App.css";
import React, { useState } from "react";
import SearchForm from "./components/SearchForm";
import BookList from "./components/BookList";
import { ReactComponent as DownAllow } from "./assets/DonwAllow.svg";
import { useIsFetching, useQuery } from "@tanstack/react-query";
import { ReactComponent as Loading } from "./assets/loading.svg";




function App() {
  const [title, setTitle] = useState("");
  const [ queryBoolean, setQueryBoolean ] =useState(false)

  const [ code, setCode ] = useState(null)
  const [ start, setStart ] = useState(null);
  const [ end, setEnd ] = useState(null);

const isFetching = useIsFetching()



  const fetcingData = async (code, start, end) =>{
    try{
      const resposne = await 
      fetch(`http://data4library.kr/api/loanItemSrch?authKey=${process.env.REACT_APP_LIBRARY}&dtl_region=${code}&startDt=${end}&endDt=${start}&pageSize=100&format=json`)
      // fetch("https://jsonplaceholder.typicode.com/todos/")
  
      if(!resposne.ok) {
      throw new Error ('Access successful but serer access failed', resposne.status)
    }

      const data = await resposne.json();
      const dataArray = await data.response.docs
      return dataArray
    }
    catch(error){
        console.error("데이터를 가져오는 데 실패하였습니다.", error)
    }
    finally{
      setQueryBoolean(false)
    }

  }



  // set the datas from SearchForm componenet
  const onSearch = (code, start, end ) =>{
    console.log("function onSearch")
    setQueryBoolean(true)
    
    setCode(code);
    setStart(start);
    setEnd(end);
    
  }
  

  const { data: libraryQuery, isPending } = useQuery({
    queryKey : ['library' ],
    queryFn :()=>fetcingData(code, start, end),
    enabled : queryBoolean
    
  })


  return (
    <>
      <div className="search-background">

        <div className="search-wrap">
          <h1>오늘은 어떤 책을 읽어 볼까요?</h1>
          <SearchForm 
            setTitle={setTitle}
            onSearch={onSearch}
            isPending={isPending}

          />
          <p><span>API 제공 기관의 데이터 전송 자체가 느립니다.</span> 이점 양해 부탁드립니다.</p>
        </div>
        <div className="search-down-allow">
          {libraryQuery &&  <DownAllow />}
        </div>
      </div>


    {/* contents area */}
      <div className="content">
      {title  &&<p className="search-title">{title}</p> }
        {
          isFetching ?  (
            <div className="search-loader-wrap">
              <p><strong>"{title}" 데이터</strong></p>
                기관에서 제공하는 데이터 통신 속도가 느립니다.
              <span>(평균 통신 시간 : 7초 ~13초 이상)</span>
              <Loading className="loader" />
            </div>
          ) :null
        }
        { libraryQuery && libraryQuery?.map(item => {
        return <BookList key={item.doc.no} item={item} />
        })
        }
          
          {/* 선택 항목 데이터 명칭 */}
        {/* {
          libraryList && (
          <p className="search-title"> 선택한 지역구 : {title}</p>
          ) 
        } */}

        {/* 선택한 항목에 대한 결과값 영역 */}
        {
        //  (
        //     
        //     ) 
        }

        {/* {
          filter && libraryQuery?.map((item,index) => {
            return <BookList key={index} item={item} />
          })
        } */}
      </div>
        </>
  );
}

export default App;
