import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";


export default function Local () {
  const textContentRef = useRef('');
  const local = useSelector(state => state)
  const [ selectedPlace, setSelectedPlace ] = useState('광화문');


  const localLlibraryList = local.localList

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


  useEffect(()=>{},[textContentRef])

  const handleClickLocal = (e) => {
    const name = e.target.textContent
      setSelectedPlace(name)
    }



  return(
    <>
    <h2 className="local-title">지역 모임</h2>

        <hr />
      <div className="local">
        {
          localLlibraryList?.map((item)=>{
            return <button key={item.id} ref={textContentRef} onClick={(e)=>handleClickLocal(e)}>{item.libName}</button>
          })
        }
      </div>
    </>
  )
}
