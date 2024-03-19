import { useEffect, useState } from "react";

const NaverApi = ({ book, title }) =>{
  const [ bookImage, setBookImage ]= useState(null);

console.log("Naver API component starts!")


    const naverImageDat = async (book) =>{
      try{
        console.log("Naver API async starts");
        const options ={
          method : "POST",
          header :{
            'Content-Type' : "application/json",
          },
          body : JSON.stringify({
            bookname : book
          })
        }
        
        const response = await fetch('http://localhost:3000/api/', options);
  
        const data = await response.json();
        console.log("Data back Check!", data)

      } 
      catch(error){
        console.error('Error fetching data', error);
      }
    }

  useEffect(()=>{
    naverImageDat(book);
  }, [title])


  return (
    <>
    <img src={data.bookname} alt="" />
    </>
  )
};

export default NaverApi