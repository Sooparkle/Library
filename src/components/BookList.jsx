import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NaverApi from "./NaverApi";

export default function BookList({ title }) {
  const [naverBook, setNaverBook] = useState([]);
  const navigate = useNavigate();



  const handleOnClickDetial = (data) =>{
    navigate(
      `/home/${data.isbn13}`,
      {state : data}
    )
  };

  // storing session data
  const sessionDataString = sessionStorage.getItem(`${title}`);
  const sessionDatas = JSON.parse(sessionDataString);


  const naverDatas = async ()=>{

    const naverData = {};
    for (const book of sessionDatas){

    }
    try{
      const naver = new URL('https://openapi.naver.com/v1/search/book.json');
      naver.searchParams.set('query', title);

      const options ={
        method : 'GET',
        headers : {
          'Content-Type': 'application/json',
          'X-Naver-Client-Id': 'Hl2fOb0CX1D4t139JtKN',
          'X-Naver-Client-Secret': 'N9lhUBJtQT'
        }
      };

      const response = await fetch(naver.toString(), options);

      if(!response.ok){
        throw new Error(`Naver API failed ${response.status}`)
      }

      const data = await response.json();
      console.log("BookList naver", data)
      setNaverBook(data);
      

    } catch (error) {
      console.log(`Naver API failed at BookList ${response.status}`)
    }
  }

  // useEffect(()=>{
  //   naverDatas()
  // }, [title])

  return (
    <>
      {(sessionDatas &&
        sessionDatas.map((book) => {
          const data = book.doc;
          return (
            <div key={data.no}>
              <NaverApi book={data}/>
              <div className="book-brief" >
                <div onClick={()=>{handleOnClickDetial(data)}}>책 이름 : {data.bookname}</div>
                <div className="">{data.authors}</div>
                <div className="">{data.isbn13}</div>
                <div className="">{data.class_nm}</div>
              </div>
            </div>
          );
        })) || <div>검색된 결과가 없습니다. 우리 '-구' 검색해 보세요.</div>}
    </>
  );
}
