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
    if (isModalOpen) {
      // 모달이 열렸을 때 body와 html의 스크롤을 비활성화
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden"; // html의 스크롤도 비활성화
    } else {
      // 모달이 닫혔을 때 스크롤을 원래 상태로 복원
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto"; // html의 스크롤도 복원
    }

    // clean up on unmount or modal close
    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto"; // html의 스크롤도 복원
    };
  }, [isModalOpen]);

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
