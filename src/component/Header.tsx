import { Link } from 'react-router-dom';

export  const Header =() =>{

  return(
    <div>
      <div>
        <Link to="/">
          <img src="" alt="로고"></img>
        </Link>
        <ul>
          <li><Link to="/">검색</Link></li>
          <li><Link to="/community">지역</Link></li>
          <li><Link to="/audio">듣기</Link></li>
        </ul>

      </div>
    </div>
  )
}