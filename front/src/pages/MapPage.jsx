import React, { useEffect, useState } from 'react';

const MapPage = () => {

    const [map, setMap] = useState(null);
    const DEFAULT_LAT = 37.497625203; // 기본 위도
    const DEFAULT_LNG = 127.03088379; // 기본 경도

    useEffect(() => {

        // 카카오 맵 로드 함수 정의
        const loadKaKaoMap = () => {
            if (!window.kakao || !window.kakao.maps) {
                console.error('Kakao maps not loaded');
                return;
            }

            window.kakao.maps.load(() => {
                const mapContainer = document.getElementById("map"); // 지도 렌더링 할 요소 선택
                const mapOption = {
                    center: new window.kakao.maps.LatLng(DEFAULT_LAT, DEFAULT_LNG), // 지도 중심점
                    level: 3 // 확대 레벨
                };
                const mapInstance = new window.kakao.maps.Map(mapContainer, mapOption); // 지도 생성

                setMap(mapInstance);
            });
        };

        // 카카오맵 스크립트 추가
        const script = document.createElement('script');
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAOMAP_KEY}&libraries=services&autoload=false`;
        script.async = true;
        script.onload = () => {
            loadKaKaoMap();
        };
        document.head.appendChild(script);

        // 스크립트 정리
        return () => {
            document.head.removeChild(script);
        };
    }, []);

    return (
        <div id="map" style={{ width: '100%', height: '100vh' }}></div>
    );
}

export default MapPage;