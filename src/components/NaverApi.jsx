import { useEffect, useState } from "react";

const NaverApi = ({ book, title }) =>{
  const [ bookImage, setBookImage ]= useState(null);


console.log("Naver API component starts!")

  // 서버가 있을때
  // const naverImageApi = async ( book ) =>{
  //   try{
  //     const naverUrl = new URL('https://openapi.naver.com/v1/search/book.json');
  //     naverUrl.searchParams.set('query', book.bookname);
  //     naverUrl.searchParams.set('display', 1);

  //     const options={
  //       method: 'GET',
  //       headers : {
  //         'Content-Type': 'application/json',
  //         'X-Naver-Client-Id': 'ytaQUUoLOhwBVF3BCR1m',
  //         'X-Naver-Client-Secret': '5ebWNQFltn'
  //       }
  //     };

  //     const response = await fetch(naverUrl.toString(), options);

  //     if(!response.ok){
  //       throw new Error(`Naver API fetch failed ${response.status}`)
  //     }

  //     const data = await response.json();


      
  //   } catch(error){ 
  //     console.log("Naver Fetching data from Naver", error)
  //     }
  // }

  useEffect(()=>{
    const naverImageDat = async (book) =>{
      try{
        console.log("Naver API async starts");
        const response = await fetch('http://localhost:3000/api/naver-fatch', {
          method : 'POST',
          headers :{'Content-Type': 'application/json'},
          body : JSON.stringify({book})
        });
  
        const data = await response.json();
        setBookImage(data.imageUrl)
      } catch(error){
        console.error('Error fetching data', error);
      }
    }

  }, [title])


  return (
    <>
    <img src={data.bookname} alt="" />
    </>
  )
};

export default NaverApi