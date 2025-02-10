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
          description: `💍 ${groom}♥${bride}의 결혼식에 초대합니다. 🎉`,
          imageUrl: "https://mud-kage.kakao.com/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg",
          link: {
            // 카카오 디벨로퍼의 [내 애플리케이션] > [플랫폼] 에서 등록한 사이트 도메인과 일치해야 함
            mobileWebUrl: "https://songgeonik.github.io/wedding-invitation/",
            webUrl: "https://songgeonik.github.io/wedding-invitation/",
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
              mobileWebUrl: 'https://songgeonik.github.io/wedding-invitation/',
              webUrl: 'https://songgeonik.github.io/wedding-invitation/',
            },
          },
          {
            title: '앱으로 보기',
            link: {
              mobileWebUrl: 'https://songgeonik.github.io/wedding-invitation/',
              webUrl: 'https://songgeonik.github.io/wedding-invitation/',
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
          <img src={KakaoTalk} alt="카카오톡" className={styles.kakaoIcon} />
          <span className={styles.kakaoText}>카카오톡 공유하기</span>
        </div>
    </button>
  </div>
  );
}

export default ClosingMessage;
