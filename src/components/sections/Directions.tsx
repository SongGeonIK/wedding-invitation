import { useEffect } from "react";
import styles from "./Directions.module.css";
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
          level: 3, // 지도 확대 레벨
        };

        const map = new window.kakao.maps.Map(mapContainer, mapOption);

        // 주소 기반 좌표 변환 및 마커 추가
        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.addressSearch(address, (result: any, status: string) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

            // 지도의 중심을 결과 좌표로 이동
            map.setCenter(coords);

            // 마커 표시
            new window.kakao.maps.Marker({
              map: map,
              position: coords,
            });
          } else {
            console.error("주소 검색 실패:", status);
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

  const handleMapClick = (platform: "kakao" | "naver") => {
    const encodedAddress = encodeURIComponent(address);
    let url = "";

    switch (platform) {
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
