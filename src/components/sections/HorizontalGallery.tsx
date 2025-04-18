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

export function HorizontalGallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [resizedImages, setResizedImages] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0); // 스크롤 위치 저장

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

  const resizeImage = (src: string, width: number): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        const aspectRatio = img.height / img.width;
        const height = width * aspectRatio;

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");

        if (ctx) {
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL());
        }
      };

      img.onerror = () => {
        console.error(`Failed to load image: ${src}`);
        resolve("");
      };
    });
  };

  useEffect(() => {
    const generateResizedImages = async () => {
      const resizedThumbnails = await Promise.all(
        images.map((image) => resizeImage(image, 80*1.2)) //scale 1.2 배까지 확대
      );
      setThumbnails(resizedThumbnails);

      const resizedMain = await Promise.all(
        images.map((image) => resizeImage(image, 800))
      );
      setResizedImages(resizedMain);

      setSelectedImage((prev) => prev ?? resizedMain[0]);
    };

    generateResizedImages();
  }, []);

  const handleNextImage = () => {
    const currentIndex = resizedImages.indexOf(selectedImage!);
    const nextIndex = (currentIndex + 1) % resizedImages.length;
    setSelectedImage(resizedImages[nextIndex]);
  };

  const handlePrevImage = () => {
    const currentIndex = resizedImages.indexOf(selectedImage!);
    const prevIndex =
      (currentIndex - 1 + resizedImages.length) % resizedImages.length;
    setSelectedImage(resizedImages[prevIndex]);
  };

  const openModal = () => {
    setScrollPosition(window.scrollY); // 현재 스크롤 위치 저장
    setIsModalOpen(true);
    document.body.style.overflow = "hidden"; // 스크롤 잠금
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = ""; // 스크롤 잠금 해제
  };

  useEffect(() => {
    if (!isModalOpen) {
      window.scrollTo(0, scrollPosition); // 모달이 닫힌 후 스크롤 위치 복원
    }
  }, [isModalOpen]); // isModalOpen 변경을 감지

  return (
    <div>
      <div className="header">
        <h2 className="header-title">갤러리</h2>
        <hr className="header-line" />
      </div>

      {!isModalOpen && (
        <div className={styles.gallery}>
          <div className={styles.mainView}>
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Main View"
                className={styles.mainImage}
                onClick={openModal} // 모달 열기
              />
            )}
          </div>

          <div className={styles.thumbnailContainer}>
            {thumbnails.map((thumbnail, index) => (
              <button
                key={index}
                className={`${styles.thumbnailButton} ${
                  selectedImage === resizedImages[index] ? styles.active : ""
                }`}
                onClick={() => setSelectedImage(resizedImages[index])}
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
      )}

      {isModalOpen && (
        <div className={styles.modal}>
          <button
            className={`${styles.navButton} ${styles.left}`}
            onClick={handlePrevImage}
          >
            &lt;
          </button>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Main View"
              className={styles.mainImage}
            />
          )}
          <button
            className={`${styles.navButton} ${styles.right}`}
            onClick={handleNextImage}
          >
            &gt;
          </button>
          <button className={styles.closeButton} onClick={closeModal} />
        </div>
      )}
    </div>
  );
}
