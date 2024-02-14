import { useEffect, useState } from "react";

export default function Local () {
  const [ selectedPlace, setSelectedPlace ] = useState('광화문');

  const {kakao} = window;

  const handleToggleClick = (newPlace) =>{
    console.log("OnHandleToggleClick", newPlace)
    setSelectedPlace(newPlace);
    kakaoMapCall(newPlace)
  }

    const kakaoMapCall = (newPlace) =>{
      console.log("KAKAo starts!", selectedPlace)
      const container = document.getElementById('myMap');

      const options ={
        center : new kakao.maps.LatLng(37.577613287593515, 126.97689447211518),
        level : 5
      };
      const map = new kakao.maps.Map(container, options);

      // 장소 검색 객체 생성
      const ps = new kakao.maps.services.Places();

      ps.keywordSearch(newPlace, placesSearchCB); 

      function placesSearchCB (data, status, pagination) {
          if (status === kakao.maps.services.Status.OK) {
            // 검색된 장소 위치를 기준으로 지도 범위 재설정
            //LatLngBounds 객체에 좌표 추가
              let bounds = new kakao.maps.LatLngBounds();

              for (let i=0; i<data.length; i++) {
                  displayMarker(data[i]);    
                  bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
              }       
              map.setBounds(bounds);
          } 
      }

      function displayMarker(place) {
    
        // 마커를 생성하고 지도에 표시합니다
        var marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(place.y, place.x) 
        });
    }
  }



  return(
    <>
    <h2 className="local-title">지역 모임</h2>
    {
      selectedPlace &&

    <div id="myMap" style={{width: '100%', height: '50vh'}}></div>
    }

{/* { 
    (selectedPlace &&  <div id="myMap" style={{width: '100%', height: '70dvh'}}></div>)
    || <div className="empty-map">검색된 결과가 없습니다. 우리 '-구' 검색해 보세요.</div>
    }  */}
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
