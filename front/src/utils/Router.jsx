import { createBrowserRouter, Outlet } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import MainPage from '../pages/MainPage';
import MapPage from '../pages/MapPage';
import BoardPage from '../pages/BoardPage';
import GuidePage from '../pages/GuidePage';
import VideoPage from '../pages/VideoPage';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`; // 웹사이트 모든 페이지 css (필수)

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <GlobalStyle />
        <Outlet /> {/* 자식 컴포넌트가 여기에 렌더링됨 */}
      </>
    ),
    children: [ //아이들 = 자식 
      {
        path: '',
        element: <MainPage />, // 메인 페이지
      },
      {
        path: '/mapPage',
        element: <MapPage />, // 지도 페이지
      },
      {
        path: '/boardPage',
        element: <BoardPage />, // 후기 작성 페이지
      },
      {
        path: '/guidePage',
        element: <GuidePage />, // 분리배출표 페이지
      },
      {
        path: '/videoPage',
        element: <VideoPage />, // 분리배출표 페이지
      },
    ],
  },
]);

export default router;
