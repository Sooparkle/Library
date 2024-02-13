import { useEffect, useState } from "react";

const {kakao} = window;

console.log("KaKaoMap page")

export default function  KakaoMap ({ place  }) {
    useEffect(()=>{
      const container = document.getElementById('myMap');
        const options ={
          center : new kakao.maps.LatLng(37.577613287593515, 126.97689447211518),
          level : 5
        };
        const map = new kakao.maps.Map(container, options);

        const ps = new kakao.maps.services.Places();

        ps.keywordSearch(place, placesSearchCB); 

        function placesSearchCB (data, status) {
            if (status === kakao.maps.services.Status.OK) {

                let bounds = new kakao.maps.LatLngBounds();

                for (let i=0; i<data.length; i++) {
                    displayMarker(data[i]);    
                    bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
                }       

                map.setBounds(bounds);
            } 
        }

        // function displayMarker(place) {
        //     let marker = new kakao.maps.Marker({
        //         map: map,
        //         position: new kakao.maps.LatLng(props.place.y, props.place.x) 
        //     });
        // }
    }, [props.place])


    // 


    return(
      <>
            <div id="myMap" style={{
        width: '100%',
        height: '70dvh'
      }}>
      </div>
      </>
    )
  }
