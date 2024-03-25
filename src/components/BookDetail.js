import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom"


export const BookDetail = ()=>{
  const [ bookinfo, setBookInfo ] = useState([]);
  const { state } = useLocation();
  const navigate = useNavigate();
  const [ loanInfo, setLoanInfo ] =useState([])

  const handleGoBack = () => {
    navigate(-1);
  };


  const bookDesc = bookinfo.book?.description.replace("&lt;", '(').replace("&gt;", ")")


  console.log("bookDesc", bookDesc)

  useEffect(()  =>{
    const fetchDetail = async () =>{
      
      try{
        const options = {
          method : 'POST',
          headers : {
            "Content-Type" : "application/json"
          },
          body : JSON.stringify({
            isbn13 : state?.isbn13
        })
      };

      const response = await fetch("https://port-0-pj3-server-dc9c2nlt7zv05q.sel5.cloudtype.app/detail", options);
      // const response = await fetch("/detail", options);

      if(!response.ok){
        throw new Error('Connection failed', response.status);
      }

      const data = await response.json();

      console.log("detail data is done", data);
      setBookInfo(data)
    }
    catch(error){
    console.error("상세페이지를 불러오는데 문제가 발생했습니다.", error.messsage)
    window.alert("상페에지를 불러오는데 문제가 발생하였습니다. 다시 시도해 보시기 바랍니다.")
    }
  }
    fetchDetail();

  },[])



  return(
    <>
    <div className="detail-wrap">
      <div className="detail-book">
        <img src={state?.bookImageURL} alt={state?.bookname}></img>
        <div className="detail-info">
          <div  className="detail-name">{state?.ranking}. {state?.bookname}</div>
          <div className="">{state?.authors}</div>
          <div className="">분류 : {state?.class_nm}</div>
          <div className="">ISBN : {state?.isbn13}</div>
        </div>
      </div>

      <h3>작품소개</h3>
      <div className="detail-description">
        <div >
          {
          (bookinfo.book?.description) ? bookDesc
          : <span>제공하는 데이터가 없습니다.</span>
          }
        </div>

        <div className="detail-keyword-wrap">
          {
            bookinfo && bookinfo.keywords?.slice(0, 10).map((item) => (
              <span 
                className='detail-keyword' 
                key={item.keyword.id}>{item.keyword.word}</span>
            ))
          }
          </div>
      </div>
    <button className="detail-button" onClick={handleGoBack}>재검색가기</button>

        </div>


    </>
  )
}