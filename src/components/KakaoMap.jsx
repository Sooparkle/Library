import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"


export default function  KakaoMap ({ selectedPlace  }) {

  const { state } = useLocation();


  console.log("place loding", selectedPlace)

  useEffect(()=>{
    console.log("KAKAo useEffect", selectedPlace)
    const container = document.getElementById('myMap');
      const options ={
        center : new kakao.maps.LatLng(37.577613287593515, 126.97689447211518),
        level : 5
      };
      const map = new kakao.maps.Map(container, options);

  })


    return(
      <>
        <div id="myMap" style={{ width: '99%', height: '500px' }}></div>
      </>
    )
  }
