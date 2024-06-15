import "./App.css";
import React, { useState } from "react";
import SearchForm from "./components/SearchForm";
import BookList from "./components/BookList";
import { useIsFetching, useQuery } from "@tanstack/react-query";
import { ReactComponent as Loading } from "./assets/loading.svg";
import { ReasultSearchBar } from "./components/ReasultSearchBar";


interface ApiProps {
  response : {
    docs : Item[]
  }
}

interface Item {
  doc : {
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
}


function App() {
  const [title, setTitle] = useState<string>("");
  const [ queryBoolean, setQueryBoolean ] =useState<boolean>(false)
  const [ search, setSearch ] = useState<string>("");

  const [ code, setCode ] = useState<string | null>(null)
  const [ start, setStart ] = useState<string | null>(null);
  const [ end, setEnd ] = useState<string | null>(null);

const isFetching = useIsFetching()



  const fetcingData = async (code:string | null, start:string | null, end:string | null):Promise<Item[] | undefined> =>{
    
    try{
      const resposne = await 
      fetch(`https://data4library.kr/api/loanItemSrchByLib?authKey=${process.env.REACT_APP_LIBRARY}&dtl_region=${code}&startDt=${start}&endDt=${end}&pageSize=50&format=json`)
  
      if(!resposne.ok) {
      throw new Error (`Access successful but serer access failed, ${resposne.status}`)
    }

      const data :ApiProps  = await resposne.json();
      const dataArray = data.response.docs
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


  let searchResult :Item[] =[]
  if(libraryQuery){
    searchResult = libraryQuery.filter(item => item.doc.bookname.includes(search))
  }


  return (
    <>
      <section 
        style={{height : libraryQuery ? "55dvh" : "100dvh"}}
      className="search-background">

        <div 
        className="search-wrap"
      
        
        >
          <h1>어떤 도서관의 대출 베스트를 볼까요?</h1>
          <SearchForm 
            setTitle={setTitle}
            onSearch={onSearch}

          />
          <p><span>국립중앙도서관에서 제공하는 정보입니다.</span> 이점 양해 부탁드립니다.</p>
        </div>

      </section>



    {/* contents area */}
    { 
      libraryQuery && <main className="content">
        <section className="content-result-search">
      {
        libraryQuery && <p>전체 목록 : {searchResult.length}</p>
      }
      <ReasultSearchBar 
        setSearch={setSearch}
        search={search}
        /> 
      </section>
        { 
        libraryQuery && searchResult?.map((item: Item) => {
          return <BookList key={item.doc.no} item={item} />
          })
        }
        { libraryQuery && <p style={{textAlign:"center"}}>결과 목록 - 끝 -</p>}

      </main>
      }

    {/* API pending popup area  */}
    {
    isFetching ?  (
      <div id="search-loader-wrap">
        <p><strong>"{title}" 데이터 수집중</strong></p>
          국립중앙도서관에서 제공하는 API가 다소 시간이 걸립니다.
        <span>(평균 통신 시간 : 7초 ~ 13초 )</span>
        <Loading className="loader" />
      </div>
    ) :null
  }
    </>
  );
}

export default App;
