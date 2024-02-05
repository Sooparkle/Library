

export const BookList = ({libraryList})=> {

return (
  <>
    {libraryList.map((book)=>{
      return(
      <div>
        <div>{book.doc.bookname}</div>
      </div>
      )
    })
    }
  </>

  )
}