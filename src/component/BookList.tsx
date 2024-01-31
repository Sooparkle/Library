import {useState, useEffect } from 'react';
import BookDetail from './BookDetail';

export default function BookList ({ no, img, name, author, genres , isbn13}) {
const handleDetail =() =>{
  localStorage.setItem('isbn13',isbn13 )
  console.log("BookList");
  return(
  <BookDetail />
  )
}


return (
  <div className="book-wrap">
    <div className="img-box"><img src={img} alt={name} / ></div>
    <div className="book-info">
      <div className="no-bookname" onClick={handleDetail}>{no}. {name}</div>
      <div className="author">{author}</div>
      <div className="genres">{genres}</div>
      <div className="isbn13">{isbn13}</div>
    </div>,
  </div>
  )

  }



