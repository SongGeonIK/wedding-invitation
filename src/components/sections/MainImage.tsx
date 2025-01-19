import './MainImage.css';
import mainImage from '../../assets/images/main-image.jpg';

type MainImageProps = {
  altText: string;
  coupleNames: string;
  detailsText: string;
};

export function MainImage({ coupleNames, detailsText, altText}: MainImageProps) {
  return (
    <div className="main-image-container">
        <img src={mainImage} alt={altText} className="main-image" />
        <div className="text-overlay-container">
            <p className="couple-names">{coupleNames}</p>
            <p className="details-text">{detailsText}</p>
        </div>
    </div>
  );
}

export default MainImage;
