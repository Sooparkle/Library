import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

export default function BookList ({libraryList}) {

  const navigate = useNavigate();

  const handleOnClickDetail = (data)=>{
    navigate (
    `/home/${data.isbn13}`, 
    {state : data}
    );
  }

setTimeout(()=>{
    const options = {
      method : 'GET',
      headers :{
        'Authorization' : 'KakaoAK 789e892b35aeb0184de0c86cfe742650'
      }
    }
    const url = `https://dapi.kakao.com/v3/search/book?target=${libraryList.doc.bookname}&isbn=${libraryList.doc.isbn13}`;
  
    fetch(url, options)
    .then((response)=> {
      return response.json()
    })
    .then((data)=>{
      console.log("kakao", data);
    })
  }, "2000")

  return (
    <>
      {
      libraryList.map((book)=>{
        const data = book.doc
        return(
          <div className="book" key={data.no}>
            <img src={data.bookImageURL} alt={data.bookname} />
            <div className="">
              <div onClick={()=> handleOnClickDetail(data)} >{data.no} {data.bookname}</div>
              <div>{data.authors}</div>
              <div>{data.class_nm}</div>
              <div>{data.isbn13}</div>
            </div>
          </div>
        )
      })
      }
    </>
    
  )
}