import { useState, useEffect } from 'react';
import styles from './MainImage.module.css';
import mainImage1 from '../../assets/images/photos/main/1.jpg';
import mainImage2 from '../../assets/images/photos/main/2.jpg';
import mainImage3 from '../../assets/images/photos/main/3.jpg';
import mainImage4 from '../../assets/images/photos/main/4.jpg';

type MainImageProps = {
  altText: string;
  mainText: string;
  coupleNames: string;
  detailsText: string;
};

export function MainImage({ altText, mainText, coupleNames, detailsText }: MainImageProps) {
  const images = [
    mainImage1,
    mainImage2,
    mainImage3,
    mainImage4,
  ];
  const [mainImage, setMainImage] = useState<string>(images[0]);
  const [fade, setFade] = useState<boolean>(true);

  useEffect(() => {
    const changeImage = () => {
      setFade(false); // 1. 0.5초 동안 페이드 아웃

      setTimeout(() => {
        setMainImage((prevImage) => {
          const currentIndex = images.indexOf(prevImage);
          const nextIndex = (currentIndex + 1) % images.length;
          return images[nextIndex];
        });
      }, 500); // 0.5초 후 이미지 변경 (fadeOut 완료 후)

    };

    const interval = setInterval(changeImage, 5000); // 5초마다 실행

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 정리
  }, []); // `useEffect`를 한 번만 실행하여 `setInterval`을 유지

  // 이미지 로드 완료 시 페이드 인 적용
  const handleImageLoad = () => {
    setFade(true); // 이미지 로딩 완료 후 페이드 인
  };

  return (
    <div className={styles.mainImageContainer}>
        <img 
          src={mainImage} 
          alt={altText} 
          onLoad={handleImageLoad}
          className={`${styles.mainImage} ${fade ? styles.fadeIn : styles.fadeOut}`} 
        />
        {(mainText && 
          <p className={styles.mainText}>{mainText}</p>
        )}
        <div className={styles.textOverlayContainer}>
            <p className={styles.coupleNames}>{coupleNames}</p>
            <p className={styles.detailsText}>{detailsText}</p>
        </div>
    </div>
  );
}

export default MainImage;