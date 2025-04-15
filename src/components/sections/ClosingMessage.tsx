import styles from './ClosingMessage.module.css';
import { useEffect } from 'react';
import KakaoTalk from '../../assets/images/logos/kakaotalk.png';

type ClosingMessageProps = {
  groom: string;
  bride: string;
  closingMessage: string;
};

export function ClosingMessage({  groom, bride, closingMessage }: ClosingMessageProps) {
  useEffect(() => {
    if (!window.Kakao) {
      const script = document.createElement("script");
      script.src = "https://developers.kakao.com/sdk/js/kakao.js";
      script.async = true;
      script.onload = () => {
        if (window.Kakao) {
          window.Kakao.init(process.env.REACT_APP_KAKAO_API_KEY);
        }
      };
      document.body.appendChild(script);
    } else if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.REACT_APP_KAKAO_API_KEY);
    }
  }, []);
  
  const shareKakao = () => {
    if (window.Kakao) {
      window.Kakao.Link.sendDefault({
        objectType: "feed",
        content: {
          title: "💌 청첩장",
          description: `💍 ${groom}♥${bride}의 결혼식에 초대합니다.`,
          imageUrl: `${process.env.REACT_APP_API_BASE_URL}/wedding-invitation/logo192.png`, // public 폴더 내 이미지 적용.
          link: {
            mobileWebUrl: `${process.env.REACT_APP_API_BASE_URL}/wedding-invitation/`,
            webUrl: `${process.env.REACT_APP_API_BASE_URL}/wedding-invitation/`,
          },
        },
        // social: {
        //   likeCount: 286,
        //   commentCount: 45,
        //   sharedCount: 845,
        // },        
        buttons: [
          {
            title: '웹으로 보기',
            link: {
              mobileWebUrl: `${process.env.REACT_APP_API_BASE_URL}/wedding-invitation/`,
              webUrl: `${process.env.REACT_APP_API_BASE_URL}/wedding-invitation/`,
            },
          },
          {
            title: '앱으로 보기',
            link: {
              mobileWebUrl: `${process.env.REACT_APP_API_BASE_URL}/wedding-invitation/`,
              webUrl: `${process.env.REACT_APP_API_BASE_URL}/wedding-invitation/`,
            },
          },
        ],
      });
    } else {
      alert("카카오톡 SDK가 로드되지 않았습니다.");
    }
  };
  
  return (
    <div className={styles.closingMessageContainer}>
      <p className={styles.closingMessageText}>{closingMessage}</p>
      <button className={styles.kakaoShare} onClick={shareKakao}>
        <div className={styles.kakaoShareContent}>
          {/* <img src={KakaoTalk} alt="카카오톡" className={styles.kakaoIcon} /> */}
          <span className={styles.kakaoText}>카카오톡 공유하기</span>
        </div>
    </button>
  </div>
  );
}

export default ClosingMessage;
