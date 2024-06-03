import React, { useState } from "react"
import FAQ from "../data/faq"
import { Link } from "react-router-dom"

const FaqDetail =({ item, current, handleToggleId }) =>{

  return(
    <li key={item.id}
      className="faq-each"
      onClick={()=>handleToggleId(item.id)}
    >
      <div className={`faq-title ${current ? "activated" : ""}`} ><strong>{item.title}</strong></div>
        <div className={`faq-description ${current  ? "activated" : "" }`} >
          {item.description}
          </div>
    </li>
  )
}

export const FaqComponent = () =>{
const [ currentId, setCurrentId ] =useState(FAQ[0].id);

const handleToggleId = (id) =>{ 
  setCurrentId(prev => prev === id ? null : id)
}
  return(
    <main>
      <h2
        style={{textAlign:"center"}}
      >FAQ</h2>

      <section className="FAQ-wrap">
        <ul>
          {
            FAQ.map(item => {
              return <FaqDetail 
              key={item.id}
              item={item} current={currentId === item.id} handleToggleId={handleToggleId}/>
            })
          }
        </ul>
        <Link to="/" 
          style={{
          display:"black",
          background:"#095a9b", 
          padding:"1rem 1.8rem",
          color:"#fff",
          borderRadius : ".2rem",
          display :"block",
          width:"80px",
          marginInline:"auto",
          marginTop:"20px",
          textAlign:"center"
          }}
          aria-label="검색 페이지 이동"
          >검색해보기</Link>
      </section>
    </main>
  )
}