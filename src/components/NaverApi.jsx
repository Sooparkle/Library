import { useEffect, useState } from "react";

const NaverApi = ({book}) =>{

const [ imageUrl, setImageUrl ] = useState();

console.log("NaverAPI page, bookname", book.bookname)

  const naverApi = async ()=>{
    try {
      console.log("NaverApi page, starts the try part", book)
      const naverUrl = new URL('https://openapi.naver.com/v1/search/book.json');
      naverUrl.searchParams.set('query', book.bookname);
      naverUrl.searchParams.set('display', 1);
  
      const options ={
        method : 'GET',
        header : {
          'Content-Type': 'application/json',
          'X-Naver-Client-Id': 'ytaQUUoLOhwBVF3BCR1m',
          'X-Naver-Client-Secret': '5ebWNQFltn'
        }
      };
  
      const response = await fetch(naverUrl.toString(), options);
  
      if(!response.ok){
        throw new Error(`Naver API failed ${response.status}`);
      }
      const data = await response.json();
      setImageUrl(data.items.image);
      console.log("NaveApi page completed", data);
  
    } catch(error){
      console.log(`Error fetching data from Naver`,error);
    }
  }

useEffect(()=>{
  naverApi();
},[book.bookname])


  return(
    <>
    <img src={imageUrl} alt={book.bookname}/>
    </>
  )
}

export default NaverApi