import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Papa from 'papaparse';

const MapPage = () => {
  const [map, setMap] = useState(null);
  const [position, setPosition] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [csvFiles, setCsvFiles] = useState([
    '/csv/경기도_군포시.csv',
    '/csv/경기도_부천시.csv',
    '/csv/경기도_양주시.csv',
    '/csv/경기도_용인시.csv',
    '/csv/경기도_평택시.csv',
    '/csv/서울특별시_관악구.csv',
    '/csv/서울특별시_성북구.csv',
    '/csv/서울특별시_서초구.csv',
    '/csv/인천광역시_강화군.csv',
    '/csv/인천광역시_계양구.csv',
    '/csv/인천광역시_동구.csv',
    '/csv/인천광역시_미추홀구.csv',
  ]);
  const [currentInfoWindow, setCurrentInfoWindow] = useState(null); // 현재 열린 정보창을 추적

  const setCenterToMyPosition = () => {
    if (map && position) {
      map.setCenter(new window.kakao.maps.LatLng(position.lat, position.lng));
    }
  };

  useEffect(() => {
    const getCurrentLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition({ lat: latitude, lng: longitude });
          setIsLoading(false);
        },
        (err) => {
          console.error('Error getting location: ', err);
          setIsLoading(false);
        }
      );
    };

    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (position) {
      const loadKaKaoMap = () => {
        if (!window.kakao || !window.kakao.maps) {
          console.error('Kakao maps not loaded');
          return;
        }

        window.kakao.maps.load(() => {
          const mapContainer = document.getElementById('map');
          const mapOption = {
            center: new window.kakao.maps.LatLng(position.lat, position.lng),
            level: 3,
          };
          const mapInstance = new window.kakao.maps.Map(mapContainer, mapOption);
          setMap(mapInstance);

          // 각 CSV 파일을 비동기적으로 파싱하고 마커 생성
          csvFiles.forEach((csvFile) => {
            Papa.parse(csvFile, {
              download: true,
              header: true,
              complete: (result) => {
                const locations = result.data;
                locations.forEach((location) => {
                  const lat = parseFloat(location.위도);
                  const lng = parseFloat(location.경도);

                  // 좌표 값이 올바른지 확인
                  if (!isNaN(lat) && !isNaN(lng)) {
                    const markerPosition = new window.kakao.maps.LatLng(lat, lng);
                    const marker = new window.kakao.maps.Marker({
                      position: markerPosition,
                      map: mapInstance,
                    });

                    // 정보창을 생성하고 마커 클릭 시 열도록 설정
                    const content = `
                      <div style="padding:5px;">
                        <strong>설치장소명:</strong> ${location.설치장소명}<br/>
                        <strong>소재지도로명주소:</strong> ${location.소재지도로명주소}
                      </div>
                    `;
                    const infowindow = new window.kakao.maps.InfoWindow({
                      content: content,
                    });

                    // 마커 클릭 시 정보창을 띄움
                    window.kakao.maps.event.addListener(marker, 'click', () => {
                      // 이전 정보창을 닫고 새로운 정보창을 열기
                      if (currentInfoWindow) {
                        currentInfoWindow.close();
                      }
                      infowindow.open(mapInstance, marker);
                      setCurrentInfoWindow(infowindow); // 새로운 InfoWindow로 상태 갱신
                    });
                  } else {
                    console.log('Invalid coordinates:', lat, lng);
                  }
                });
              },
            });
          });
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
  }, [position, csvFiles]); // 여기선 `currentInfoWindow`를 의존성 배열에 넣지 않음

  return (
    <>
      <Header />
      {!isLoading && (
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
