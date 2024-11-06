import React, { useEffect, useState } from 'react';
import Header from '../components/Header';

const MapPage = () => {
  const [map, setMap] = useState(null);
  const [position, setPosition] = useState(null); // 위치 기본값 삭제
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  // 사용자 위치 설정
  const setCenterToMyPosition = () => {
    if (map && position) {
      map.setCenter(new window.kakao.maps.LatLng(position.lat, position.lng));
    }
  };

  // 위치 추적
  useEffect(() => {
    const getCurrentLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition({ lat: latitude, lng: longitude });
          setIsLoading(false); // 위치를 가져오면 로딩 상태 종료
        },
        (err) => {
          console.error("Error getting location: ", err);
          setIsLoading(false); // 오류 발생 시에도 로딩 상태 종료
        }
      );
    };

    navigator.geolocation.watchPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      setPosition({ lat: latitude, lng: longitude });
      if (map) {
        map.setCenter(new window.kakao.maps.LatLng(latitude, longitude));
      }
    });

    getCurrentLocation();
  }, [map]);

  useEffect(() => {
    if (position) {
      const loadKaKaoMap = () => {
        if (!window.kakao || !window.kakao.maps) {
          console.error('Kakao maps not loaded');
          return;
        }

        window.kakao.maps.load(() => {
          const mapContainer = document.getElementById("map");
          const mapOption = {
            center: new window.kakao.maps.LatLng(position.lat, position.lng),
            level: 3,
          };
          const mapInstance = new window.kakao.maps.Map(mapContainer, mapOption);

          setMap(mapInstance);
        });
      };

      const script = document.createElement('script');
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAOMAP_KEY}&libraries=services&autoload=false`;
      script.async = true;
      script.onload = () => {
        loadKaKaoMap();
      };
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    }
  }, [position]);

  return (
    <>
      <Header />
      {!isLoading && ( // 위치 로딩이 끝났을 때만 지도 표시
        <div id="map" style={{ width: '100%', height: '100vh' }}>
          <button 
              onClick={setCenterToMyPosition} 
              style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1 }}
          >
              현재 위치로 이동
          </button>
        </div>
      )}
    </>
  );
};

export default MapPage;
