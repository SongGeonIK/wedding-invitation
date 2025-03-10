import { useState, useEffect } from 'react';
import styles from './MainImage.module.css';
import mainImage1 from '../../assets/images/photos/main/main-image1.jpg';
import mainImage2 from '../../assets/images/photos/main/main-image2.jpg';
import mainImage3 from '../../assets/images/photos/main/main-image3.jpg';
import mainImage4 from '../../assets/images/photos/main/main-image4.jpg';

type MainImageProps = {
  altText: string;
  mainText: string;
  coupleNames: string;
  detailsText: string;
};

export function MainImage({ altText, mainText, coupleNames, detailsText }: MainImageProps) {
  const [mainImage, setMainImage] = useState<string>(mainImage1);
  const [fade, setFade] = useState<boolean>(true);

  const images = [
    mainImage1,
    mainImage2,
    mainImage3,
    mainImage4,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        const currentIndex = images.indexOf(mainImage);
        const nextIndex = (currentIndex + 1) % images.length;
        setMainImage(images[nextIndex]);
        setFade(true);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, [mainImage]);

  return (
    <div className={styles.mainImageContainer}>
        <img 
          src={mainImage} 
          alt={altText} 
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