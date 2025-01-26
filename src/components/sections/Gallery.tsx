import React, { useState } from "react";
import styles from "./Gallery.module.css";
import gallery1 from "../../assets/images/photos/gallery/1.jpg";
import gallery2 from "../../assets/images/photos/gallery/2.jpg";
import gallery3 from "../../assets/images/photos/gallery/3.jpg";
import gallery4 from "../../assets/images/photos/gallery/4.jpg";
import gallery5 from "../../assets/images/photos/gallery/5.jpg";
import gallery6 from "../../assets/images/photos/gallery/6.jpg";
import gallery7 from "../../assets/images/photos/gallery/7.jpg";
import gallery8 from "../../assets/images/photos/gallery/8.jpg";
import gallery9 from "../../assets/images/photos/gallery/9.jpg";

export function Gallery(){
  const [selectedImage, setSelectedImage] = useState(gallery1);

  // 이미지 리스트
  const images = [
    gallery1,
    gallery2,
    gallery3,
    gallery4,
    gallery5,
    gallery6,
    gallery7,
    gallery8,
    gallery9,
  ];

  // 클릭 이벤트 핸들러
  const handleImageClick = (image: string) => {
    setSelectedImage(image); // 선택한 이미지를 메인뷰로 설정
  };

  return (
    <div>
      {/* 인사말 고정 부분 */}
      <div className="header">
        <h2 className="header-title">갤러리</h2>
        <hr className="header-line" />
      </div>
        <div className={styles.gallery}>
          {/* 메인 이미지 뷰 */}
          <div className={styles.mainView}>
              <img
              src={`${selectedImage}`}
              alt={`사진 ${selectedImage}`}
              className={styles.mainImage}
              />
          </div>

          {/* 썸네일 리스트 */}
          <div className={styles.thumbnailContainer}>
            {images.map((image, index) => (
            <button
                key={index}
                className={`${styles.thumbnailButton} ${
                selectedImage === image ? styles.active : ""
                }`}
                onClick={() => handleImageClick(image)}
            >
                <img
                src={`${image}`}
                alt={`사진 ${image}`}
                className={styles.thumbnailImage}
                />
            </button>
            ))}
          </div>
      </div>
    </div>
  );
};
