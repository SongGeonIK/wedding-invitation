import { useEffect } from "react";
import styles from "./Directions.module.css";

type DirectionsProps = {
  weddingVenue: string;
  floor: string;
  weddingHall: string;
  address: string;
  kakaoMapjavaScriptKey: string;
};

export function Directions({ weddingVenue, floor, weddingHall, address, kakaoMapjavaScriptKey }: DirectionsProps) {
  useEffect(() => {
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

  return (
    <div>
      <div className="header">
        <h2 className="header-title">오시는 길</h2>
        <hr className="header-line" />
      </div>
      <div className={styles.weddingVenueContainer}>
        <p className={styles.weddingVenueText}>{weddingVenue}</p>
        <p className={styles.weddingVenueText}>
          {floor} {weddingHall}
        </p>
      </div>
      <div id="map" className={styles.mapContainer}></div>
    </div>
  );
}
