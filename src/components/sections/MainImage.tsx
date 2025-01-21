import styles from './MainImage.module.css';
import mainImage from '../../assets/images/main-image.jpg';

type MainImageProps = {
  altText: string;
  mainText: string;
  coupleNames: string;
  detailsText: string;
};

export function MainImage({ altText, mainText, coupleNames, detailsText}: MainImageProps) {
  return (
    <div className={styles.mainImageContainer}>
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
