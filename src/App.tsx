import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './component/Home';
import { Community } from './component/Community';
import { Audio } from './component/Audio';
import { NotFound } from './component/NotFound';
import { Header } from './component/Header';

function App() {
// 슬라이더
// https://www.youtube.com/watch?v=iyj3TZXg2gQ

  //https://velog.io/@jahommer/React-Top%EB%B2%84%ED%8A%BC-scroll-to-top%EB%A7%8C%EB%93%A4%EA%B8%B0


// scroll Top button 
    const handleScroll = () =>{
      window.scroll({top:0, behavior:'smooth'});
    }

  return (
    <>
    <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/community" element={<Community/>} />
        <Route path="/audio" element={<Audio/>} />
        <Route path="/*" element={<NotFound/>} />
      </Routes>
      
    </>
  )
}

export default App
