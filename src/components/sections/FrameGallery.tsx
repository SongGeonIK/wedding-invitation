import React, { useState, useEffect } from "react";
import styles from "./FrameGallery.module.css";
import gallery1 from "../../assets/images/photos/gallery/1.jpg";
import gallery2 from "../../assets/images/photos/gallery/2.jpg";
import gallery3 from "../../assets/images/photos/gallery/3.jpg";
import gallery4 from "../../assets/images/photos/gallery/4.jpg";
import gallery5 from "../../assets/images/photos/gallery/5.jpg";
import gallery6 from "../../assets/images/photos/gallery/6.jpg";
import gallery7 from "../../assets/images/photos/gallery/7.jpg";
import gallery8 from "../../assets/images/photos/gallery/8.jpg";
import gallery9 from "../../assets/images/photos/gallery/9.jpg";

export function FrameGallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  useEffect(() => {
    setThumbnails(images); // 썸네일은 기본적으로 원본 이미지
    setSelectedImage(images[0]); // 기본적으로 첫 번째 이미지를 선택
  }, []);

  const openModal = (image: string) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleNextImage = () => {
    const currentIndex = images.indexOf(selectedImage!);
    const nextIndex = (currentIndex + 1) % images.length;
    setSelectedImage(images[nextIndex]);
  };

  const handlePrevImage = () => {
    const currentIndex = images.indexOf(selectedImage!);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setSelectedImage(images[prevIndex]);
  };

  return (
    <div>
      <div className="header">
        <h2 className="header-title">갤러리</h2>
        <hr className="header-line" />
      </div>
      <div className={styles.gallery}>
        <div className={styles.thumbnailContainer}>
          {images.map((image, index) => (
            <div
              key={index}
              className={styles.thumbnailItem}
              onClick={() => openModal(image)}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className={styles.thumbnailImage}
              />
            </div>
          ))}
        </div>

        {isModalOpen && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <button
                className={styles.navButtonLeft}
                onClick={handlePrevImage}
              >
                &lt;
              </button>
              <div className={styles.imageWrapper}>
                {selectedImage && (
                  <img
                    src={selectedImage}
                    alt="Main View"
                    className={styles.mainImage}
                  />
                )}
              </div>
              <button
                className={styles.navButtonRight}
                onClick={handleNextImage}
              >
                &gt;
              </button>

              {/* 현재 사진 index/총 사진 개수 표시 */}
              {selectedImage && (
                <div className={styles.imageInfo}>
                  {`${images.indexOf(selectedImage) + 1}/${images.length}`}
                </div>
              )}

              <button className={styles.closeButton} onClick={closeModal}>
                ×
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
