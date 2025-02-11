import { useEffect } from 'react';
import styles from './MainImage.module.css';
import mainImage from '../../assets/images/main-image.jpg';

type MainImageProps = {
  altText: string;
  mainText: string;
  coupleNames: string;
  detailsText: string;
};

export function MainImage({ altText, mainText, coupleNames, detailsText }: MainImageProps) {
  
  // 뷰포트 높이를 동적으로 설정하여 크기 변화 방지
  useEffect(() => {
    function updateVH() {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    updateVH(); // 초기 실행
    window.addEventListener('resize', updateVH);
    
    return () => window.removeEventListener('resize', updateVH);
  }, []);

  return (
    <div className={styles.mainImageContainer} style={{ height: 'calc(var(--vh) * 100)' }}>
        <img src={mainImage} alt={altText} className={styles.mainImage} />
        <p className={styles.mainText}>{mainText}</p>
        <div className={styles.textOverlayContainer}>
            <p className={styles.coupleNames}>{coupleNames}</p>
            <p className={styles.detailsText}>{detailsText}</p>
        </div>
    </div>
  );
}

export default MainImage;