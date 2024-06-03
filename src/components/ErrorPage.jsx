import { Link, useNavigate } from "react-router-dom"

export const ErrorPage =() =>{
const navigate = useNavigate()

console.log("navigate", navigate())


  return(
    <section
      style={{
        display:"grid",
        placeContent:"center",
        marginTop:"20px"
      }}
    >
      <h2>잘못된 경로로 찾아오신거 같아요. 🚧❌😅</h2>
      <p>현재 페이지는 존재 하지 않습니다.<br />다시 한번 확인 부탁드립니다.</p>
      <div
        style={{
        display:"black",
        background:"#095a9b", 
        padding:"1rem 1.8rem",
        borderRadius : ".2rem",
        textAlign:"center"
            }}
      tabIndex={0}
      aria-label="메인 페이지로 동아가는 링크 테크"
      >
      <Link
      style={{
        color:"#fff"
      }}
        to="/" 
        replace 
      >메인페이지 이동</Link>

      </div>
    </section>
  )
}