import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import NaverApi from "./NaverApi";
import { errorOut } from "firebase-tools";

export default function BookList ({libraryList, title}) {
  const [ bookData, setBookDate ] = useState([]);
  const navigate = useNavigate();

  const handleOnClickDetail = (data)=>{
    navigate (
    `/${data.isbn13}`, 
    {state : data}
    );
  }

// session에서 데이터 가져와 JSON format으로 변경하기
const sessionDataString = sessionStorage.getItem(title);
const sessionData = JSON.parse(sessionDataString)

console.log("BookList Session ", sessionData);

useEffect(()=>{

if(!sessionData){

  const fetchBookData = async () =>{
    for (var i =0; i < sessionData.length; i++){
      let bookname = sessionData[i].doc.bookname;
      console.log("BookList Session for Loop has been start!");
  
      const response = await naverFetch(bookname);
      
      setBookDate((prevData)=>{
        return{
          ...prevData,
          [bookname] : response.data
        }
      })
      fetchBookData();
    }
  }
}
}, [libraryList])




  return (
    <>
      {(sessionData &&
      sessionData.map((book) => {
        const data = book.doc;
        return (
          <div className="book-wrap" key={data.no}>
            <img src={data.bookImageURL} />
            {/* <NaverApi book={data}/>  */}
            <div className="book-brief" >
              <div className="name">책 이름 : {data.bookname}</div>
              <div className="author">{data.authors}</div>
              <div className="class">{data.class_nm}</div>
              <div className="isbn13">{data.isbn13}</div>
              <button type="button"  onClick={()=>{handleOnClickDetail(data)}}>상세보기</button>
            </div>
          </div>
        );
      })) || <div>검색된 결과가 없습니다. 서울시 '-구' 검색해 보세요.</div>} 
    </>
  )

}

const naverFetch = async (bookname) =>{
  try{
    const options={
      method :"POST",
      headers : {
        "Content-Type" : "application/json",
      },
      body : JOSN.stringify({
        word : bookname
      })
    };
    
    const naveApi = new URL('http://localhost:3000/api');

    const response = await fetch(NaverApi.toString(), options);
    if(!response.ok){
      throw new Error (`Nave FETCH Failed ${response.status}`);
    };

    const data = await response.json();
    console.log("Nave FETCH IMAGE done", data);
  }
  catch(error){
    throw new Error(`Nave API failed ${error}`);
  }
}
