import React, { useState, useEffect } from "react";
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

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [resizedImages, setResizedImages] = useState<string[]>([]); // 리사이즈된 메인 이미지 저장

  // 원본 이미지 리스트
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

  // Canvas를 사용해 이미지를 리사이즈 (height는 비율 계산)
  const resizeImage = (src: string, width: number): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        const aspectRatio = img.height / img.width; // 비율 계산
        const height = width * aspectRatio; // 비율에 따른 height 계산
  
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
  
        if (ctx) {
          // 이미지 품질 향상을 위한 설정
          ctx.imageSmoothingEnabled = true; // 부드럽게 처리
          ctx.imageSmoothingQuality = "high"; // 고품질 설정
  
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL()); // Base64 형식으로 반환
        }
      };
  
      // 에러 처리
      img.onerror = () => {
        console.error(`Failed to load image: ${src}`);
        resolve("");
      };
    });
  };
  

  // 썸네일 및 메인 이미지를 동적으로 생성
  useEffect(() => {
    const generateResizedImages = async () => {
      // 썸네일 생성
      const resizedThumbnails = await Promise.all(
        images.map((image) => resizeImage(image, 60)) // 썸네일 크기: 60px
      );
      setThumbnails(resizedThumbnails);
  
      // 메인 이미지 생성
      const resizedMain = await Promise.all(
        images.map((image) => resizeImage(image, 800)) // 메인 이미지 크기: 800px
      );
      setResizedImages(resizedMain);
  
      // 첫 번째 이미지를 초기값으로 설정
      setSelectedImage((prev) => prev ?? resizedMain[0]); // 기존 값이 없을 때만 설정
    };
  
    generateResizedImages();
  }, []); // 의존성 배열 비움
  
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
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Main View"
              className={styles.mainImage}
            />
          )}
        </div>

        {/* 썸네일 리스트 */}
        <div className={styles.thumbnailContainer}>
          {thumbnails.map((thumbnail, index) => (
            <button
              key={index}
              className={`${styles.thumbnailButton} ${
                selectedImage === resizedImages[index] ? styles.active : ""
              }`}
              onClick={() => setSelectedImage(resizedImages[index])} // 선택된 메인 이미지 설정
            >
              <img
                src={thumbnail}
                alt={`Thumbnail ${index + 1}`}
                className={styles.thumbnailImage}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
