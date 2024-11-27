import React, { useEffect, useState, useRef } from 'react';
import Header from '../components/Header';
import styles from '../css/Map.module.css';
import Papa from 'papaparse';

const MapPage = () => {
  const [map, setMap] = useState(null);
  const [position, setPosition] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [csvFiles, setCsvFiles] = useState([
    '/csv/경기도_군포시.csv',
    '/csv/경기도_부천시.csv',
    '/csv/경기도_안양시.csv',
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

  // 현재 위치를 기준으로 가장 가까운 마커 찾기
  const findNearestMarker = () => {
    if (!position || markers.length === 0) return;

    let nearestMarker = null;
    let minDistance = Infinity;

    markers.forEach(({ marker, lat, lng, overlay }) => {
      const distance = Math.sqrt(
        Math.pow(lat - position.lat, 2) + Math.pow(lng - position.lng, 2)
      );

      if (distance < minDistance) {
        minDistance = distance;
        nearestMarker = { marker, overlay };
      }
    });

    if (nearestMarker) {
      // 가장 가까운 마커로 지도 이동 및 오버레이 표시
      const { marker, overlay } = nearestMarker;
      map.setCenter(marker.getPosition());
      infoWindowsRef.current.forEach((prevOverlay) => prevOverlay.setMap(null));
      overlay.setMap(map);
      infoWindowsRef.current.push(overlay);
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
            level: 5,
          };
          const mapInstance = new window.kakao.maps.Map(mapContainer, mapOption);
          setMap(mapInstance);

          const tempMarkers = [];

          csvFiles.forEach((csvFile) => {
            Papa.parse(csvFile, {
              download: true,
              header: true,
              complete: (result) => {
                const locations = result.data;
                locations.forEach((location) => {
                  const lat = parseFloat(location.위도);
                  const lng = parseFloat(location.경도);

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

                    window.kakao.maps.event.addListener(marker, 'click', () => {
                      infoWindowsRef.current.forEach((prevOverlay) => prevOverlay.setMap(null));
                      customOverlay.setMap(mapInstance);
                      infoWindowsRef.current.push(customOverlay);
                    });

                    closeBtn.addEventListener('click', () => {
                      customOverlay.setMap(null);
                    });

                    tempMarkers.push({ marker, lat, lng, overlay: customOverlay });
                  }
                });
                setMarkers(tempMarkers);
              },
            });
          });
        });
      };

      const script = document.createElement('script');
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAOMAP_KEY}&libraries=services&autoload=false`;
      script.async = true;
      script.onload = loadKaKaoMap;
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
          <button onClick={() => window.location.reload()} className={styles.locaBtn}>
            현재 위치로 이동
          </button>
          <button onClick={findNearestMarker} className={styles.findBtn}>
            가까운 수거함 찾기
          </button>
        </div>
      )}
    </>
  );
};

export default MapPage;
