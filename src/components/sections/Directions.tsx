import { useEffect } from "react";
import styles from "./Directions.module.css";
import TMapLogo from '../../assets/images/logos/tmap-logo.png';
import KakaoMapLogo from '../../assets/images/logos/kakaomap-basic.png';
import NaverMapLogo from '../../assets/images/logos/navermap-logo.png';

type DirectionsProps = {
  weddingVenue: string;
  floor: string;
  weddingHall: string;
  address: string;
  kakaoMapjavaScriptKey: string;
  subwayText: string;
  busText: string;
  parkingText: string;
};

export function Directions({ weddingVenue, floor, weddingHall, address, kakaoMapjavaScriptKey, subwayText, busText, parkingText }: DirectionsProps) {
  useEffect(() => {
    if (!address || !kakaoMapjavaScriptKey) return;

    const mapScript = document.createElement("script"); // <script> 태그 생성

    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoMapjavaScriptKey}&autoload=false&libraries=services`;

    document.head.appendChild(mapScript); // <head> 태그에 <script> 추가

    const onLoadKakaoMap = () => {
      if (!window.kakao || !window.kakao.maps) {
        console.error("카카오맵을 로드하지 못했습니다.");
        return;
      }

      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById("map"); // 지도를 표시할 div
        const mapOption = {
          center: new window.kakao.maps.LatLng(37.5665, 126.978), // 기본 좌표 (서울)
          level: 4, // 지도 확대 레벨
        };

        const map = new window.kakao.maps.Map(mapContainer, mapOption);

        // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
        var mapTypeControl = new window.kakao.maps.MapTypeControl();

        // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
        // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
        map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);

        // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
        var zoomControl = new window.kakao.maps.ZoomControl();
        map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

        // 주소 기반 좌표 변환 및 마커 추가
        const places = new window.kakao.maps.services.Places();
        places.keywordSearch(weddingVenue, (result: any[], status: string) => {
          if (status === window.kakao.maps.services.Status.OK && result.length > 0) {
            const coords = new window.kakao.maps.LatLng(
              parseFloat(result[0].y),
              parseFloat(result[0].x)
            );

            // 지도 중심 이동
            map.setCenter(coords);

            // 마커 추가
            new window.kakao.maps.Marker({
              map: map,
              position: coords,
            });
          } else {
            console.error("장소 검색 실패:", status);
          }
        });
      });
    };

    mapScript.addEventListener("load", onLoadKakaoMap);

    // 클린업 함수
    return () => {
      mapScript.removeEventListener("load", onLoadKakaoMap);
      document.head.removeChild(mapScript);
    };
  }, [address, kakaoMapjavaScriptKey]);

  const handleMapClick = (platform: "tmap" | "kakao" | "naver") => {
    const encodedAddress = encodeURIComponent(weddingVenue);
    let url = "";

    switch (platform) {
      case "tmap":
        const userAgent = navigator.userAgent;
            
        if (/android/i.test(userAgent)) {
            // Android - intent 사용 (설치 여부 자동 감지)
            url = `intent://search?name=${encodedAddress}#Intent;scheme=tmap;package=com.skt.tmap.ku;end;`;
            window.location.href = url;
        } else if (/iPad|iPhone|iPod/.test(userAgent)) {
            // iOS - 앱 실행 시도 후 미설치 시 App Store로 이동
            url = `tmap://search?name=${encodedAddress}`;
            const appStoreUrl = "https://apps.apple.com/kr/app/t-map-%EC%9C%84%EC%A7%80%EB%82%98%EB%A6%AC-%EB%84%98%EB%B9%84/id431589174";

            setTimeout(() => {
                window.location.href = appStoreUrl; // 앱 실행 안되면 스토어로 이동
            }, 2000);

            window.location.href = url;
        } else {
            alert("Tmap은 모바일에서만 사용할 수 있습니다.");
            return;
        }
        break;
      case "kakao":
        url = `https://map.kakao.com/link/search/${encodedAddress}`;
        break;
      case "naver":
        url = `https://map.naver.com/v5/search/${encodedAddress}`;
        break;
    }

    window.open(url, "_blank");
  };  

  return (
    <div>
      {/* 인사말 고정 부분 */}
      <div className="header">
        <h2 className="header-title">오시는 길</h2>
        <hr className="header-line" />
      </div>
      {/* 예식 장소 */}
      <div className={styles.weddingVenueContainer}>
        <p className={styles.weddingVenueText}>{weddingVenue}</p>
        <p className={styles.weddingVenueText}>
          {floor} {weddingHall}
        </p>
      </div>
      {/* Kakao Map */}
      <div id="map" className={styles.mapContainer}></div>
      {/* 맵 서비스 버튼 */}
      <div className={styles.mapButtons}>
      <button onClick={() => handleMapClick("tmap")}>
          <img src={TMapLogo} alt="티맵" />
          <h4>티맵</h4>
        </button>        
        <button onClick={() => handleMapClick("kakao")}>
          <img src={KakaoMapLogo} alt="카카오맵" />
          <h4>카카오맵</h4>
        </button>
        <button onClick={() => handleMapClick("naver")}>
          <img src={NaverMapLogo} alt="네이버맵" />
          <h4>네이버맵</h4>
        </button>
      </div>   
      {/* 오는 길 */}
      <div className={styles.directionsContainer}>
        <div>
          <h2 className={styles.addressHeader}>주소</h2>
          <p className={styles.address}>{address}</p>
        </div>
        {subwayText && (
          <div>
            <h2 className={styles.subwayHeader}>지하철</h2>
            <p className={styles.subwayText}>{subwayText}</p>
          </div>
        )}
        {busText && (
          <div>
            <h2 className={styles.busHeader}>버스</h2>
            <p className={styles.busText}>{busText}</p>
          </div>
        )}
        {parkingText && (
          <div>
            <h2 className={styles.parkingHeader}>주차</h2>
            <p className={styles.parkingText}>{parkingText}</p>
        </div>
        )}
      </div>
    </div>
  );
}
