import { useLocation } from "react-router-dom"
import { useEffect } from "react";

export default function BookDetail () {
  const {state} = useLocation();
  
  const apiNaver = async (param) =>{
    try {
      const naverUrl = new URL('https://openapi.naver.com/v1/search/book.json');
      naverUrl.searchParams.set('query', param);

      const options={
        method :'GET',
        headers : {
          'Content-Type': 'application/json',
          'X-Naver-Client-Id': 'Hl2fOb0CX1D4t139JtKN',
          'X-Naver-Client-Secret': 'N9lhUBJtQT'
        }
      };

      const response = await fetch(naverUrl.toString(), options);

      if (!response.ok) {
        throw new Error(`Naver API failed ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
    } catch (error){
      console.log('Error fetching data from Naver APi', error);
    }
  }

  // useEffect(()=>{
  //   apiNaver(`${state.bookname}`)
  // }, [])


  return(
    <>
      <div>BookDetail</div>
      <div>{state.bookname}</div>
      <div>{state.isbn13}</div>
      <div>{state.class_nm}</div>
      <hr/>

    </>
  )
}