import "./App.css";
import React, { useState } from "react";
import SearchForm from "./components/SearchForm";
import BookList from "./components/BookList";
import { ReactComponent as DownAllow } from "./assets/DonwAllow.svg";
import { useIsFetching, useQuery } from "@tanstack/react-query";
import { ReactComponent as Loading } from "./assets/loading.svg";

interface ApiProps {
  response : {
    doc : Item[]
  }
}

interface Item {
  addition_symbol: string;
  authors: string;
  bookDtlUrl: string;
  bookImageURL: string;
  bookname: string;
  class_nm: string;
  class_no: string;
  isbn13: string;
  loan_count: string;
  no: number;
  publication_year: string;
  publisher: string;
  ranking: string;
  vol: string;
}


function App() {
  const [title, setTitle] = useState<string>("");
  const [ queryBoolean, setQueryBoolean ] =useState<boolean>(false)

  const [ code, setCode ] = useState<string | null>(null)
  const [ start, setStart ] = useState<string | null>(null);
  const [ end, setEnd ] = useState<string | null>(null);

const isFetching = useIsFetching()



  const fetcingData = async (code:string | null, start:string | null, end:string | null):Promise<Item[] | undefined> =>{
    try{
      const resposne = await 
      fetch(`http://data4library.kr/api/loanItemSrch?authKey=${process.env.REACT_APP_LIBRARY}&dtl_region=${code}&startDt=${end}&endDt=${start}&pageSize=100&format=json`)
      // fetch("https://jsonplaceholder.typicode.com/todos/")
  
      if(!resposne.ok) {
      throw new Error (`Access successful but serer access failed, ${resposne.status}`)
    }

      const data :ApiProps  = await resposne.json();
      const dataArray = data.response.doc
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
  const onSearch = (code: string | null, start:string | null, end : string |null ) =>{
    setQueryBoolean(true)
    
    setCode(code);
    setStart(start);
    setEnd(end);
    
  }
  

  const { data: libraryQuery, isPending } = useQuery<Item[] | undefined>({
    queryKey : ['library' ],
    queryFn :()=>fetcingData(code, start, end),
    enabled : queryBoolean
    
  })


  return (
    <>
      <section className="search-background">

        <div 
        className="search-wrap"
        style={{height : libraryQuery ? "40dvh" : "100dvh"}}
        
        >
          <h1>어떤 도서관의 대출 베스트를 볼까요?</h1>
          <SearchForm 
            setTitle={setTitle}
            onSearch={onSearch}

          />
          <p><span>API 제공 기관의 데이터 전송 자체가 느립니다.</span> 이점 양해 부탁드립니다.</p>
        </div>
        <div className="search-down-allow">
          {libraryQuery &&  <DownAllow />}
        </div>
      </section>


    {/* contents area */}
      <main className="content">
      {title  &&<p className="search-title">{title}</p> }
        {
          isFetching ?  (
            <div className="search-loader-wrap">
              <p><strong>"{title}" 데이터</strong></p>
                기관에서 제공하는 API 속도가 느립니다.
              <span>(평균 통신 시간 : 7초 ~13초 이상)</span>
              <Loading className="loader" />
            </div>
          ) :null
        }
        { libraryQuery && libraryQuery?.map((item: Item) => {
        return <BookList key={item.no} item={item} />
        })
        }
          

      </main>
    </>
  );
}

export default App;
