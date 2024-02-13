import { useLocation } from "react-router-dom"
import { useEffect } from "react";

export default function BookDetail () {
  const {state} = useLocation();

  console.log("Book Detail page has been starts!")
  
  // const apiNaver = async (param) =>{
  //   try {
  //     const naverUrl = new URL('https://openapi.naver.com/v1/search/book.json');
  //     naverUrl.searchParams.set('query', param);

  //     const options={
  //       method :'GET',
  //       headers : {
  //         'Content-Type': 'application/json',
  //         'X-Naver-Client-Id': 'Hl2fOb0CX1D4t139JtKN',
  //         'X-Naver-Client-Secret': 'N9lhUBJtQT'
  //       }
  //     };

  //     const response = await fetch(naverUrl.toString(), options);

  //     if (!response.ok) {
  //       throw new Error(`Naver API failed ${response.status}`);
  //     }

  //     const data = await response.json();
  //     console.log(data);
  //   } catch (error){
  //     console.log('Error fetching data from Naver APi', error);
  //   }
  // }

  // useEffect(()=>{
  //   apiNaver(`${state.bookname}`)
  // }, [])


  const libraryBookDetail = async () =>{

    try{
      console.log("Book Detail TRY starts!")
      const bookname = state.bookname;
      const isbn13 = state.isbn13;

      const bookDetailUrl = new URLSearchParams({
        authKey : '43d7efdc5d7f99a3be907ecac62d3212026fb810e793f19e56fb0b5a390c93f8',
        isbn13 : isbn13,
        loaninefoYN : 'Y',
        displayinfo : 'age'
      });

      const bookDeatilUrl = new URL('http://data4library.kr/api/srchDtlList?');
      bookDeatilUrl.search = urlParams.toString();
      
      const response = await fetch(bookDeatilUrl.toString());
      console.log("Book Detail URL with queris has been sented")
      if(!response.ok){
        throw new Error (`Book Detail API failed ${response.status}`)
      }

      const data = response.json();
      console.log("Book Detail data done", data)

    } catch(error) {
      console.error("Library Book detai; fetching data failed", error )
    }

  }
useEffect(()=>{
  libraryBookDetail();
}, [])


  return(
    <>
    <div>BookDetail</div>
      <div className="">
        <div>{state.bookname}</div>
        <div>{state.isbn13}</div>
        <div>{state.class_nm}</div>
        <hr/>
    </div>

    </>
  )
}