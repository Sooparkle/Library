import { useNavigate } from "react-router-dom"

export default function BookList ({libraryList}) {

  const navigate = useNavigate();

  const handleOnClickDetail = (data)=>{
    navigate (
    `/home/${data.isbn13}`, 
    {state : data}
    );
  }

  return (
    <>
      {
      libraryList.map((book)=>{
        const data = book.doc
        return(
          <div className="book" key={data.no}>
            <img src={data.bookImageURL} alt={data.bookname} />
            <div className="">
              <div onClick={()=> handleOnClickDetail(data)} >{data.no }{data.bookname}</div>
              <div>{data.authors}</div>
              <div>{data.class_nm}</div>
              <div>{data.isbn13}</div>
            </div>
          </div>
        )
      })
      }
    </>
    
  )
}