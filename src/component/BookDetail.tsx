import {useState, useEffect } from 'react';

export default function BookDetail () {
const [book, setBook] = useState([]);
const [loanInfo, setLoanInfo] = useState([]);
const [loanAge, setLoanAge ] = useState([]);

  const isbn13 = localStorage.getItem("isbn13");
  console.log(isbn13);

  const url = `http://data4library.kr/api/srchDtlList?authKey=43d7efdc5d7f99a3be907ecac62d3212026fb810e793f19e56fb0b5a390c93f8&isbn13=${isbn13}&loaninfoYN=Y&displayInfo=age&format=json`
  fetch (url).then((response)=>{
    if(!response.ok) {
      console.log("서버 통신 실패!");
    } else {
      return response.json();
    }
  }).then((data)=>{
    const bookJsonData = data.response.detail[0].book;
    const loanInfoJsonData = data.response.loanInfo[0].Total; // ranking and count
    const loanAgeJsonData = data.response.loanInfo[1].ageResult; // age Info
    console.log(data);
    console.log(bookJsonData);
    console.log(loanAgeJsonData);

    setBook(bookJsonData);
    setBook(loanInfoJsonData);
    setBook(loanAgeJsonData);

  })
  

  return (
    <div> </div>
  )
}