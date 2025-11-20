import { useEffect, useState, useRef, useCallback } from "react";
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

export function Directions({
  weddingVenue,
  floor,
  weddingHall,
  address,
  kakaoMapjavaScriptKey,
  subwayText,
  busText,
  parkingText,
}: DirectionsProps) {
  const [isMapLocked, setIsMapLocked] = useState(true);
  const [showLockMessage, setShowLockMessage] = useState(false);
  const mapRef = useRef<any>(null);

  // 카카오 맵 로드 및 초기화 함수
  const loadMap = useCallback(() => {
    if (!address || !kakaoMapjavaScriptKey) return;

    const mapScript = document.createElement("script");
    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoMapjavaScriptKey}&autoload=false&libraries=services`;
    document.head.appendChild(mapScript);

    const onLoadKakaoMap = () => {
      if (!window.kakao || !window.kakao.maps) {
        console.error("카카오맵을 로드하지 못했습니다.");
        return;
      }

      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById("map");
        const mapOption = {
          center: new window.kakao.maps.LatLng(37.5665, 126.978),
          level: 4,
          draggable: !isMapLocked,
          scrollwheel: !isMapLocked,
        };

        const map = new window.kakao.maps.Map(mapContainer, mapOption);
        mapRef.current = map;

        const places = new window.kakao.maps.services.Places();
        places.keywordSearch(weddingVenue, (result: any[], status: string) => {
          if (status === window.kakao.maps.services.Status.OK && result.length > 0) {
            const coords = new window.kakao.maps.LatLng(
              parseFloat(result[0].y),
              parseFloat(result[0].x)
            );

            map.setCenter(coords);

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

    return () => {
      mapScript.removeEventListener("load", onLoadKakaoMap);
      document.head.removeChild(mapScript);
    };
  }, [address, kakaoMapjavaScriptKey, isMapLocked, weddingVenue]);

  // 맵을 새로 로드하는 함수 (초기화 버튼 클릭 시)
  const handleResetMap = () => {
    // 맵 컨테이너를 비우고 새로 로드
    const mapContainer = document.getElementById("map");
    if (mapContainer) {
      mapContainer.innerHTML = ""; // 맵을 초기화하여 삭제
    }
    loadMap();  // 맵을 새로 로드
  };

  useEffect(() => {
    loadMap(); // 초기 맵 로드
  }, [loadMap]);

  const toggleMapLock = () => {
    const nextLockState = !isMapLocked;
    setIsMapLocked(nextLockState);

    if (mapRef.current) {
      mapRef.current.setDraggable(!nextLockState);
      mapRef.current.setZoomable(!nextLockState);
    }
  };

  const handleTouchStart = () => {
    if (isMapLocked) {
      setShowLockMessage(true);
    }
  };

  const handleTouchEnd = () => {
    setShowLockMessage(false);
  };

  const handleMapServiceClick = (platform: "tmap" | "kakao" | "naver") => {
    const encodedAddress = encodeURIComponent(weddingVenue);
    let url = "";

    switch (platform) {
      case "tmap":
        const userAgent = navigator.userAgent;
        if (/android/i.test(userAgent)) {
          url = `intent://search?name=${encodedAddress}#Intent;scheme=tmap;package=com.skt.tmap.ku;end;`;
          window.location.href = url;
        } else if (/iPad|iPhone|iPod/.test(userAgent)) {
          url = `tmap://search?name=${encodedAddress}`;
          const appStoreUrl = "https://apps.apple.com/kr/app/t-map-%EC%9C%84%EC%A7%80%EB%82%98%EB%A6%AC-%EB%84%98%EB%B9%84/id431589174";
          setTimeout(() => {
            window.location.href = appStoreUrl;
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
      <div className="header">
        <h2 className="header-title">오시는 길</h2>
        <hr className="header-line" />
      </div>

      <div className={styles.weddingVenueContainer}>
        <p className={styles.weddingVenueText}>{weddingVenue}</p>
        <p className={styles.weddingVenueText}>{floor} {weddingHall}</p>
      </div>

      <div className={styles.operationButtonContainer}>
        <button onClick={toggleMapLock} className={styles.lockButton}>
          {isMapLocked ? "🔒 지도 잠금" : "🔓 지도 조작 가능"}
        </button>
        <button onClick={handleResetMap} className={styles.initButton}>
          {"🔄 초기화"}
        </button>
      </div>

      <div
        id="map"
        className={styles.mapContainer}
        onMouseDown={handleTouchStart}
        onMouseUp={handleTouchEnd}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {isMapLocked && showLockMessage && (
          <div className={styles.mapLockMessage}>
            🔒 자물쇠 아이콘을 눌러<br />
            터치 잠금 해제 후 확대 및 이동해 주세요.
          </div>
        )}
      </div>

      <div className={styles.mapButtons}>
        <button onClick={() => handleMapServiceClick("tmap")}> <img src={TMapLogo} alt="티맵" /><h4>티맵</h4></button>
        <button onClick={() => handleMapServiceClick("kakao")}> <img src={KakaoMapLogo} alt="카카오맵" /><h4>카카오맵</h4></button>
        <button onClick={() => handleMapServiceClick("naver")}> <img src={NaverMapLogo} alt="네이버맵" /><h4>네이버맵</h4></button>
      </div>

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

export default Directions;
