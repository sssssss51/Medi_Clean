import React, { useEffect, useState, useRef } from 'react';
import Header from '../components/Header';
import styles from '../css/Map.module.css';
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
  const infoWindowsRef = useRef([]);

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

                    // 커스텀 오버레이에 표시할 내용
                    const overlayContent = document.createElement('div');
                    overlayContent.classList.add(styles.infoWindowContent);

                    // HTML 요소로 콘텐츠 구성
                    const title = document.createElement('div');
                    title.classList.add(styles.infoWindowTitle);
                    title.textContent = location.설치장소명;

                    const address = document.createElement('span');
                    address.classList.add(styles.infoWindowText);
                    address.textContent = location.소재지도로명주소;

                    const separator = document.createElement('div');
                    separator.classList.add(styles.separator);

                    const closeBtn = document.createElement('img');
                    closeBtn.src = '/close.png'; // public 폴더에 위치한 이미지 경로
                    closeBtn.alt = '닫기'; // 이미지 설명
                    closeBtn.classList.add(styles.closeImg);

                    const titleAndCloseDiv = document.createElement('div');
                    titleAndCloseDiv.classList.add(styles.titleAndCloseDiv);

                    // title과 closeBtn을 부모 div에 추가
                    titleAndCloseDiv.appendChild(title);
                    titleAndCloseDiv.appendChild(closeBtn);

                    // 부모 div를 overlayContent에 추가
                    overlayContent.appendChild(titleAndCloseDiv);
                    overlayContent.appendChild(address);
                    overlayContent.appendChild(separator);

                    // 커스텀 오버레이를 생성
                    const customOverlay = new window.kakao.maps.CustomOverlay({
                      position: markerPosition,
                      content: overlayContent,
                      yAnchor: 1, // 오버레이의 수직 정렬
                    });

                    // 마커 클릭 시 커스텀 오버레이 표시
                    window.kakao.maps.event.addListener(marker, 'click', () => {
                      // 모든 오버레이를 닫고 새로운 오버레이를 열기
                      infoWindowsRef.current.forEach((prevOverlay) => prevOverlay.setMap(null));
                      customOverlay.setMap(mapInstance);
                      infoWindowsRef.current.push(customOverlay);
                    });

                    // 닫기 버튼 클릭 시 커스텀 오버레이 닫기
                    closeBtn.addEventListener('click', () => {
                      customOverlay.setMap(null);
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
  }, [position, csvFiles]);

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
