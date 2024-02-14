import  KakaoMap from "../components/KakaoMap";
import { useState } from "react";

export default function Local () {
  const [ selectedPlace, setSelectedPlace ] = useState('');

  const handleToggleClick = (newPlace) =>{
    setSelectedPlace(newPlace);
  }

function MapwithToggle ({ place, onPlaceChange}) {
}

  return(
    <>
    <h2 className="local-title">Local page</h2>
    { 
    (selectedPlace && <KakaoMap place={selectedPlace} />)

    || <div className="empty-map">검색된 결과가 없습니다. 우리 '-구' 검색해 보세요.</div>
    } 
      <div className="local">
        <button onClick={()=> handleToggleClick('종로구')}>종로구</button>
        <button onClick={()=> handleToggleClick('중구')}>중구</button>
        <button onClick={()=> handleToggleClick('용산구')}>용산구</button>
        <button onClick={()=> handleToggleClick('성동구')}>성동구</button>
        <button onClick={()=> handleToggleClick('광진구')}>광진구</button>
        <button onClick={()=> handleToggleClick('동대문구')}>동대문구</button>
        <button onClick={()=> handleToggleClick('중랑구')}>중랑구</button>
        <button onClick={()=> handleToggleClick('성북구')}>성북구</button>
        <button onClick={()=> handleToggleClick('강북구')}>강북구</button>
        <button onClick={()=> handleToggleClick('도봉구')}>도봉구</button>
        <button onClick={()=> handleToggleClick('노원구')}>노원구</button>
        <button onClick={()=> handleToggleClick('은평구')}>은평구</button>
        <button onClick={()=> handleToggleClick('서대문구')}>서대문구</button>
        <button onClick={()=> handleToggleClick('마포구')}>마포구</button>
        <button onClick={()=> handleToggleClick('양천구')}>양천구</button>
        <button onClick={()=> handleToggleClick('강서구')}>강서구</button>
        <button onClick={()=> handleToggleClick('구로구')}>구로구</button>
        <button onClick={()=> handleToggleClick('금천구')}>금천구</button>
        <button onClick={()=> handleToggleClick('영등포구')}>영등포구</button>
        <button onClick={()=> handleToggleClick('동작구')}>동작구</button>
        <button onClick={()=> handleToggleClick('관악구')}>관악구</button>
        <button onClick={()=> handleToggleClick('서초구')}>서초구</button>
        <button onClick={()=> handleToggleClick('강남구')}>강남구</button>
        <button onClick={()=> handleToggleClick('송파구')}>송파구</button>
        <button onClick={()=> handleToggleClick('강동구')}>강동구</button>
      </div>
    </>
  )
}

