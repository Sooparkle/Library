import { useLocation } from "react-router-dom"

export default function BookDetail () {
  const {state} = useLocation();
  
  return(
    <>
      <div>BookDetail</div>
      <div>{state.bookname}</div>
      <div>{state.isbn13}</div>
      <div>{state.class_nm}</div>

    </>
  )
}