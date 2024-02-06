import { useNavigate } from "react-router-dom";

export default function BookList ({libraryList}) {
  console.log("Booklist", libraryList)
  const navigate  = useNavigate();

  const handelOnClikcDetail = (data)=>{
    navigate(
      `/home/${data.isbn13}`,
      {state : data}
    )
  }

  return(
    <>
    {
      libraryList.map((book)=>{
        const data = book.doc;
        return(
          <div key={data.no}>
            <div onClick={()=>{handelOnClikcDetail(data)}}>책 이름 : {data.bookname} </div>
          </div>

        )
      })
    }
    </>
  )
}