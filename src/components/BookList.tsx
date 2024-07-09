import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as NoImage } from "../assets/noImage.svg"



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

interface ItemsProps{
  item : Item
}


interface optionsType {
  headers :{
    Authorization : string | undefined
  },
  params : {
    query : string
  }

}

const BookList : React.FC<ItemsProps> =  ( { item }) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const location =  useLocation();
  const [ image, setImage ] =  useState()
  

  const handleOnClickDetail =()=>{
    
    // console.log("item", item)
    navigate (
      `book/${item?.doc.isbn13}`, 
      { state :{
          doc : item.doc,
          from : location.pathname,
        }
      }
    );
  }


  const KakaoBookAPI = async () =>{
    const kakaoAPIkey = process.env.REACT_APP_KAKAO 
    if(!kakaoAPIkey){
      console.error("KaKao API Key is not defined")
      return
    }

    const options ={
      headers :{
        Authorization : `KakaoAK ${kakaoAPIkey}`
      }
    }

    try{      
      const imageData = await fetch( `https://dapi.kakao.com/v3/search/book?target=isbn&query=${item?.doc.isbn13}`, options)      
      const data = await imageData.json()
      setImage(data.documents[0].thumbnail);
    }catch(error){
      console.error("Kako API Fetch is failed", error)

    }
  }

  KakaoBookAPI();


  return (
    <div>

      <div className="book-wrap" key={item.doc.no}>
        {
          image ? (
            <img src={image} alt={item.doc.bookname} />
          ) : (
            <NoImage />
          )
        }
        <div className="book-brief">
          <div className="name">{item.doc.no}. {item.doc.bookname}</div>
          <div className="author">저자: {item.doc.authors}</div>
          <div className="class">분류: {item.doc.class_nm}</div>
          <div className="isbn13">ISBN: {item.doc.isbn13}</div>
        <button type="button" onClick={handleOnClickDetail}>
          상세보기</button>
        </div>
      </div>

    </div>
  );
}

export default BookList